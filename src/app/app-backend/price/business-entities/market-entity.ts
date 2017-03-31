import { BaseEntity } from './base-entity';

export class MarketEntity extends BaseEntity {

	private _exchangeCode: string;
	private _marketCode: string;
	private _volume: number;
	private _turnover: number;

	public get exchangeCode(): string  {
		return this._exchangeCode;
	}

	public set exchangeCode(value: string) {
		this._exchangeCode = value;
	}

	public get marketCode(): string  {
		return this._marketCode;
	}

	public set marketCode(value: string) {
		this._marketCode = value;
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
