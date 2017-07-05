import { CacheController } from './interfaces/cache-controller';
import { LoggerService } from '../../app-utils/logger.service';
import { StorageController } from './interfaces/storage-controller';
import localForage from 'localforage';

export class LocalforageController implements StorageController, CacheController {

	private _version: number;

	constructor(public version: number, private logger: LoggerService) {
		this._version = version;
		this.init();
	}

	public getStore(storeName: string): any {
		return this;
	}

	public clean(): void {
		this.removeAll();
	}

	public garbageCollect(): void {
		const self = this;
		localForage.iterate(function(value: any, key: any): any {
			if (Date.now() > value.persistTime + value.ttl) {
				self.remove(key);
			}
		}).then(() => {
			self.logger.logInfo('Garbage collection completed', 'LocalforageController');
		}).catch((err: Error) => {
			self.logger.logError('Garbage collection failed : ' + err.message , 'LocalforageController');
		});
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

	private init(): void {
		localForage.config({
			driver: [localForage.INDEXEDDB, localForage.LOCALSTORAGE, localForage.WEBSQL], // Force WebSQL; same as using setDriver()
			name: 'rubix',
			version: this._version,
			size: 5242880, // Size of database, in bytes. WebSQL-only for now. 5242880= 5MB/1024x1024x5 B
			storeName: 'default', // Should be alphanumeric, with underscores.
			description: 'some description',
		});
	}
}
