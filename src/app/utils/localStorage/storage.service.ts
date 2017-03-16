import { Injectable } from '@angular/core';

const MAX_STORAGE_LIMIT = 4500000; // 1000 * 1000 * 4.5
const STORAGE_CLEAR_STOP_LIMIT = 4000000; // 1000 * 1000 * 4
const ITERATIONS_PER_LOCALSTORAGE_SIZE_CHECK = 100;
const ITEMS_TO_REMOVE_ON_LOCALSTORAGE_LOWER_LIMIT_CHECK = 1000;
@Injectable()
export class StorageService {

	private persistTimeObj;
	private persistIteration = 1;
	private keys : {
		profileKeys : {

		},
		metaKeys : {

		}
	};

	constructor() {
		this.persistTimeObj = JSON.parse(localStorage.getItem('persistTimeObj'));
		if (!this.persistTimeObj) {
				localStorage.clear();
				this.persistTimeObj = {persistTime : 'infi' , arr : []};
		}
	}

	private getCurrentDate() : number {// TODO : [Malindu] use function in utils
		return new Date().getTime();
	}

	public saveData(key : string , dataObj : any) : void {
		if (typeof localStorage !== 'undefined') {
			dataObj.persistTime = this.getCurrentDate();
			this.addToPersistTimeArr(key , dataObj.persistTime);
			localStorage.setItem(key, JSON.stringify(dataObj));
		}
	}

	public getData(key : string) : any {
		const item = null;
		if (typeof localStorage !== 'undefined') {
			return (JSON.parse(localStorage.getItem(key)));
		}
	}

	public removeItem(key : string) : void {
		if (typeof localStorage !== 'undefined') {
			this.removeFromPersistTimeArr(key);
			localStorage.removeItem(key);
		}
	}

	public clearAllData(key : string) : void {
		localStorage.clear();
		this.persistTimeObj.arr = [];
	}

	private addToPersistTimeArr(key : string , persistTime : number) : void {
		const persistTimeObj = this.persistTimeObj;
		let persistTimeArr = [];
		persistTimeArr = persistTimeObj.arr;
		if (this.persistIteration % ITERATIONS_PER_LOCALSTORAGE_SIZE_CHECK === 0 && JSON.stringify(localStorage).length > MAX_STORAGE_LIMIT) {
			persistTimeArr = persistTimeArr.sort(
				function(a : {key : string , persistTime : number } , b : {key : string , persistTime : number }) : number {
					return (a.persistTime > b.persistTime) ? -1 : ((b.persistTime > a.persistTime) ? 1 : 0);
				} );
				let oldestItem;
				do {
					for (let i = 0 ; i < ITEMS_TO_REMOVE_ON_LOCALSTORAGE_LOWER_LIMIT_CHECK ; i++) {
						oldestItem = persistTimeArr.pop();
						localStorage.removeItem(oldestItem.key);
					}
				}while (JSON.stringify(localStorage).length > STORAGE_CLEAR_STOP_LIMIT);
		}
		persistTimeArr.push({key : key , persistTime : persistTime});
		persistTimeObj.arr = persistTimeArr;
		// if (this.persistIteration % 100 === 0) {// TODO: [Malindu] Uncomment this if performance is low & do this on browser close also
			localStorage.setItem('persistTimeObj' , JSON.stringify(persistTimeObj));
		// }
			this.persistIteration ++;
	}

	private removeFromPersistTimeArr(key : string) : void {
		this.persistTimeObj.arr = this.persistTimeObj.arr.filter(item => item.key !== key);
		this.persistIteration ++;
	}
}
