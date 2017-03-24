import { BaseDataStore } from './base-data-store';
import { StockEntity } from '../business-entities/stock-entity';

export class StockDataStore extends BaseDataStore {

	private static instance: StockDataStore;
	private allStockStore = {};

	public static getInstance(): StockDataStore {
		StockDataStore.instance = StockDataStore.instance || new StockDataStore();
		return StockDataStore.instance;
	}

	constructor() {
		super();
		if (StockDataStore.instance) {
			throw new Error('Error: Instantiation failed: Use SingletonClass.getInstance() instead of new.');
		}
	}

	private getOrAddStock(exchangeCode: string , stockCode: string): Object {
        // TODO: [Amila] implement a common "keyGenerator" in utils package
		const key: string = exchangeCode + '~' + stockCode; // utils.keyGenerator.getKey(exchange, stockCode);
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
