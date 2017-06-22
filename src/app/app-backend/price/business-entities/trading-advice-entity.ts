import { BaseEntity } from './base-entity';
import { CommonHelperService } from '../../../app-utils/helper/common-helper.service';
import { ReflectiveInjector } from '@angular/core';
import { userSettings } from '../../../app-config/user-settings';

export class TradingAdviceEntity extends BaseEntity {

	private commonHelperService: CommonHelperService;

	private _title: string =  userSettings.marketData.defaultStringInitializer;
	private _rawDate: number = userSettings.marketData.defaultNumberInitializer.minusOneInitializer;
	private _date: string = userSettings.marketData.defaultStringInitializer;
	private _rawStartDate: string = userSettings.marketData.defaultStringInitializer;
	private _startDate: string = userSettings.marketData.defaultStringInitializer;
	private _rawEndDate: string = userSettings.marketData.defaultStringInitializer;
	private _endDate: string = userSettings.marketData.defaultStringInitializer;
	private _isTradable: boolean = userSettings.marketData.defaultBooleanInitializer;
	private _unrealizedReturn: string = userSettings.marketData.defaultStringInitializer;
	private _remainingPotential: string = userSettings.marketData.defaultStringInitializer;
	private _entryPrice: string = userSettings.marketData.defaultStringInitializer;
	private _stopLoss: string = userSettings.marketData.defaultStringInitializer;
	private _takeProfit: string = userSettings.marketData.defaultStringInitializer;
	private _exitPrice: string = userSettings.marketData.defaultStringInitializer;
	private _indexPercentageChange: string = userSettings.marketData.defaultStringInitializer;
	private _realizedProfit: string = userSettings.marketData.defaultStringInitializer;
	private _report: string = userSettings.marketData.defaultStringInitializer;
	private _imageURL: string = userSettings.marketData.defaultStringInitializer;
	private _action: string = userSettings.marketData.defaultStringInitializer;
	private _gicsL4: string = userSettings.marketData.defaultStringInitializer;
	private _companyId: string = userSettings.marketData.defaultStringInitializer;
	private _decimalPlaces: number;

	public get title(): string  {
		return this._title;
	}

	public set title(value: string) {
		this._title = value;
	}

	public get rawDate(): number  {
		return this._rawDate;
	}

	public set rawDate(value: number) {
		this._rawDate = value;
	}

	public get date(): string {
		return this._date;
	}

	public set date(value: string) {
		this._rawDate = parseFloat(value);
		this._date = '';
	}

	public get startDate(): string  {
		return this._startDate;
	}

	public set startDate(value: string) {
		this._rawStartDate = value;
	}

	public get rawStartDate(): string  {
		return this._rawStartDate;
	}

	public set rawStartDate(value: string) {
		this._rawStartDate = value;
	}

	public get rawEndDate(): string  {
		return this._rawEndDate;
	}

	public set rawEndDate(value: string) {
		this._rawEndDate = value;
	}

	public get endDate(): string  {
		return this._endDate;
	}

	public set endDate(value: string) {
		this._rawEndDate = value;
	}

	public get isTradable(): boolean  {
		return this._isTradable;
	}

	public set isTradable(value: boolean) {
		this._isTradable = value;
	}

	public get unrealizedReturn(): string  {
		return this._unrealizedReturn;
	}

	public set unrealizedReturn(value: string) {
		this._unrealizedReturn = this.commonHelperService.formatNumber(parseFloat(value), this._decimalPlaces);
	}

	public get remainingPotential(): string  {
		return this._remainingPotential;
	}

	public set remainingPotential(value: string) {
		this._remainingPotential = this.commonHelperService.formatNumber(parseFloat(value), this._decimalPlaces);
	}

	public get entryPrice(): string  {
		return this._entryPrice;
	}

	public set entryPrice(value: string) {

		this._entryPrice = this.commonHelperService.formatNumber(parseFloat(value), this._decimalPlaces);
	}

	public get stopLoss(): string  {
		return this._stopLoss;
	}

	public set stopLoss(value: string) {
		this._stopLoss = this.commonHelperService.formatNumber(parseFloat(value), this._decimalPlaces);
	}

	public get takeProfit(): string  {
		return this._takeProfit;
	}

	public set takeProfit(value: string) {
		this._takeProfit = this.commonHelperService.formatNumber(parseFloat(value), this._decimalPlaces);
	}

	public get exitPrice(): string  {
		return this._exitPrice;
	}

	public set exitPrice(value: string) {
		this._exitPrice = this.commonHelperService.formatNumber(parseFloat(value), this._decimalPlaces);
	}

	public get indexPercentageChange(): string  {
		return this._indexPercentageChange;
	}

	public set indexPercentageChange(value: string) {
		this._indexPercentageChange = this.commonHelperService.formatNumber(parseFloat(value), this._decimalPlaces);
	}

	public get realizedProfit(): string  {
		return this._realizedProfit;
	}

	public set realizedProfit(value: string) {
		this._realizedProfit = this.commonHelperService.formatNumber(parseFloat(value), this._decimalPlaces);
	}

	public get report(): string  {
		return this._report;
	}

	public set report(value: string) {
		this._report = value;
	}

	public get imageURL(): string  {
		return this._imageURL;
	}

	public set imageURL(value: string) {
		this._imageURL = value;
	}

	public get action(): string  {
		return this._action;
	}

	public set action(value: string) {
		this._action = value;
	}

	public get gicsL4(): string  {
		return this._gicsL4;
	}

	public set gicsL4(value: string) {
		this._gicsL4 = value;
	}

	public get companyId(): string  {
		return this._companyId;
	}

	public set companyId(value: string) {
		this._companyId = value;
	}

	public set decimalPlaces(value: number) {
		this._decimalPlaces = value;
	}

	constructor(values: Object = {}) {
		super();
		const injector = ReflectiveInjector.resolveAndCreate([CommonHelperService]);
		this.commonHelperService = injector.get(CommonHelperService);
		this.setValues(values);
	}
}
