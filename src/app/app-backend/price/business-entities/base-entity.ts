export class BaseEntity {

	private _symbolCode: string;
	private _exchangeCode: string;
	private _isMetaDataLoaded = false;

	public get symbolCode(): string  {
		return this._symbolCode;
	}

	public set symbolCode(value: string) {
		this._symbolCode = value;
	}

	public get exchangeCode(): string  {
		return this._exchangeCode;
	}

	public set exchangeCode(value: string) {
		this._exchangeCode = value;
	}

	public get isMetaDataLoaded(): boolean  {
		return this._isMetaDataLoaded;
	}

	public set isMetaDataLoaded(value: boolean) {
		this._isMetaDataLoaded = value;
	}

	public setValues(values: Object = {}): void {
		Object.assign(this, values);
	}
}
