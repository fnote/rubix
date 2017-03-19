import { RequestPolicy } from './util/replacement-policy.enum';
import { CashAccount } from '../models/cash-account';
export class CacheConfig {

	private _stores = {
	};

	private _classes = {
		class1 : {
			ttl : 1000,
			requestPolicy : RequestPolicy.NetWorkOnly,
		},
		class2 : {
			ttl : 1000,
			requestPolicy : RequestPolicy.CacheOrNetwork,
		},
		class3 : {
			ttl : 1000,
			requestPolicy : RequestPolicy.CacheUpdate,
		},
		class4 : {
			ttl : 1000,
			requestPolicy : RequestPolicy.CacheUpdateRefresh,
		}
	};

	private _keys = {
		cash_account : {name : 'cash_accountOne', storeName : 'default', life : 'class1'},
		cash_account2 : {name : 'cash_accountTwo', storeName : 'default', life : 'class2'},
		cash_account3 : {name : 'cash_accountThree', storeName : 'default', life : 'class3'},
		cash_account4 : {name : 'cash_accountFour', storeName : 'default', life : 'class4'}
	};

	private _config : {};

	constructor() {
	}

	public get(key : any) : {} {
		const keyData = this._keys[key];
		keyData.ttl  = this._classes[keyData.life].ttl;
		keyData.requestPolicy  = this._classes[keyData.life].requestPolicy;
		return keyData;
	}
}
