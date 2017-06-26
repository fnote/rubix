import { CachePolicy } from '../app-constants/enums/cache-policy.enum';

export class CacheConfig {

	private _classes = {
		upToDate: {
			cachePolicy: CachePolicy.NetWorkOnly,
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
		rt80Request : { name: 'rt_80_req', category: 'cacheVersionCheck' },
		/*cash_account: { name: 'cash_accountOne', category: 'upToDate' },
		cash_account2: { name: 'cash_accountTwo', category: 'cacheOneDay' },
		cash_account3: { name: 'cash_accountThree', category: 'cacheOneWeek' },*/
	};

	public get(key: any): {} {
		const keyData = this._keys[key];
		keyData.ttl = this._classes[keyData.category].ttl;
		keyData.cachePolicy = this._classes[keyData.category].cachePolicy;
		return keyData;
	}
}
