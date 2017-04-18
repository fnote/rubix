import { CacheController } from './interfaces/cache-controller';
import { StorageController } from './interfaces/storage-controller';
import localForage from 'localforage';

export class LocalforageController implements StorageController, CacheController {

	private _version: number;

	constructor(version: number) {
		this._version = version;
		this.init();
	}

	private init(): void {
		localForage.config({
			driver: [localForage.LOCALSTORAGE, localForage.INDEXEDDB, localForage.WEBSQL], // Force WebSQL; same as using setDriver()
			name: 'rubix',
			version: this._version,
			size: 5242880, // Size of database, in bytes. WebSQL-only for now. 5242880= 5MB/1024x1024x5 B
			storeName: 'rubix1', // Should be alphanumeric, with underscores.
			description: 'some description',
		});
	}

	public getStore(storeName: string): any {
		return this;
	}

	public clean(): void {
		this.removeAll();
	}

	public garbageCollect(): void {
		// do nothing
	}

	public add(key: any, value: any): any {
		return localForage.setItem(key, value);
	}

	public get(key: any): any {
		return localForage.getItem(key);
	}

	public update(key: any, value: any): any {
		return localForage.setItem(key, value);
	}

	public addAll(values: any[], prefix?: string | number): any {
		return null;
	}

	public getKeys(): any {
		localForage.keys();
	}

	public search(searchKey: any): any {
		return localForage.iterate((item, key, iterationNumber) => {
			if (searchKey === key) {
				return [key, item];
			}
		});
	}

	public remove(key: any): any {
		return localForage.removeItem(key);
	}

	public removeAll(): any {
		return localForage.clear();
	}
}
