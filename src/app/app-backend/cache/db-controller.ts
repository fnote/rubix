import { CacheConfig } from '../../app-config/cache-config';
import { LocalforageController } from './localforage-controller';
import { LoggerService } from '../../app-utils/logger.service';
import { StorageController } from './interfaces/storage-controller';
import { StorageType } from '../../app-constants/enums/storage-type.enum';

export class DbController implements StorageController {
	private config: CacheConfig;
	private stores: Map<string, StorageController>;

	constructor(version: number, logger: LoggerService) {

		this.config = new CacheConfig();
		const storeConf = this.config.dataStores;

		this.stores = new Map<string, StorageController>();

		storeConf.forEach((store: { driver: StorageType[], name: string, size: number, storeName: string, description: string }): void => {
			if (store.driver.find((driver: StorageType): boolean => {
				return driver === StorageType.INDEXEDDB;
			})) {
				this.stores.set(store.storeName, new LocalforageController(version, store, logger));
			}
		});
	}

	public getStore(storeName: string): any {

		if (storeName === 'keyMap') {
			return this.config;
		} else {
			return this.stores.get(storeName);
		}
	}

	public clean(): void {
		this.stores.forEach((store: StorageController): void => {
			store.clean();
		});
	}

	public garbageCollect(): void {
		this.stores.forEach((store: StorageController): void => {
			store.garbageCollect();
		});
	}
}
