import { BaseEntity } from './base-entity';

export class StockEntity extends BaseEntity {

	// Meta
	code : string;
	exchangeCode : string;
	longDesc : string;
	shortDesc : string;
	dispCode : string;

	// Realtime
	lastTradePrice : number;
	openPrice : number;
	highPrice : number;
	lowPrice : number;
	closePrice : number;

	constructor(values : Object = {}) {
		super();
		Object.assign(this, values);
	}
}
