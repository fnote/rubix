import { BaseDataStore } from './base-data-store';
import { ExchangeEntity } from '../business-entities/exchange-entity';

export class ExchangeDataStore extends BaseDataStore {

	private static _instance: ExchangeDataStore = new ExchangeDataStore();
	private allExchangeStore = {};

	public static getInstance(): ExchangeDataStore {
		return ExchangeDataStore._instance;
	}

	constructor() {
		super();
		if (ExchangeDataStore._instance) {
			throw new Error('Error: Instantiation failed: Use SingletonClass.getInstance() instead of new.');
		}

		ExchangeDataStore._instance = this;
	}

	private getOrAddExchange(exchangeCode: string): ExchangeEntity {
		let exgObj: ExchangeEntity = this.allExchangeStore[exchangeCode];

		if (!exgObj) {
			exgObj = new ExchangeEntity({
				exchangeCode: exchangeCode,
			});

			this.allExchangeStore[exchangeCode] = exgObj;
		}

		return exgObj;
	}
}
