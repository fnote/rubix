import { CacheController } from '../util/cache-controller';
import { StorageController } from './storage-controller';

export class LocalstorageController implements StorageController {
	private _localstorage : any;
	private _dbVersion : number;

	constructor(version : number) {
		this._localstorage = window.localStorage;
		this._dbVersion = version;

		this.init();
	}

	private init() : void {
	}

	public getStore(storeName : string) : any {
		let self = this;
		return;
	}

	public garbageCollect() : void {
	}
}
