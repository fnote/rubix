import { BaseEntity } from './base-entity';

export class MarketEntity extends BaseEntity {

	private _exchangeCode : string = null;
	private _code : string = null;
	private _volume : number = null;
	private _turnover : number = null;

	public get exchangeCode() : string  {
		return this._exchangeCode;
	}

	public set exchangeCode(value : string ) {
		this._exchangeCode = value;
	}

	public get code() : string  {
		return this._code;
	}

	public set code(value : string ) {
		this._code = value;
	}

	public get volume() : number  {
		return this._volume;
	}

	public set volume(value : number ) {
		this._volume = value;
	}

	public get turnover() : number  {
		return this._turnover;
	}

	public set turnover(value : number ) {
		this._turnover = value;
	}

	constructor(values : Object = {}) {
		super();
		Object.assign(this, values);
	}
}
