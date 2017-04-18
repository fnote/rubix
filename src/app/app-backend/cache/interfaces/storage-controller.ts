export interface StorageController {
	getStore(storeNAme: string): any;
	clean(): any;
	garbageCollect(): void;
}
