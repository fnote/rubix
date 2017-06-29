import { CachePolicy } from '../app-constants/enums/cache-policy.enum';
import { CacheRequest } from '../app-backend/cache/cache-request';

export class CacheConfig {

	private _classes = {
		upToDate: {
			cachePolicy: CachePolicy.CacheOrNetwork,
		},
		cacheOneDay: {
			ttl: 86400000,  // (1000*3600*24)
			cachePolicy: CachePolicy.CacheOrNetwork,
		},
		cacheOneWeek: {
			ttl: 432000000,     // (1000*3600*24*5)
			cachePolicy: CachePolicy.CacheOrNetwork,
		},
		cacheVersionCheck: {
			cachePolicy: CachePolicy.CacheOrNetwork,
		},
		/*class4: {
			ttl: 1000,
			cachePolicy: CachePolicy.CacheUpdateRefresh,
		},*/
	};

	private _keys = {
		PriceMeta_46 : { name: 'symbolMeta', category: 'upToDate', store: 'rubix1' },
		/*cash_account: { name: 'cash_accountOne', category: 'upToDate' },
		cash_account2: { name: 'cash_accountTwo', category: 'cacheOneDay' },
		cash_account3: { name: 'cash_accountThree', category: 'cacheOneWeek' },*/
	};

	public get(req: CacheRequest): CacheRequest {
		const keyData = this._keys[req.name];
		req.name = keyData.name;
		req.ttl = this._classes[keyData.category].ttl;
		req.cachePolicy = this._classes[keyData.category].cachePolicy;
		req.storeName = keyData.store;
		return req;
	}

	public has(req: CacheRequest): boolean {
		const keyData = this._keys[req.name];
		return keyData !== undefined;
	}
}
