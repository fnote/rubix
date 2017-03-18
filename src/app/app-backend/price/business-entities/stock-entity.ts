import { BaseEntity } from './base-entity';

export class StockEntity extends BaseEntity {

	private _code = '';
	private _exchangeCode = '';
	private _longDesc = '';
	private _shortDesc = '';
	private _dispCode = '';
	private _lastTradePrice = -1;
	private _openPrice = -1;
	private _highPrice = -1;
	private _lowPrice = -1;
	private _closePrice = -1;

	public get code() : string  {
		return this._code;
	}

	public set code(value : string ) {
		this._code = value;
	}

	public get exchangeCode() : string  {
		return this._exchangeCode;
	}

	public set exchangeCode(value : string ) {
		this._exchangeCode = value;
	}

	public get longDesc() : string  {
		return this._longDesc;
	}

	public set longDesc(value : string ) {
		this._longDesc = value;
	}

	public get shortDesc() : string  {
		return this._shortDesc;
	}

	public set shortDesc(value : string ) {
		this._shortDesc = value;
	}

	public get dispCode() : string  {
		return this._dispCode;
	}

	public set dispCode(value : string ) {
		this._dispCode = value;
	}

	public get lastTradePrice() : number  {
		return this._lastTradePrice;
	}

	public set lastTradePrice(value : number ) {
		this._lastTradePrice = value;
	}

	public get openPrice() : number  {
		return this._openPrice;
	}

	public set openPrice(value : number ) {
		this._openPrice = value;
	}

	public get highPrice() : number  {
		return this._highPrice;
	}

	public set highPrice(value : number ) {
		this._highPrice = value;
	}

	public get lowPrice() : number  {
		return this._lowPrice;
	}

	public set lowPrice(value : number ) {
		this._lowPrice = value;
	}

	public get closePrice() : number  {
		return this._closePrice;
	}

	public set closePrice(value : number ) {
		this._closePrice = value;
	}

	constructor(values : Object = {}) {
		super();
		Object.assign(this, values);
	}
}
