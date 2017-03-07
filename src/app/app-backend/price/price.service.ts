import { Injectable } from '@angular/core';
import { DataManagers } from '../../utils/enums/data-managers.enum';
import { BaseDataStore } from './data-stores/base-data-store';
import { StockDataStore } from './data-stores/stock-data-store';

@Injectable()
export class PriceService {

	constructor() { }

    // Expose data managers
	public getDataManager (dmID : number) {
		let dtStore : BaseDataStore = null;

		switch (dmID) {
			case DataManagers.Stock:
				dtStore = StockDataStore.getInstance();
				break;
			case DataManagers.Exchange:
				dtStore = StockDataStore.getInstance();
				break;
		}

		return dtStore;
	}
}
