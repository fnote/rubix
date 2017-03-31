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

	public getOrAddStock(exgSym: [string, string]): any {
        // TODO: [Amila] implement a common "keyGenerator" in utils package
		const key: string = exgSym[0] + '~' + exgSym[1]; // utils.keyGenerator.getKey(exchange, stockCode);
		let stockObj = this.allStockStore[key];

		if (!stockObj) {
			stockObj = new StockEntity({
				exchangeCode: exgSym[0],
				symbolCode: exgSym[1],
			});

			this.allStockStore[key] = stockObj;
		}

		return stockObj;
	}
}
