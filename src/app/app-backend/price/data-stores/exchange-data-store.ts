import { BaseDataStore } from './base-data-store';
import { ExchangeEntity } from '../business-entities/exchange-entity';
import { Injectable } from '@angular/core';

@Injectable()
export class ExchangeDataStore extends BaseDataStore {

	private allExchangeStore = {};

	public getOrAddExchange(exchangeCode: string): ExchangeEntity {
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
