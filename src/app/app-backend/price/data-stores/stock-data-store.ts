import { BaseDataStore } from './base-data-store';
import { CommonHelperService } from '../../../app-utils/helper/common-helper.service';
import { Injectable } from '@angular/core';
import { StockEntity } from '../business-entities/stock-entity';

@Injectable()
export class StockDataStore extends BaseDataStore {

	private allStockStore = {};

	constructor(private commonHelperService: CommonHelperService) {
		super();
	}

	public getOrAddStock(exgSym: [string, string]): StockEntity {
		const key = this.commonHelperService.generateKey(exgSym[0], exgSym[1]);
		let stockObj = this.allStockStore[key];

		if (!stockObj) {
			stockObj = new StockEntity({
				exchangeCode: exgSym[0],
				symbolCode: exgSym[1],
			});
			stockObj.commonHelperService = this.commonHelperService;
			this.allStockStore[key] = stockObj;
		}

		return stockObj;
	}
}
