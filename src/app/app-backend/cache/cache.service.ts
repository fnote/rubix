import { CachePolicy } from '../../app-constants/enums/cache-policy.enum';
import { CacheRequest } from './cache-request';
import { CacheRequestGenerator } from './cache-request-generator';
import { Channels } from '../../app-constants/enums/channels.enum';
import { DataService } from '../communication/data.service';
import { DbController } from './db-controller';
import { Injectable } from '@angular/core';
import { LoggerService } from '../../app-utils/logger.service';
import { Observable } from 'rxjs/Observable';
import { PriceRequest } from '../price/protocols/price-request';
import { Subject } from 'rxjs/Subject';
import { Subscriber } from 'rxjs/Subscriber';

@Injectable()
export class CacheService {

	private _version = 1;
	private _dbController: DbController;
	private cacheResponseStream$: Subject<any>;

	constructor(private network: DataService, private logger: LoggerService, private reqGen: CacheRequestGenerator) {
		this._dbController = new DbController(this._version, logger);
		this.cacheResponseStream$ = new Subject();
	}

	public search(key: string): Observable<number|string | Blob> {

		return new Observable((observer: Subscriber<any>): void => {
			observer.next(1);
			observer.complete();
		});
	}

	public clear(): void {
		this._dbController.clean();
	}

	public generateGetRequest(request: {channel: Channels, data: PriceRequest, req_gen: (req: PriceRequest) => string}): CacheRequest {
		return this.reqGen.getRequest(request);
	}

	public generatePutRequest(request: {channel: Channels, data: any, req: any}): CacheRequest {
		return this.reqGen.putRequest(request);
	}

	public getCacheResponseStream(): Subject<any> {
		return this.cacheResponseStream$;
	}

	public get(keyData: CacheRequest): void {

		// const keyData: {name: string, storeName: string, cachePolicy: CachePolicy, ttl: number} = this._dbController.getStore('keyMap').get(key);

		if (keyData.cachePolicy === CachePolicy.NetWorkOnly) {
			this.network.sendToWs({ channel: keyData.channel, data: keyData.data });
			/*this.network.get(keyData).subscribe(
			 x => {
			 this.cacheResponseStream$.next(x);
			 },
			 e => {
			 this.cacheResponseStream$.error('value for ' + keyData.name + 'was not received from network');
			 },
			 ); */
		} else {

			const store = this._dbController.getStore(keyData.storeName);

			store.get(keyData.name).then(
				(val) => {

					if (val === null) {
						this.logger.logWarning('value for ' + keyData.name + ' not found in cache', 'CacheService', keyData.data);
						this.network.sendToWs({ channel: keyData.channel, data: keyData.data });
						return;
					}

					if (keyData.cachePolicy === CachePolicy.CacheOrNetwork) {

						if (!this._isExpired(val.persistTime, keyData.ttl)) {
							this.cacheResponseStream$.next(val.value);
						} else {
							this.network.sendToWs({ channel: keyData.channel, data: keyData.data });
							/*this.network.get(keyData).subscribe(
							 x => {
							 this.cacheResponseStream$.next(x);
							 this.put(keyData.name, x);
							 },
							 e => {
							 this.cacheResponseStream$.error('value for ' + keyData.name + 'was not received from network');
							 },
							 () => {
							 // observer.complete();
							 },
							 );*/
						}

					} else if (keyData.cachePolicy === CachePolicy.CacheUpdate) { // todo: mihil-will not work due to refactoring

						this.cacheResponseStream$.next(val.value);

						/*this.network.get(keyData).subscribe(
						 x => {
						 this.put(keyData.name, x);
						 },
						 e => {
						 this.logger.logError('value for ' + keyData.name + 'was not received from network', 'CacheService');
						 },
						 () => {
						 this.logger.logInfo('value for ' + keyData.name + 'received from network', 'CacheService');
						 },
						 );
						 */
					} else if (keyData.cachePolicy === CachePolicy.CacheUpdateRefresh) {

						this.cacheResponseStream$.next(val.value);
						this.network.sendToWs({ channel: keyData.channel, data: keyData.data });

						/*this.network.get(keyData).subscribe(
						 x => {
						 this.cacheResponseStream$.next(x);
						 this.put(keyData.name, x);
						 },
						 e => {
						 this.logger.logError('value for ' + keyData.name + 'was not received from network', 'CacheService');
						 this.cacheResponseStream$.error('value for ' + keyData.name + 'was not received from network');
						 },
						 () => {
						 // observer.complete();
						 },
						 );  */
					}
				},
			).catch((evt) => {
				this.logger.logError('Getting value for ' + keyData.name + ' raised an exception', 'CacheService', evt);

				this.network.sendToWs({ channel: keyData.channel, data: keyData.data });

				/*this.network.get(keyData).subscribe(
				 x => {
				 this.put(keyData.name, x);
				 this.cacheResponseStream$.next(x);
				 },
				 e => {
				 this.logger.logError('value for ' + keyData.name + 'was not received from network', 'CacheService');
				 this.cacheResponseStream$.error('value for ' + keyData.name + 'was not received from network');
				 },
				 () => {
				 // observer.complete();
				 },
				 );*/
			});
		}
	}

	public put(keyData: CacheRequest): void {

		// const keyData: {name: string, storeName: string, cachePolicy: CachePolicy, ttl: number} = this._dbController.getStore('keyMap').get(key);

		const store = this._dbController.getStore(keyData.storeName);

		const val = { persistTime: this._getTimeStamp(), ttl: keyData.ttl, value: keyData.data };

		store.add(keyData.name, val).then(() => {
			this.logger.logInfo('value for ' + keyData.name + ' added in cache', 'CacheService', val);
		}).catch((evt) => {
			this.logger.logError('value for ' + keyData.name + ' cache update failed', 'CacheService', evt);
			this.logger.logInfo('Running garbage collection', 'CacheService');

			this._dbController.garbageCollect();
		});
	}

	private _isExpired(persistTime: number, ttl: number): boolean {
		return Date.now() > persistTime + ttl;
	}

	private _getTimeStamp(): number {
		return Date.now();
	}
}
