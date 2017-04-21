import { BaseEntity } from './base-entity';
import { CommonHelperService } from '../../../utils/helper/common-helper.service';
import { ReflectiveInjector } from '@angular/core';
import { userSettings } from '../../../app-config/user-settings';

export class StockEntity extends BaseEntity {

	private commonHelperService: CommonHelperService;

	private _instrumentType: number = userSettings.marketData.defaultDecimalPlaces;
	private _longDesc: string = userSettings.marketData.defaultStringInitializer;
	private _shortDesc: string = userSettings.marketData.defaultStringInitializer;
	private _dispCode: string = userSettings.marketData.defaultStringInitializer;
	private _currency: string = userSettings.marketData.defaultStringInitializer;
	private _decimalPlaces: number = userSettings.marketData.defaultDecimalPlaces;
	private _decimalCorrectionFactor: number = userSettings.marketData.defaultDecimalPlaces;
	private _lastTradePrice: string = userSettings.marketData.defaultStringInitializer;
	private _openPrice: string = userSettings.marketData.defaultStringInitializer;
	private _highPrice: string = userSettings.marketData.defaultStringInitializer;
	private _lowPrice: string = userSettings.marketData.defaultStringInitializer;
	private _closePrice: string = userSettings.marketData.defaultStringInitializer;
	private _bestAskPrice: string = userSettings.marketData.defaultStringInitializer;
	private _bestAskQty: string = userSettings.marketData.defaultStringInitializer;
	private _bestBidPrice: string = userSettings.marketData.defaultStringInitializer;
	private _bestBidQty: string = userSettings.marketData.defaultStringInitializer;
	private _totalBidQty: string = userSettings.marketData.defaultStringInitializer;
	private _totalAskQty: string = userSettings.marketData.defaultStringInitializer;
	private _change: string = userSettings.marketData.defaultStringInitializer;
	private _perChange: string = userSettings.marketData.defaultStringInitializer;
	private _previousClosePrice: string = userSettings.marketData.defaultStringInitializer;
	private _turnover: string = userSettings.marketData.defaultStringInitializer;
	private _volume: string = userSettings.marketData.defaultStringInitializer;
	private _trades: string = userSettings.marketData.defaultStringInitializer;
	private _totalQty: string = userSettings.marketData.defaultStringInitializer;
	private _lastTradeDate: number = userSettings.marketData.defaultNumberInitializer.minusOneInitializer;
	private _vwap: string = userSettings.marketData.defaultStringInitializer;
	private _min: string = userSettings.marketData.defaultStringInitializer;
	private _max: string = userSettings.marketData.defaultStringInitializer;
	private _high52: string = userSettings.marketData.defaultStringInitializer;
	private _low52: string = userSettings.marketData.defaultStringInitializer;
	private _bidOffer: string = userSettings.marketData.defaultStringInitializer;

	public get instrumentType(): number  {
		return this._instrumentType;
	}

	public set instrumentType(value: number) {
		this._instrumentType = value;
	}

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

	public get decimalPlaces(): number {
		return this._decimalPlaces;
	}

	public set decimalPlaces(value: number) {
		this._decimalPlaces = value;
	}

	public get decimalCorrectionFactor(): number  {
		return this._decimalCorrectionFactor;
	}

	public set decimalCorrectionFactor(value: number) {
		this._decimalCorrectionFactor = value;
	}

	public get lastTradePrice(): string  {
		return this._lastTradePrice;
	}

	public set lastTradePrice(value: string) {
		this._lastTradePrice = this.commonHelperService.formatNumber(parseFloat(value), this.decimalPlaces);
	}

	public get openPrice(): string  {
		return this._openPrice;
	}

	public set openPrice(value: string) {
		this._openPrice = this.commonHelperService.formatNumber(parseFloat(value), this.decimalPlaces);
	}

	public get highPrice(): string  {
		return this._highPrice;
	}

	public set highPrice(value: string) {
		this._highPrice = this.commonHelperService.formatNumber(parseFloat(value), this.decimalPlaces);
	}

	public get lowPrice(): string  {
		return this._lowPrice;
	}

	public set lowPrice(value: string) {
		this._lowPrice = this.commonHelperService.formatNumber(parseFloat(value), this.decimalPlaces);
	}

	public get closePrice(): string  {
		return this._closePrice;
	}

	public set closePrice(value: string) {
		this._closePrice = this.commonHelperService.formatNumber(parseFloat(value), this.decimalPlaces);
	}

	public get bestAskPrice(): string  {
		return this._bestAskPrice;
	}

