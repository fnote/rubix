import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { NetworkService } from '../network/network.service';
import { DbController } from './controllers/db-controller';
import { RequestPolicy } from './util/replacement-policy.enum';

@Injectable()
export class CacheService {

	private _version = 7;
	private _dbController : DbController;

	constructor(private network : NetworkService) {
		this._dbController = new DbController(this._version);
	}

	private _isExpired(persistTime : number, ttl : number) : boolean {
		return Date.now() > persistTime + ttl;
	}

	private _getTimeStamp() : number {
		return Date.now();
	}

	public get(key : string) : Observable<number|string | Blob> {
		const self = this;

		const keyData : {name : string, storeName : string, requestPolicy : RequestPolicy, ttl : number}
			= self._dbController.getStore('keyMap').get(key);

		return new Observable((observer : Subscriber<any>) : void => {

			if (keyData.requestPolicy === RequestPolicy.NetWorkOnly) {
				this.network.get(keyData.name).subscribe(
					x => {
						observer.next(x);
					},
					e => {
						observer.error('value for ' + key + 'was not received from network');
					},
					() => {
						observer.complete();
					}
				);
			} else {

				const store = self._dbController.getStore(keyData.storeName);

				store.get(keyData.name).then(
					(val) => {

						if (keyData.requestPolicy === RequestPolicy.CacheOrNetwork) {

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
									}
								);
							}

						} else if (keyData.requestPolicy === RequestPolicy.CacheUpdate) {

							observer.next(val.value);
							observer.complete();
							self.network.get(keyData.name).subscribe(
								x => {
									self.put(key, x);
								},
								e => {
									console.error('value for ' + key + 'was not received from network');
								},
								() => {
								}
							);

						} else if (keyData.requestPolicy === RequestPolicy.CacheUpdateRefresh) {

							observer.next(val.value);

							self.network.get(keyData.name).subscribe(
								x => {
									observer.next(x);
									self.put(key, x);
								},
								e => {
									console.error('value for ' + key + 'was not received from network');
									observer.error('value for ' + key + 'was not received from network');
								},
								() => {
									observer.complete();
								}
							);
						}
					}
				).catch((evt) => {
					console.error('value for ' + key + 'not found in cache');

					self.network.get(keyData.name).subscribe(
						x => {
							self.put(key, x);
							observer.next(x);
						},
						e => {
							console.error('value for ' + key + 'was not received from network');
							observer.error('value for ' + key + 'was not received from network');
						},
						() => {
							observer.complete();
						}
					);
				});
			}
		});
	}

	public put(key : string, value : any) : void {
		const self = this;

		const keyData : {name : string, storeName : string, requestPolicy : RequestPolicy, ttl : number}
			= self._dbController.getStore('keyMap').get(key);

		const store = self._dbController.getStore(keyData.storeName);

		const val = {persistTime : self._getTimeStamp(), 'value' : value};

		store.add(keyData.name, val).then(() => {
			/* tslint:disable */
			console.info('value for ' + key + 'added in cache');
			/* tslint:enable */
		}).catch((evt) => {
			console.error('value for ' + key + 'cache update failed');
		});
	}

	public search(key : string) : Observable<number|string | Blob> {
		const self = this;
		return new Observable((observer : Subscriber<any>) : void => {

		});
	}

	public clear() : void {
		this._dbController.clean();
	}
}
