import { CachePolicy } from '../../app-constants/enums/cache-policy.enum';
import { DbController } from './db-controller';
import { Injectable } from '@angular/core';
import { LoggerService } from '../../app-utils/logger.service';
import { NetworkService } from '../network/network.service';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

@Injectable()
export class CacheService {

	private _version = 7;
	private _dbController: DbController;

	constructor(private network: NetworkService, private logger: LoggerService) {
		this._dbController = new DbController(this._version, logger);
	}

	private _isExpired(persistTime: number, ttl: number): boolean {
		return Date.now() > persistTime + ttl;
	}

	private _getTimeStamp(): number {
		return Date.now();
	}

	public get(key: string): Observable<number|string | Blob> {
		const self = this;

		const keyData: {name: string, storeName: string, cachePolicy: CachePolicy, ttl: number}
			= self._dbController.getStore('keyMap').get(key);

		return new Observable((observer: Subscriber<any>): void => {

			if (keyData.cachePolicy === CachePolicy.NetWorkOnly) {
				this.network.get(keyData.name).subscribe(
					x => {
						observer.next(x);
					},
					e => {
						observer.error('value for ' + key + 'was not received from network');
					},
					() => {
						observer.complete();
					},
				);
			} else {

				const store = self._dbController.getStore(keyData.storeName);

				store.get(keyData.name).then(
					(val) => {

						if (keyData.cachePolicy === CachePolicy.CacheOrNetwork) {

							if (!self._isExpired(val.persistTime, keyData.ttl)) {
								observer.next(val.value);
								observer.complete();
							} else {
								self.network.get(keyData.name).subscribe(
									x => {
										observer.next(x);
										self.put(key, x);
									},
									e => {
										observer.error('value for ' + key + 'was not received from network');
									},
									() => {
										observer.complete();
									},
								);
							}

						} else if (keyData.cachePolicy === CachePolicy.CacheUpdate) {

							observer.next(val.value);
							observer.complete();
							self.network.get(keyData.name).subscribe(
								x => {
									self.put(key, x);
								},
								e => {
									self.logger.logError('value for ' + key + 'was not received from network', 'CacheService');
								},
								() => {
									self.logger.logInfo('value for ' + key + 'received from network', 'CacheService');
								},
							);

						} else if (keyData.cachePolicy === CachePolicy.CacheUpdateRefresh) {

							observer.next(val.value);

							self.network.get(keyData.name).subscribe(
								x => {
									observer.next(x);
									self.put(key, x);
								},
								e => {
									self.logger.logError('value for ' + key + 'was not received from network', 'CacheService');
									observer.error('value for ' + key + 'was not received from network');
								},
								() => {
									observer.complete();
								},
							);
						}
					},
				).catch((evt) => {
					self.logger.logError('value for ' + key + 'not found in cache', 'CacheService');
					/* tslint:disable */
					console.error(evt);
					/* tslint:enable */

					self.network.get(keyData.name).subscribe(
						x => {
							self.put(key, x);
							observer.next(x);
						},
						e => {
							self.logger.logError('value for ' + key + 'was not received from network', 'CacheService');
							observer.error('value for ' + key + 'was not received from network');
						},
						() => {
							observer.complete();
						},
					);
				});
			}
		});
	}

	public put(key: string, value: any): void {
		const self = this;

		const keyData: {name: string, storeName: string, cachePolicy: CachePolicy, ttl: number}
			= self._dbController.getStore('keyMap').get(key);

		const store = self._dbController.getStore(keyData.storeName);

		const val = { persistTime: self._getTimeStamp(), ttl: keyData.ttl, value: value };

		store.add(keyData.name, val).then(() => {
			/* tslint:disable */
			self.logger.logInfo('value for ' + key + 'added in cache', 'CacheService');
			/* tslint:enable */
		}).catch((evt) => {
			self.logger.logError('value for ' + key + 'cache update failed', 'CacheService');

			self.logger.logInfo('Running garbage collection', 'CacheService');
			self._dbController.garbageCollect();
		});
	}

	public search(key: string): Observable<number|string | Blob> {
		const self = this;
		return new Observable((observer: Subscriber<any>): void => {
			observer.next(1);
			observer.complete();
		});
	}

	public clear(): void {
		this._dbController.clean();
	}
}
