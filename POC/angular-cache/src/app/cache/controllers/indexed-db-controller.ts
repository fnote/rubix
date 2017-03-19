import {AngularIndexedDB} from 'angular2-indexeddb';
import { StorageController } from './storage-controller';
import { CacheConfig } from '../cache-config';
import localForage from "localforage";

export class IndexedDBController implements StorageController {

	private dbVersion : number;
	private _config : CacheConfig;

	constructor(version : number, config : CacheConfig) {

		this.dbVersion = version || 1;
		this._config = config;
		this.init();
	}

	private init() : void {
		const self = this;

		for (const store in self._config.stores){
			if (self._config.keys.hasOwnProperty(key)){
				const storeName = self._config.keys[key];
				cache.add(key, {name : key, storeName : storeName});
			}
		}
		let db = new AngularIndexedDB('myDb', 1);

		db.createStore(1, (evt) => {
			let objectStore = evt.currentTarget.result.createObjectStore(
				'people', { keyPath: "id", autoIncrement: true });

			objectStore.createIndex("name", "name", { unique: false });
			objectStore.createIndex("email", "email", { unique: true });
		});
	}


	public getStore(storeName : string) : Promise<any> {
		const self = this;

		return new Promise((resolve, reject) => {
			self.connect(resolve, reject, storeName);
		});
	}

	private upgradeCallback(evt : any) : void {
		const self = this;

		const db = evt.currentTarget.result;

		for (const store of self._config.stores) {    // load from config

			const objectStore = db.createObjectStore(store.name);

			// let objectStore = db.createObjectStore(CashAccount, {keyPath: "CASH_ACC_NUM"});
			// objectStore.createIndex("CASH_ACC_NUM", "CASH_ACC_NUM", {unique: false});
			// objectStore.createIndex("SEC_ACC_NUM", "SEC_ACC_NUM", {unique: true});
			const cache = new IndexedDBStore(db, new Store(store.name, READ_WRITE_MODE));
			self.caches.push(cache);

			if(cache.store.name === 'keyMap'){
				for (const key in self._config.keys){
					if (self._config.keys.hasOwnProperty(key)){
						const storeName = self._config.keys[key];
						cache.add(key, {name : key, storeName : storeName});
					}
				}
			}
		}
	}

	private connect(resolve : any, reject: any, storeName : string) : void {
		const self = this;

		const request = self.indexedDB.open('db', self.dbVersion);

		request.onsuccess = (evt) => {
			console.log('success');

			self.db = request.result;

			if (self.caches.length === 0) {
				for (const index of Object.keys(self.db.objectStoreNames)) {
					const cache = new IndexedDBStore(self.db, new Store(self.db.objectStoreNames[index], READ_WRITE_MODE));
					self.caches.push(cache);
				}
			}

			self.caches.filter((cache) => {
				if (cache.store.name === storeName) {
					resolve(cache);
				}
			});
		};

		request.onerror = (evt) => {
			console.log('error');
			reject(`IndexedDB error: ${(<any>evt.target).errorCode}`);
		};

		request.onupgradeneeded = (evt) => {
			console.log('upgrade');
			self.upgradeCallback(evt);

			self.caches.filter((cache) => {
				if (cache.store.name === storeName) {
					resolve(cache);
				}
			});
		};
	}

	private validateStoreName(storeName : string) : boolean {
		return this.db.objectStoreNames.contains(storeName) && this.caches[storeName];
	};

	private validateBeforeTransaction(storeName : string) : void {
		if (!this.db) {
			console.error('You need to use the createStore function to create a database before you query it!');
		}
		if (!this.validateStoreName(storeName)) {
			console.error((`objectStore does not exists: ${storeName}`));
		}
	}

	public garbageCollect() : void {
	}
}
