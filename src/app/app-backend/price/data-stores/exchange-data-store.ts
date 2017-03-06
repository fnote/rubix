import { Exchange } from '../business-entities/exchange';

export class ExchangeDataStore {
	private allExchangeStore = {};
    
	constructor() {
		this.allExchangeStore = {};
	}

	public getOrAddExchange(exchangeCode) {
		let exgObj = this.allExchangeStore[exchangeCode];

		if (!exgObj) {
			exgObj = new Exchange({
				code: exchangeCode
			});

			this.allExchangeStore[exchangeCode] = exgObj;
		}

		return exgObj;
	}
}
