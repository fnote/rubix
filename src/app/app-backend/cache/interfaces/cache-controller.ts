export interface CacheController {
	add(key: any, value: any): any;
	update(key: any, value: any): any;
	addAll(values: any[], prefix?: string | number): any;
	get(key: any): any;
	getKeys(): any;
	search(key: any): any;
	remove(key: any): any;
	removeAll(): any;
}
