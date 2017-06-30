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
		PriceMeta_46 : { alias: 'symbolMeta', category: 'cacheOneDay', store: 'rubix' },
		PriceMeta_96 : { alias: 'mutfundMore', category: 'cacheOneDay', store: 'rubix' },
	};

	public get(req: CacheRequest): CacheRequest {
		const keyData = this._keys[req.category];
		req.category = keyData.alias;
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
