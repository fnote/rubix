import { Stock } from '../business-entities/stock';

export class StockDataStore {
	private allStockStore = {};
	public instance : StockDataStore = null;

    // TODO: [Amila] implement the below when needed
    // private allStockStoreByExhcange = {};
    // private allIndexStoreByExhcange = {};
	
	constructor() {
		this.allStockStore = {};
        // this.allStockStoreByExhcange = {};
        // this.allIndexStoreByExhcange = {};
	}

	public getInstance () {
		if (this.instance) {
			this.instance = new StockDataStore();
		}

		return this.instance;
	}

	private getOrAddStock(exchangeCode, stockCode) {
        // TODO: [Amila] implement a common "keyGenerator" in utils package
		const key : string = exchangeCode + '~' + stockCode; // utils.keyGenerator.getKey(exchange, stockCode);
		let stockObj = this.allStockStore[key];

		if (!stockObj) {
			stockObj = new Stock({
				code: stockCode,
				exchangeCode: exchangeCode,
			});

			this.allStockStore[key] = stockObj;
		}

		return stockObj;
	}
}
