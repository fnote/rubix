import { CacheConfig } from '../../config/cache-config';
import { LocalforageController } from './localforage-controller';
import { LoggerService } from '../../utils/logger.service';
import { StorageController } from './interfaces/storage-controller';

export class DbController implements StorageController {
	private _db: StorageController;
	private _config: CacheConfig;

	constructor(version: number, logger: LoggerService) {

		this._config = new CacheConfig();
		/* const indexedDB =
		 window.indexedDB || (<any>window).mozIndexedDB || (<any>window).webkitIndexedDB || (<any>window).msIndexedDB;

		 if (indexedDB) {
		 this._db = new IndexedDBController(version, this._config);
		 } else {
		 this._db = new LocalstorageController(version);
		 } */
		this._db = new LocalforageController(version, logger);
	}

	public getStore(storeName: string): any {
		const self = this;
		if (storeName === 'keyMap') {
			return this._config;
		} else {
			return self._db.getStore(storeName);
		}
	}

	public clean(): void {
		this._db.clean();
	}

	public garbageCollect(): void {
		this._db.garbageCollect();
	}
}
