import localForage from 'localforage';
import { StorageController } from './storage-controller';
import { CacheController } from '../util/cache-controller';
import { CacheConfig } from '../cache-config';

export class LocalforageController implements StorageController, CacheController {
	private _version : number;
	private _config : CacheConfig;

	constructor(version : number, config : CacheConfig) {
		this._version = version;
		this._config = config;

		this.init();
	}

	private init() : void {
		localForage.config({
			driver : [localForage.INDEXEDDB, localForage.LOCALSTORAGE, localForage.WEBSQL], // Force WebSQL; same as using setDriver()
			name : 'rubix',
			version : this._version,
			size : 5242880, // Size of database, in bytes. WebSQL-only for now. 5242880= 5MB/1024x1024x5 B
			storeName : 'rubix1', // Should be alphanumeric, with underscores.
			description : 'some description'
		});
	}

	public getStore(storeName : string) : any {
		return this;
	}

	public clean() : void{
		this.removeAll();
	}

	public garbageCollect() : void {
	}

	public add(key : any, value : any) : any {
		return localForage.setItem(key, value);
	}

	public get(key : any) : any {
		return localForage.getItem(key);
	}

	public update(key : any, value : any) : any {
		return localForage.setItem(key, value);
	}

	public addAll(values : any[], prefix? : string | number) : any {
		return null;
	}

	public getKeys() : any {
		localForage.keys();
	}

	public search(searchKey : any) : any {
		return localForage.iterate((item, key, iterationNumber) => {
			if (searchKey === key) {
				return [key, item];
			}
		});
	}

	public remove(key : any) : any {
		return localForage.removeItem(key);
	}

	public removeAll() : any {
		return localForage.clear();
	}
}
