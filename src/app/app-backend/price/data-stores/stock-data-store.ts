import { BaseDataStore } from './base-data-store';
import { StockEntity } from '../business-entities/stock-entity';

export class StockDataStore extends BaseDataStore {

	private static _instance : StockDataStore = new StockDataStore();
	private allStockStore = {};

    // TODO: [Amila] implement the below when needed
    // private allStockStoreByExhcange = {};
    // private allIndexStoreByExhcange = {};

	public static getInstance() : StockDataStore {
		return StockDataStore._instance;
	}

	constructor() {
		super();
		if (StockDataStore._instance) {
			throw new Error('Error: Instantiation failed: Use SingletonClass.getInstance() instead of new.');
		}

		StockDataStore._instance = this;
	}

	private getOrAddStock(exchangeCode, stockCode) {
        // TODO: [Amila] implement a common "keyGenerator" in utils package
		const key : string = exchangeCode + '~' + stockCode; // utils.keyGenerator.getKey(exchange, stockCode);
		let stockObj = this.allStockStore[key];

		if (!stockObj) {
			stockObj = new StockEntity({
				code: stockCode,
				exchangeCode: exchangeCode,
			});

			this.allStockStore[key] = stockObj;
		}

		return stockObj;
	}
}
