import { BaseEntity } from './base-entity';

export class MarketEntity extends BaseEntity {

	// Meta
	exchangeCode : string;
	code : string;

	// Realtime
	volume : number;
	turnover : number;

	constructor(values : Object = {}) {
		super();
		Object.assign(this, values);
	}
}
