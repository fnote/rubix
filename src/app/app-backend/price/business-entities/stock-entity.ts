import { BaseEntity } from './base-entity';

export class StockEntity extends BaseEntity {

	private _longDesc: string;
	private _shortDesc: string;
	private _dispCode: string;
	private _currency: string;
	private _lastTradePrice: number;
	private _openPrice: number;
	private _highPrice: number;
	private _lowPrice: number;
	private _closePrice: number;
	private _bestAskPrice: number;
	private _bestAskQty: number;
	private _bestBidPrice: number;
	private _bestBidQty: number;
	private _totalBidQty: number;
	private _totalAskQty: number;
	private _change: number;
	private _perChange: number;
	private _previousClosePrice: number;
	private _turnover: number;
	private _volume: number;
	private _totalTrades: number;
	private _totalQty: number;
	private _lastTradeDate: number;
	private _vwap: number;
	private _min: number;
	private _max: number;
	private _high52: number;
	private _low52: number;
 	// TRT : U ???
 	// NOT : 147 ???
	// LTDP : 10.55 ???
	// OPERATOR : 5288

	public get longDesc(): string  {
		return this._longDesc;
	}

	public set longDesc(value: string) {
		this._longDesc = value;
	}

	public get shortDesc(): string  {
		return this._shortDesc;
	}

	public set shortDesc(value: string) {
		this._shortDesc = value;
	}

	public get currency(): string  {
		return this._currency;
	}

	public set currency(value: string) {
		this._currency = value;
	}

	public get dispCode(): string  {
		return this._dispCode;
	}

	public set dispCode(value: string) {
		this._dispCode = value;
	}

	public get lastTradePrice(): number  {
		return this._lastTradePrice;
	}

	public set lastTradePrice(value: number) {
		this._lastTradePrice = value;
	}

	public get openPrice(): number  {
		return this._openPrice;
	}

	public set openPrice(value: number) {
		this._openPrice = value;
	}

	public get highPrice(): number  {
		return this._highPrice;
	}

	public set highPrice(value: number) {
		this._highPrice = value;
	}

	public get lowPrice(): number  {
		return this._lowPrice;
	}

	public set lowPrice(value: number) {
		this._lowPrice = value;
	}

	public get closePrice(): number  {
		return this._closePrice;
	}

	public set closePrice(value: number) {
		this._closePrice = value;
	}

	public get bestAskPrice(): number  {
		return this._bestAskPrice;
	}

	public set bestAskPrice(value: number) {
		this._bestAskPrice = value;
	}

	public get bestAskQty(): number  {
		return this._bestAskQty;
	}

	public set bestAskQty(value: number) {
		this._bestAskQty = value;
	}

	public get bestBidPrice(): number  {
		return this._bestBidPrice;
	}

	public set bestBidPrice(value: number) {
		this._bestBidPrice = value;
	}

	public get bestBidQty(): number  {
		return this._bestBidQty;
	}

	public set bestBidQty(value: number) {
		this._bestBidQty = value;
	}

	public get totalBidQty(): number  {
		return this._totalBidQty;
	}

	public set totalBidQty(value: number) {
		this._totalBidQty = value;
	}

	public get totalAskQty(): number  {
		return this._totalAskQty;
	}

	public set totalAskQty(value: number) {
		this._totalAskQty = value;
	}

	public get change(): number {
		return this._change;
	}

	public set change(value: number) {
		this._change = value;
	}

	public get perChange(): number {
		return this._perChange;
	}

	public set perChange(value: number) {
		this._perChange = value;
	}

	public get previousClosePrice(): number {
		return this._previousClosePrice;
	}

	public set previousClosePrice(value: number) {
		this._previousClosePrice = value;
	}

	public get turnover(): number {
		return this._turnover;
	}

	public set turnover(value: number) {
		this._turnover = value;
	}

	public get volume(): number {
		return this._volume;
	}

	public set volume(value: number) {
		this._volume = value;
	}

	public get totalTrades(): number {
		return this._totalTrades;
	}

	public set totalTrades(value: number) {
		this._totalTrades = value;
	}

	public get totalQty(): number {
		return this._totalQty;
	}

	public set totalQty(value: number) {
		this._totalQty = value;
	}

	public get lastTradeDate(): number {
		return this._lastTradeDate;
	}

	public set lastTradeDate(value: number) {
		this._lastTradeDate = value;
	}

	public get vwap(): number {
		return this._vwap;
	}

	public set vwap(value: number) {
		this._vwap = value;
	}

	public get min(): number {
		return this._min;
	}

	public set min(value: number) {
		this._min = value;
	}

	public get max(): number {
		return this._max;
	}

	public set max(value: number) {
		this._max = value;
	}

	public get high52(): number {
		return this._high52;
	}

	public set high52(value: number) {
		this._high52 = value;
	}

	public get low52(): number {
		return this._low52;
	}

	public set low52(value: number) {
		this._low52 = value;
	}

	constructor(values: Object = {}) {
		super();
		this.setValues(values);
	}
}
