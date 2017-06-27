import { CacheKeyGenerator } from './cache-key-generator';
import { CachePolicy } from '../../app-constants/enums/cache-policy.enum';
import { DbController } from './db-controller';
import { Injectable } from '@angular/core';
import { LoggerService } from '../../app-utils/logger.service';
import { NetworkService } from '../network/network.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscriber } from 'rxjs/Subscriber';

@Injectable()
export class CacheService {

	private _version = 7;
	private _dbController: DbController;
	private _keygen: CacheKeyGenerator;
	private cacheResponseStream$: Subject<any>;

	constructor(private network: NetworkService, private logger: LoggerService) {
		this._dbController = new DbController(this._version, logger);
		this.cacheResponseStream$ = new Subject();
		this._keygen = new CacheKeyGenerator();
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

	public get(key: string): void {

		const keyData: {name: string, storeName: string, cachePolicy: CachePolicy, ttl: number} = this._dbController.getStore('keyMap').get(key);

		if (keyData.cachePolicy === CachePolicy.NetWorkOnly) {
			this.network.get(keyData.name).subscribe(
				x => {
					this.cacheResponseStream$.next(x);
				},
				e => {
					this.cacheResponseStream$.error('value for ' + key + 'was not received from network');
				},
			);
		} else {

			const store = this._dbController.getStore(keyData.storeName);

			store.get(keyData.name).then(
				(val) => {

					if (keyData.cachePolicy === CachePolicy.CacheOrNetwork) {

						if (!this._isExpired(val.persistTime, keyData.ttl)) {
							this.cacheResponseStream$.next(val.value);
						} else {
							this.network.get(keyData.name).subscribe(
								x => {
									this.cacheResponseStream$.next(x);
									this.put(key, x);
								},
								e => {
									this.cacheResponseStream$.error('value for ' + key + 'was not received from network');
								},
								() => {
									// observer.complete();
								},
							);
						}

					} else if (keyData.cachePolicy === CachePolicy.CacheUpdate) {

						this.cacheResponseStream$.next(val.value);

						this.network.get(keyData.name).subscribe(
							x => {
								this.put(key, x);
							},
							e => {
								this.logger.logError('value for ' + key + 'was not received from network', 'CacheService');
							},
							() => {
								this.logger.logInfo('value for ' + key + 'received from network', 'CacheService');
							},
						);

					} else if (keyData.cachePolicy === CachePolicy.CacheUpdateRefresh) {

						this.cacheResponseStream$.next(val.value);

						this.network.get(keyData.name).subscribe(
							x => {
								this.cacheResponseStream$.next(x);
								this.put(key, x);
							},
							e => {
								this.logger.logError('value for ' + key + 'was not received from network', 'CacheService');
								this.cacheResponseStream$.error('value for ' + key + 'was not received from network');
							},
							() => {
								// observer.complete();
							},
						);
					}
				},
			).catch((evt) => {
				this.logger.logError('value for ' + key + 'not found in cache', 'CacheService', evt);

				this.network.get(keyData.name).subscribe(
					x => {
						this.put(key, x);
						this.cacheResponseStream$.next(x);
					},
					e => {
						this.logger.logError('value for ' + key + 'was not received from network', 'CacheService');
						this.cacheResponseStream$.error('value for ' + key + 'was not received from network');
					},
					() => {
						// observer.complete();
					},
				);
			});
		}
	}

	public put(key: string, value: any): void {

		const keyData: {name: string, storeName: string, cachePolicy: CachePolicy, ttl: number} = this._dbController.getStore('keyMap').get(key);

		const store = this._dbController.getStore(keyData.storeName);

		const val = { persistTime: this._getTimeStamp(), ttl: keyData.ttl, value: value };

		store.add(keyData.name, val).then(() => {
			this.logger.logInfo('value for ' + key + 'added in cache', 'CacheService');
		}).catch((evt) => {
			this.logger.logError('value for ' + key + 'cache update failed', 'CacheService', evt);
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
