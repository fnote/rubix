import { Store } from './store';
import { CacheController } from './cache-controller';

/***
 *
 * refer https://github.com/gilf/angular2-indexeddb for reference
 */
export class IndexedDBStore implements CacheController {
	private db : IDBDatabase;
	private name : Store;

	const READ_WRITE_MODE = 'readonly';

	constructor(db : IDBDatabase, name : string, mode = READ_WRITE) {
		this.db = db;
		this.store = store;
	}

	private createTransaction(options : {error : (e : Event) => any, complete : (e : Event) => any, abort? : (e : Event) => any })
	: IDBTransaction {
		const self = this;
		const trans : IDBTransaction = self.db.transaction(self.store.name, self.store.mode);
		trans.onerror = options.error;
		trans.oncomplete = options.complete;
		trans.onabort = options.abort;
		return trans;
	}

	public add(key : string, value : any) : Promise<any> {
		const self = this;
		const promise = new Promise<any>((resolve, reject) => {

			let transaction = self.createTransaction({
					error : (e : Event) => {
						reject(e);
					},
					complete : (e : Event) => {
						resolve({key : key, value : value});
					}
				}),
				objectStore = transaction.objectStore(this.store.name);

			objectStore.add(value, key);
		});

		return promise;
	}

	public update(key : string, value : any) : Promise<any> {
		const self = this;
		const promise = new Promise<any>((resolve, reject) => {

			let transaction = self.createTransaction({
					error : (e : Event) => {
						reject(e);
					},
					complete : (e : Event) => {
						resolve(value);
					},
					abort : (e : Event) => {
						reject(e);
					}
				}),
				objectStore = transaction.objectStore(self.store.name);

			objectStore.put(value, key);
		});

		return promise;
	}

	public addAll(values : any[]) : Promise<any> {
		return new Promise<any>(() => {
		});
	}

	public get(key : string) {
		const self = this;
		const promise = new Promise<any>((resolve, reject) => {

			let transaction = self.createTransaction({
					error : (e : Event) => {
						reject(e);
					},
					complete : (e : Event) => {
					}
				}),
				objectStore = transaction.objectStore(self.store.name),
				request : IDBRequest;

			request = objectStore.get(key);
			request.onsuccess = function (event : Event) {
				resolve((<any>event.target).result);
			}
		});

		return promise;
	}

	public search(key : string, values : any[]) : Promise<any> {
		return new Promise<any>(() => {
		});
	}

	public remove(key : string) : Promise<any> {
		const self = this;
		const promise = new Promise<any>((resolve, reject) => {

			let transaction = self.createTransaction({
					error : (e : Event) => {
						reject(e);
					},
					complete : (e : Event) => {
						resolve();
					},
					abort : (e : Event) => {
						reject(e);
					}
				}),
				objectStore = transaction.objectStore(self.store.name);

			objectStore["delete"](key);
		});

		return promise;
	}

	public removeAll() : Promise<any> {
		const self = this;
		const promise = new Promise<any>((resolve, reject) => {

			let transaction = self.createTransaction({
					error : (e : Event) => {
						reject(e);
					},
					complete : (e : Event) => {
						resolve();
					},
					abort : (e : Event) => {
						reject(e);
					}
				}),
				objectStore = transaction.objectStore(self.store.name);
			objectStore.clear();
			resolve();
		});
		return promise;
	}

	public getAll(keyRange? : IDBKeyRange) : Promise<any> {
		const self = this;
		const promise = new Promise<any>((resolve, reject) => {

			let transaction = self.createTransaction({
					error : (e : Event) => {
						reject(e);
					},
					complete : (e : Event) => {
					}
				}),
				objectStore = transaction.objectStore(self.store.name),
				result : Array<any> = [],
				request = objectStore.openCursor(keyRange);

			request.onerror = function (e) {
				reject(e);
			};

			request.onsuccess = function (evt : Event) {
				let cursor = (<IDBOpenDBRequest>evt.target).result;
				if (cursor) {
					result.push(cursor.value);
					cursor["continue"]();
				} else {
					resolve(result);
				}
			};
		});

		return promise;
	}


	public openCursor(cursorCallback : (evt : Event) => void, keyRange? : IDBKeyRange) : Promise<any> {
		const self = this;
		const promise = new Promise<any>((resolve, reject) => {

			let transaction = self.createTransaction({
					error : (e : Event) => {
						reject(e);
					},
					complete : (e : Event) => {
						resolve();
					},
					abort : (e : Event) => {
						reject(e);
					}
				}),
				objectStore = transaction.objectStore(self.store.name),
				request = objectStore.openCursor(keyRange);

			request.onsuccess = (evt : Event) => {
				cursorCallback(evt);
				resolve();
			};
		});

		return promise;
	}

	public getByIndex(indexName : string, key : any) : Promise<any> {
		const self = this;
		const promise = new Promise<any>((resolve, reject) => {

			let transaction = self.createTransaction({
					error : (e : Event) => {
						reject(e);
					},
					abort : (e : Event) => {
						reject(e);
					},
					complete : (e : Event) => {
					}
				}),
				objectStore = transaction.objectStore(self.store.name),
				index = objectStore.index(indexName),
				request = index.get(key);

			request.onsuccess = (event) => {
				resolve((<IDBOpenDBRequest>event.target).result);
			};
		});

		return promise;
	}
}
