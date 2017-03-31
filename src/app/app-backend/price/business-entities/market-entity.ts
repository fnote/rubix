import { BaseEntity } from './base-entity';

export class MarketEntity extends BaseEntity {

	private _exchangeCode = '';
	private _code = '';
	private _volume = -1;
	private _turnover = -1;

	public get exchangeCode(): string  {
		return this._exchangeCode;
	}

	public set exchangeCode(value: string) {
		this._exchangeCode = value;
	}

	public get code(): string  {
		return this._code;
	}

	public set code(value: string) {
		this._code = value;
	}

	public get volume(): number  {
		return this._volume;
	}

	public set volume(value: number) {
		this._volume = value;
	}

	public get turnover(): number  {
		return this._turnover;
	}

	public set turnover(value: number) {
		this._turnover = value;
	}

	constructor(values: Object = {}) {
		super();
		this.setValues(values);
	}
}
