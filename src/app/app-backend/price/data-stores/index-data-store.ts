import { BaseDataStore } from './base-data-store';
import { IndexEntity } from '../business-entities/index-entity';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class IndexDataStore extends BaseDataStore {
	private allIndexStore = [];
	private randomMultiplier = 300;
	public indicesLodingState: Subject<any> = new Subject();

	public getOrAddIndex(cat: string, des: string): IndexEntity {

		const key: string = cat + '~' + des;
		let inexObj = this.allIndexStore[key];

		if (!inexObj) {
			inexObj = new IndexEntity({
				cat: cat,
				des: des,
			});
			this.allIndexStore[key] = inexObj;
		}
		return inexObj;
	}

	public updateIndexDataStote(response: Object): void {
		for (const entry of response['GMS']) {
			const entity = this.getOrAddIndex(entry.cat, entry.des);
			entity.con = entry.con;
			entity.sDes = entry.sDes;
		}
		this.indicesLodingState.next();

	}

	public getAllIndexList(): any[] {

		const allCountryList = [];

		for (const key in this.allIndexStore) {
			if (this.allIndexStore.hasOwnProperty(key)) {
				const entity = this.allIndexStore[key];
				const country = {
					code: entity.con,
					value: Math.random() * this.randomMultiplier,
					name: entity.sDes,
				};
				allCountryList.push(country);
			}
		}
		return allCountryList;
	}
}