	public set bestAskPrice(value: string) {
		this._bestAskPrice = this.commonHelperService.formatNumber(parseFloat(value), this.decimalPlaces);
	}

	public get bestAskQty(): string  {
		return this._bestAskQty;
	}

	public set bestAskQty(value: string) {
		this._bestAskQty = this.commonHelperService.formatNumber(parseFloat(value), 0);
	}

	public get bestBidPrice(): string  {
		return this._bestBidPrice;
	}

	public set bestBidPrice(value: string) {
		this._bestBidPrice = this.commonHelperService.formatNumber(parseFloat(value), this.decimalPlaces);
	}

	public get bestBidQty(): string  {
		return this._bestBidQty;
	}

	public set bestBidQty(value: string) {
		this._bestBidQty = this.commonHelperService.formatNumber(parseFloat(value), 0);
	}

	public get totalBidQty(): string  {
		return this._totalBidQty;
	}

	public set totalBidQty(value: string) {
		this._totalBidQty = this.commonHelperService.formatNumber(parseFloat(value), 0);

		if (this.totalAskQty !== userSettings.marketData.defaultStringInitializer) {
			const val = parseFloat(value) / parseFloat(this.totalAskQty.replace(',', ''));
			this._bidOffer =
				this.commonHelperService.formatNumber(val, this.decimalPlaces);
		}
	}

	public get totalAskQty(): string  {
		return this._totalAskQty;
	}

	public set totalAskQty(value: string) {
		this._totalAskQty = this.commonHelperService.formatNumber(parseFloat(value), 0);

		if (this.totalBidQty !== userSettings.marketData.defaultStringInitializer) {
			const val = parseFloat(this.totalBidQty.replace(',', '')) / parseFloat(value);
			this._bidOffer =
				this.commonHelperService.formatNumber(val, this.decimalPlaces);
		}
	}

	public get change(): string {
		return this._change;
	}

	public set change(value: string) {
		this._change = this.commonHelperService.formatNumber(parseFloat(value), this.decimalPlaces);
	}

	public get perChange(): string {
		return this._perChange;
	}

	public set perChange(value: string) {
		this._perChange = this.commonHelperService.formatNumber(
			parseFloat(value), userSettings.marketData.defaultPercentageDecimalPlaces);
	}

	public get previousClosePrice(): string {
		return this._previousClosePrice;
	}

	public set previousClosePrice(value: string) {
		this._previousClosePrice = this.commonHelperService.formatNumber(parseFloat(value), this.decimalPlaces);
	}

	public get turnover(): string {
		return this._turnover;
	}

	public set turnover(value: string) {
		this._turnover = this.commonHelperService.formatNumber(parseFloat(value), 0);
	}

	public get volume(): string {
		return this._volume;
	}

	public set volume(value: string) {
		this._volume = this.commonHelperService.formatNumber(parseFloat(value), 0);
	}

	public get trades(): string {
		return this._trades;
	}

	public set trades(value: string) {
		this._trades = this.commonHelperService.formatNumber(parseFloat(value), 0);
	}

	public get totalQty(): string {
		return this._totalQty;
	}

	public set totalQty(value: string) {
		this._totalQty = this.commonHelperService.formatNumber(parseFloat(value), 0);
	}

	public get lastTradeDate(): number {
		return this._lastTradeDate;
	}

	public set lastTradeDate(value: number) {
		this._lastTradeDate = value;
	}

	public get vwap(): string {
		return this._vwap;
	}

	public set vwap(value: string) {
		this._vwap = this.commonHelperService.formatNumber(parseFloat(value), this.decimalPlaces);
	}

	public get min(): string {
		return this._min;
	}

	public set min(value: string) {
		this._min = this.commonHelperService.formatNumber(parseFloat(value), this.decimalPlaces);
	}

	public get max(): string {
		return this._max;
	}

	public set max(value: string) {
		this._max = this.commonHelperService.formatNumber(parseFloat(value), this.decimalPlaces);
	}

	public get high52(): string {
		return this._high52;
	}

	public set high52(value: string) {
		this._high52 = this.commonHelperService.formatNumber(parseFloat(value), this.decimalPlaces);
	}

	public get low52(): string {
		return this._low52;
	}

	public set low52(value: string) {
		this._low52 = this.commonHelperService.formatNumber(parseFloat(value), this.decimalPlaces);
	}

	public get bidOffer(): string {
		return this._bidOffer;
	}

	constructor(values: Object = {}) {
		super();

		const injector = ReflectiveInjector.resolveAndCreate([CommonHelperService]);
		this.commonHelperService = injector.get(CommonHelperService);

		this.setValues(values);
	}
}
