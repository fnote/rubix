import { BaseEntity } from './base-entity';
import { MarketStatus } from '../../../constants/enums/market-status.enum';

export class ExchangeEntity extends BaseEntity {

	private _code = '';
	private _longDesc = '';
	private _shortDesc = '';
	private _dispExgCode = '';
	private _decimalCorrFactor = 1;
	private _decimalPlaces = 2;
	private _currency = '';
	private _countryCode = '';
	private _timeZoneOffset = 0;
	private _marketStatus = MarketStatus.Close;
	private _dateTimeUTC = 0;
	private _dateDisplay = '1970-01-01';
	private _timeDisplay = '00:00';
	private _ups = -1;
	private _downs = -1;
	private _noChange = -1;
	private _volume = -1;
	private _turnover = -1;
	private _trades = -1;
	private _symbolsTraded = -1;

	public get code(): string  {
		return this._code;
	}

	public set code(value: string) {
		this._code = value;
	}

	public get longDesc(): string {
		return this._longDesc;
	}

	public set longDesc(value: string) {
		this._longDesc = value;
	}

	public get shortDesc(): string {
		return this._shortDesc;
	}

	public set shortDesc(value: string) {
		this._shortDesc = value;
	}

	public get dispExgCode(): string {
		return this._dispExgCode;
	}

	public set dispExgCode(value: string) {
		this._dispExgCode = value;
	}

	public get decimalCorrFactor(): number {
		return this._decimalCorrFactor;
	}

	public set decimalCorrFactor(value: number) {
		this._decimalCorrFactor = value;
	}

	public get decimalPlaces(): number {
		return this._decimalPlaces;
	}

	public set decimalPlaces(value: number) {
		this._decimalPlaces = value;
	}

	public get currency(): string {
		return this._currency;
	}

	public set currency(value: string) {
		this._currency = value;
	}

	public get countryCode(): string {
		return this._countryCode;
	}

	public set countryCode(value: string) {
		this._countryCode = value;
	}

	public get timeZoneOffset(): number {
		return this._timeZoneOffset;
	}

	public set timeZoneOffset(value: number) {
		this._timeZoneOffset = value;
	}

	public get marketStatus(): number {
		return this._marketStatus;
	}

	public set marketStatus(value: number) {
		this._marketStatus = value;
	}

	public get dateTimeUTC(): number {
		return this._dateTimeUTC;
	}

	public set dateTimeUTC(value: number) {
		this._dateTimeUTC = value;

		// _dateDisplay
		// _dateTime
	}

	public get dateDisplay(): string {
		return this._dateDisplay;
	}

	public get timeDisplay(): string {
		return this._timeDisplay;
	}

	public get ups(): number {
		return this._ups;
	}

	public set ups(value: number) {
		this._ups = value;
	}

	public get downs(): number {
		return this._downs;
	}

	public set downs(value: number) {
		this._downs = value;
	}

	public get noChange(): number {
		return this._noChange;
	}

	public set noChange(value: number) {
		this._noChange = value;
	}

	public get volume(): number {
		return this._volume;
	}

	public set volume(value: number) {
		this._volume = value;
	}

	public get turnover(): number {
		return this._turnover;
	}

	public set turnover(value: number) {
		this._turnover = value;
	}

	public get trades(): number {
		return this._trades;
	}

	public set trades(value: number) {
		this._trades = value;
	}

	public get symbolsTraded(): number {
		return this._symbolsTraded;
	}

	public set symbolsTraded(value: number) {
		this._symbolsTraded = value;
	}

	constructor(values: Object = {}) {
		super();
		this.setValues(values);
	}
}
