import { BaseEntity } from './base-entity';
import { CommonHelperService } from '../../../app-utils/helper/common-helper.service';
import { ReflectiveInjector } from '@angular/core';
import { userSettings } from '../../../app-config/user-settings';

export class ChartDataEntity extends BaseEntity {

	private commonHelperService: CommonHelperService;
	private _rawHighPrice: number = userSettings.marketData.defaultNumberInitializer.zeroInitializer;
	private _highPrice: string = userSettings.marketData.defaultStringInitializer;
	private _rawLowPrice: number = userSettings.marketData.defaultNumberInitializer.zeroInitializer;
	private _lowPrice: string = userSettings.marketData.defaultStringInitializer;
	private _rawClosePrice: number = userSettings.marketData.defaultNumberInitializer.zeroInitializer;
	private _closePrice: string = userSettings.marketData.defaultStringInitializer;
	private _openPrice: string = userSettings.marketData.defaultStringInitializer;
	private _volume: string = userSettings.marketData.defaultStringInitializer;
	private _decimalPlaces: number;
	private _rawDate: number = userSettings.marketData.defaultNumberInitializer.minusOneInitializer;
	private _date: string = userSettings.marketData.defaultStringInitializer;
	private _rawLastTradedPrice: number = userSettings.marketData.defaultNumberInitializer.zeroInitializer;
	private _lastTradedPrice: string = userSettings.marketData.defaultStringInitializer;
	private _adjClosePrice: string = userSettings.marketData.defaultStringInitializer;
	private _isHistory = true;

	public get rawHighPrice(): number  {
		return this._rawHighPrice;
	}

	public set rawHighPrice(value: number) {
		this._rawHighPrice = value;
	}

	public get highPrice(): string  {
		return this._highPrice;
	}

	public set highPrice(value: string) {
		this.rawHighPrice = parseFloat(value);
		this._highPrice = this.commonHelperService.formatNumber(this.rawHighPrice, this._decimalPlaces);
	}

	public get rawLowPrice(): number  {
		return this._rawLowPrice;
	}

	public set rawLowPrice(value: number) {
		this._rawLowPrice = value;
	}

	public get lowPrice(): string  {
		return this._lowPrice;
	}

	public set lowPrice(value: string) {
		this.rawLowPrice = parseFloat(value);
		this._lowPrice = this.commonHelperService.formatNumber(this.rawLowPrice, this._decimalPlaces);
	}

	public get rawClosePrice(): number  {
		return this._rawClosePrice;
	}

	public set rawClosePrice(value: number) {
		this._rawClosePrice = value;
	}

	public get closePrice(): string  {
		return this._closePrice;
	}

	public set closePrice(value: string) {
		this.rawClosePrice = parseFloat(value);
		this._closePrice = this.commonHelperService.formatNumber(parseFloat(value), this._decimalPlaces);
		this._adjClosePrice = this.closePrice;
	}

	public get openPrice(): string  {
		return this._openPrice;
	}

	public set openPrice(value: string) {
		this._openPrice = this.commonHelperService.formatNumber(parseFloat(value), this._decimalPlaces);
	}

	public get volume(): string {
		return this._volume;
	}

	public set volume(value: string) {
		this._volume = this.commonHelperService.formatNumber(parseFloat(value), 0);
	}

	public set decimalPlaces(value: number) {
		this._decimalPlaces = value;
	}

	public get rawDate(): number  {
		return this._rawDate;
	}

	public set rawDate(value: number) {

		this._rawDate = value;
	}

	public get date(): string  {
		return this._date;
	}

	public set date(value: string) {
		this.rawDate = parseFloat(value);
		this._date = '';
	}

	public get rawLastTradedPrice(): number  {
		return this._rawLastTradedPrice;
	}

	public set rawLastTradedPrice(value: number) {
		this._rawLastTradedPrice = value;
	}

	public get lastTradedPrice(): string  {
		return this._lastTradedPrice;
	}

	public set lastTradedPrice(value: string) {
		this.rawLastTradedPrice = parseFloat(value);
		this._lastTradedPrice = this.commonHelperService.formatNumber(this.rawLastTradedPrice, this._decimalPlaces);
	}

	public get adjClosePrice(): string  {
		return this._adjClosePrice;
	}

	public get isHistory(): boolean  {
		return this._isHistory;
	}

	public set isHistory(value: boolean) {
		this._isHistory = value;
	}

	constructor(values: Object = {}) {
		super();

		const injector = ReflectiveInjector.resolveAndCreate([CommonHelperService]);
		this.commonHelperService = injector.get(CommonHelperService);

		this.setValues(values);
	}
}
