import { Injectable } from '@angular/core';

const MAX_STORAGE_LIMIT = 4500000; // 1000 * 1000 * 4.5
const STORAGE_CLEAR_STOP_LIMIT = 4000000; // 1000 * 1000 * 4
@Injectable()
export class StorageService {
	persistTimeObj;
	persistIteration = 1;
	keys : {
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

	getCurrentDate() : number {
		return new Date().getTime();
	}

	saveData(key : string , dataObj : any) : void {
		if (typeof localStorage !== 'undefined') {
			dataObj.persistTime = this.getCurrentDate();
			this.addToPersistTimeArr(key , dataObj.persistTime);
			localStorage.setItem(key, JSON.stringify(dataObj));
		}
	}

	getData(key : string) : any {
		const item = null;
		if (typeof localStorage !== 'undefined') {
			return (JSON.parse(localStorage.getItem(key)));
		}
	}

	removeItem(key : string) : void {
		if (typeof localStorage !== 'undefined') {
			this.removeFromPersistTimeArr(key);
			localStorage.removeItem(key);
		}
	}

	clearAllData(key : string) : void {
		localStorage.clear();
		this.persistTimeObj.arr = [];
	}

	addToPersistTimeArr(key : string , persistTime : number) : void {
		const persistTimeObj = this.persistTimeObj;
		let persistTimeArr = [];
		persistTimeArr = persistTimeObj.arr;
		if (this.persistIteration % 100 === 0 && JSON.stringify(localStorage).length > MAX_STORAGE_LIMIT) {
				persistTimeArr = persistTimeArr.sort(function(a, b) {
					return (a.persistTime > b.persistTime) ? -1 : ((b.persistTime > a.persistTime) ? 1 : 0);
				} );
				let oldestItem;
				do {
					for (let i = 0 ; i < 1000 ; i++) {
						oldestItem = persistTimeArr.pop();
						localStorage.removeItem(oldestItem.key);
					}
				}while (JSON.stringify(localStorage).length > STORAGE_CLEAR_STOP_LIMIT);
		}
		persistTimeArr.push({key : key , persistTime : persistTime});
		persistTimeObj.arr = persistTimeArr;
		if (this.persistIteration % 100 === 0) {// TODO: [Malindu] do this on browser close also
			localStorage.setItem('persistTimeObj' , JSON.stringify(persistTimeObj));
		}
			this.persistIteration ++;
	}

	removeFromPersistTimeArr(key : string) : void {
		this.persistTimeObj.arr = this.persistTimeObj.arr.filter(item => item.key !== key);
		this.persistIteration ++;
	}
}
