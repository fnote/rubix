import { BaseEntity } from './base-entity';
import { CommonHelperService } from '../../../app-utils/helper/common-helper.service';
import { userSettings } from '../../../app-config/user-settings';

const DATE_START_INDEX = 6;
const DATE_END_INDEX = 8;
const MONTH_START_INDEX = 4;
const MONTH_END_INDEX = 6;

export class TrackRecordEntity extends BaseEntity {

	private _commonHelperService: CommonHelperService;

	private _bestSymbolRate: string =  userSettings.marketData.defaultStringInitializer;
	private _successRate: string = userSettings.marketData.defaultStringInitializer;
	private _averageReturn: string = userSettings.marketData.defaultStringInitializer;
	private _marketIndex: string = userSettings.marketData.defaultStringInitializer;
	private _displaySymbol: string = userSettings.marketData.defaultStringInitializer;
	private _rawStartDate: string = userSettings.marketData.defaultStringInitializer;
	private _rawEndDate: string = userSettings.marketData.defaultStringInitializer;
	private _startDate: string = userSettings.marketData.defaultStringInitializer;
	private _endDate: string = userSettings.marketData.defaultStringInitializer;

	public set commonHelperService(value: CommonHelperService) {
		this._commonHelperService = value;
	}

	public get bestSymbolRate(): string  {
		return this._bestSymbolRate;
	}

	public set bestSymbolRate(value: string) {
		this._bestSymbolRate  = this._commonHelperService.formatNumber(parseFloat(value), 2) + '%';
	}

	public get successRate(): string  {
		return this._successRate;
	}

	public set successRate(value: string) {
		this._successRate = value;
	}

	public get averageReturn(): string  {
		return this._averageReturn;
	}

	public set averageReturn(value: string) {
		this._averageReturn  = this._commonHelperService.formatNumber(parseFloat(value), 2) + '%';
	}

	public get marketIndex(): string  {
		return this._marketIndex;
	}

	public set marketIndex(value: string) {
		this._marketIndex  = this._commonHelperService.formatNumber(parseFloat(value), 2) + '%';
	}

	public get displaySymbol(): string  {
		return this._displaySymbol;
	}

	public set displaySymbol(value: string) {
		this._displaySymbol  = value;
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
	public get startDate(): string  {
		return this._startDate;
	}

	public set startDate(value: string) {
		this._rawStartDate = value;
		this._startDate =  value.substring(DATE_START_INDEX, DATE_END_INDEX) +
		'-' +
		this._commonHelperService.getMonthString(value.substring(MONTH_START_INDEX, MONTH_END_INDEX));
	}

	public get endDate(): string  {
		return this._endDate;
	}

	public set endDate(value: string) {
		this._rawEndDate = value;
		this._endDate =  value.substring(DATE_START_INDEX, DATE_END_INDEX) +
		'-' +
		this._commonHelperService.getMonthString(value.substring(MONTH_START_INDEX, MONTH_END_INDEX));
	}

	constructor(values: Object = {}) {
		super();
		this.setValues(values);
	}
}
