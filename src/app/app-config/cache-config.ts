import { CachePolicy } from '../app-constants/enums/cache-policy.enum';
export class CacheConfig {

	private _classes = {
		class1: {
			ttl: 1000,
			cachePolicy: CachePolicy.NetWorkOnly,
		},
		class2: {
			ttl: 1000,
			cachePolicy: CachePolicy.CacheOrNetwork,
		},
		class3: {
			ttl: 1000,
			cachePolicy: CachePolicy.CacheUpdate,
		},
		class4: {
			ttl: 1000,
			cachePolicy: CachePolicy.CacheUpdateRefresh,
		},
	};

	private _keys = {
		cash_account: { name: 'cash_accountOne', storeName: 'default', category: 'class1' },
		cash_account2: { name: 'cash_accountTwo', storeName: 'default', category: 'class2' },
		cash_account3: { name: 'cash_accountThree', storeName: 'default', category: 'class3' },
		cash_account4: { name: 'cash_accountFour', storeName: 'default', category: 'class4' },
	};

	public get(key: any): {} {
		const keyData = this._keys[key];
		keyData.ttl = this._classes[keyData.category].ttl;
		keyData.cachePolicy = this._classes[keyData.category].cachePolicy;
		return keyData;
	}
}
