import { BaseDataStore } from './base-data-store';
import { IndexEntity } from '../business-entities/index-entity';
import { Injectable } from '@angular/core';
import { StockDataStore } from './stock-data-store';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class IndexDataStore extends BaseDataStore {
	private allIndexStore = [];
	private randomMultiplier = 300;
	private symtTypeIndex = 8;
	public indicesLodingState: Subject<any> = new Subject();

	constructor(private stockDataStore: StockDataStore) {
		super();
	}

	public getOrAddIndex(cat: string, des: string): IndexEntity {
		const key: string = cat + '~' + des;
		let indexObj = this.allIndexStore[key];
		if (!indexObj) {
			indexObj = new IndexEntity({
				cat: cat,
				des: des,
			});
			this.allIndexStore[key] = indexObj;
		}
		return indexObj;
	}

	public updateIndexDataStote(response: Object): void {

		for (const res of response['GMS']) {
			// Add only default categoy indices and skip currency indices
			if (res.cat === 'DEF' && res.symt === this.symtTypeIndex) {
				const obj = this.getOrAddIndex(res.cat, res.des);
				obj.contry = res.contry;
				obj.sDes = res.sDes;
				obj.indexSymbolCode = res.indexSymbolCode;
			}
			// else ignore
		}
		this.indicesLodingState.next();
	}

	public getAllIndexList(): any[] {
		const allCountryList = [];
		for (const key in this.allIndexStore) {
			if (this.allIndexStore.hasOwnProperty(key)) {

				const entity = this.allIndexStore[key];
				const symbolIndexCode = entity.indexSymbolCode.split('~');
				const stock = this.stockDataStore.getOrAddStock([symbolIndexCode[0], symbolIndexCode[2]]);
				const country = {
					code: entity.contry,
					value: Math.random() * this.randomMultiplier,
					name: entity.sDes,
					chg : stock.perChange,
					last : stock.getDispLastTradePrice(),
				};
				allCountryList.push(country);
			}
		}
		return allCountryList;
	}
}
