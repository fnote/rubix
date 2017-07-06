import { CacheController } from './interfaces/cache-controller';
import { LoggerService } from '../../app-utils/logger.service';
import { StorageController } from './interfaces/storage-controller';
import { StorageType } from '../../app-constants/enums/storage-type.enum';
import localForage from 'localforage';

export class LocalforageController implements StorageController, CacheController {

	private storeObj: any;

	constructor(
		private version: number,
		private store: { driver: StorageType[], name: string, size: number, storeName: string, description: string },
		private logger: LoggerService,
	) {
		this.init();
	}

	public getStore(storeName: string): any {
		return this.storeObj;
	}

	public clean(): void {
		this.removeAll();
	}

	public garbageCollect(): void {

		this.storeObj.iterate(function (value: any, key: any): any {
			if (Date.now() > value.persistTime + value.ttl) {
				this.remove(key);
			}
		}).then(() => {
			this.logger.logInfo('Garbage collection completed', 'LocalforageController');
		}).catch((err: Error) => {
			this.logger.logError('Garbage collection failed : ' + err.message, 'LocalforageController');
		});
	}

	public add(key: any, value: any): any {
		return this.storeObj.setItem(key, value);
	}

	public get(key: any): any {
		return this.storeObj.getItem(key);
	}

	public update(key: any, value: any): any {
		return this.storeObj.setItem(key, value);
	}

	public addAll(values: any[], prefix?: string | number): any {
		return null;
	}

	public getKeys(): any {
		this.storeObj.keys();
	}

	public search(searchKey: any): any {
		return this.storeObj.iterate((item, key, iterationNumber) => {
			if (searchKey === key) {
				return [key, item];
			}
		});
	}

	public remove(key: any): any {
		return this.storeObj.removeItem(key);
	}

	public removeAll(): any {
		return this.storeObj.clear();
	}

	private init(): void {
		this.storeObj = localForage.createInstance({
			driver: this.getDrivers(this.store.driver), // Force WebSQL; same as using setDriver()
			name: this.store.name,
			version: this.version,
			size: this.store.size, // Size of database, in bytes. WebSQL-only for now. 5242880= 5MB/1024x1024x5 B
			storeName: this.store.storeName, // Should be alphanumeric, with underscores.
			description: this.store.description,
		});
	}

	private getDrivers(drivers: StorageType[]): string[] {
		const driversArr: any = [];
		drivers.forEach((item): void => {
			if (StorageType[item] === StorageType[StorageType.INDEXEDDB]) {
				driversArr.push(localForage.INDEXEDDB);
			} else if (StorageType[item] === StorageType[StorageType.LOCALSTORAGE]) {
				driversArr.push(localForage.LOCALSTORAGE);
			} else if (StorageType[item] === StorageType[StorageType.WEBSQL]) {
				driversArr.push(localForage.WEBSQL);
			}
		});
		return driversArr;
	}
}
