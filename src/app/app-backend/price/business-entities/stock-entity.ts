import { BaseEntity } from './base-entity';

export class StockEntity extends BaseEntity {

	private _code : string = null;
	private _exchangeCode : string = null;
	private _longDesc : string = null;
	private _shortDesc : string = null;
	private _dispCode : string = null;
	private _lastTradePrice : number = null;
	private _openPrice : number = null;
	private _highPrice : number = null;
	private _lowPrice : number = null;
	private _closePrice : number = null;

	constructor(values : Object = {}) {
		super();
		Object.assign(this, values);
	}
}
