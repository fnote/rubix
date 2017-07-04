import { BaseEntity } from './base-entity';
import { CommonHelperService } from '../../../app-utils/helper/common-helper.service';
import { userSettings } from '../../../app-config/user-settings';

export class MutualFundEntity extends BaseEntity {

	private _commonHelperService: CommonHelperService;

	private _chartDataMap = {};
	private _assetData = {};
	private _reportData = {};
	private _benchmarkData =  {};

	private _region: string = userSettings.marketData.defaultStringInitializer;
	private _riskType: string = userSettings.marketData.defaultStringInitializer;
	private _description: string = userSettings.marketData.defaultStringInitializer;
	private _fullDescription: string = userSettings.marketData.defaultStringInitializer;
	private _shortDescription: string = userSettings.marketData.defaultStringInitializer;
	private _currency: string = userSettings.marketData.defaultStringInitializer;
	private _benchMark: string =  userSettings.marketData.defaultStringInitializer;
	private _percentageOneMonth: string =  userSettings.marketData.defaultStringInitializer;
	private _percentageThreeMonth: string =  userSettings.marketData.defaultStringInitializer;
	private _decimalPlaces: number =  userSettings.marketData.defaultNumberInitializer.zeroInitializer;
	private _regionDescription: string = userSettings.marketData.defaultStringInitializer;
	private _riskTypeDescription: string = userSettings.marketData.defaultStringInitializer;
	private _expenseRatio: number = userSettings.marketData.defaultNumberInitializer.minusOneInitializer;
	private _averageMarketCap: number = userSettings.marketData.defaultNumberInitializer.minusOneInitializer;
	private _profitEarnings: number = userSettings.marketData.defaultNumberInitializer.minusOneInitializer;
	private _return: number = userSettings.marketData.defaultNumberInitializer.minusOneInitializer;
	private _informationRatio: number = userSettings.marketData.defaultNumberInitializer.minusOneInitializer;
	private _excessReturn: number = userSettings.marketData.defaultNumberInitializer.minusOneInitializer;
	private _trackingError: number = userSettings.marketData.defaultNumberInitializer.minusOneInitializer;
	private _sharpeRatio: number = userSettings.marketData.defaultNumberInitializer.minusOneInitializer;
	private _stock: number = userSettings.marketData.defaultNumberInitializer.zeroInitializer;
	private _bond: number = userSettings.marketData.defaultNumberInitializer.zeroInitializer;
	private _cash: number = userSettings.marketData.defaultNumberInitializer.zeroInitializer;
	private _other: number = userSettings.marketData.defaultNumberInitializer.zeroInitializer;

	constructor(values: Object = {}) {
		super();
		this.setValues(values);
	}

	public set commonHelperService(value: CommonHelperService) {
		this._commonHelperService = value;
	}

	public get chartDataMap(): any {
		return this._chartDataMap;
	}

	public get region(): string {
		return this._region;
	}

	public set region(value: string) {
		this._region = value;
	}

	public get riskType(): string {
		return this._riskType;
	}

	public set riskType(value: string) {
		this._riskType = value;
	}

	public get description(): string {
		return this._description;
	}

	public set description(value: string) {
		this._description = value;
	}

	public get fullDescription(): string {
		return this._fullDescription;
	}

	public set fullDescription(value: string) {
		this._fullDescription = value;
	}

	public get shortDescription(): string {
		return this._shortDescription;
	}

	public set shortDescription(value: string) {
		this._shortDescription = value;
	}

	public get currency(): string {
		return this._currency;
	}

	public set currency(value: string) {
		this._currency = value;
	}

	public get benchMark(): string {
		return this._benchMark;
	}

	public set benchMark(value: string) {
		this._benchMark = value;
	}

	public get percentageOneMonth(): string {
		return this._percentageOneMonth;
	}

	public set percentageOneMonth(value: string) {
		this._percentageOneMonth = this._commonHelperService.formatNumber(parseFloat(value), this.decimalPlaces);
	}

	public get percentageThreeMonth(): string {
		return this._percentageThreeMonth;
	}

	public set percentageThreeMonth(value: string) {
		this._percentageThreeMonth = this._commonHelperService.formatNumber(parseFloat(value), this.decimalPlaces);
	}

	public get decimalPlaces(): number {
		return this._decimalPlaces;
	}

	public set decimalPlaces(value: number) {
		this._decimalPlaces = value;
	}

	public get regionDescription(): string {
		return this._regionDescription;
	}

	public set regionDescription(value: string) {
		this._regionDescription = value;
	}

	public get riskTypeDescription(): string {
		return this._riskTypeDescription;
	}

	public set riskTypeDescription(value: string) {
		this._riskTypeDescription = value;
	}

	public addchartData(duration: string, value: number): void {
		this._chartDataMap[duration] = value;
	}

	public get assetData(): {} {
		return this._assetData;
	}

	public set assetData(value: {}) {
		this._assetData = value;
	}
	public get sharpeRatio(): number {
		return this._sharpeRatio;
	}

	public set sharpeRatio(value: number) {
		this._sharpeRatio = value;
	}
	public get trackingError(): number {
		return this._trackingError;
	}

	public set trackingError(value: number) {
		this._trackingError = value;
	}
	public get excessReturn(): number {
		return this._excessReturn;
	}

	public set excessReturn(value: number) {
		this._excessReturn = value;
	}
	public get informationRatio(): number {
		return this._informationRatio;
	}

	public set informationRatio(value: number) {
		this._informationRatio = value;
	}
	public get return(): number {
		return this._return;
	}

	public set return(value: number) {
		this._return = value;
	}
	public get profitEarnings(): number {
		return this._profitEarnings;
	}

	public set profitEarnings(value: number) {
		this._profitEarnings = value;
	}
	public get averageMarketCap(): number {
		return this._averageMarketCap;
	}

	public set averageMarketCap(value: number) {
		this._averageMarketCap = value;
	}
	public get expenseRatio(): number {
		return this._expenseRatio;
	}

	public set expenseRatio(value: number) {
		this._expenseRatio = value;
	}

	public get reportData(): {} {
		return this._reportData;
	}

	public set reportData(value: {}) {
		this._reportData = value;
	}

	public get other(): number {
		return this._other;
	}

	public set other(value: number) {
		this._other = value;
	}
	public get cash(): number {
		return this._cash;
	}

	public set cash(value: number) {
		this._cash = value;
	}
	public get bond(): number {
		return this._bond;
	}

	public set bond(value: number) {
		this._bond = value;
	}
	public get stock(): number {
		return this._stock;
	}

	public set stock(value: number) {
		this._stock = value;
	}

	public get benchmarkData(): {} {
		return this._benchmarkData;
	}

	public set benchmarkData(value: {}) {
		this._benchmarkData = value;
	}

}
