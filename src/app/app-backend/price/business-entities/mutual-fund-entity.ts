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
	private _expenseRatio: string =  userSettings.marketData.defaultStringInitializer;
	private _averageMarketCap: string =  userSettings.marketData.defaultStringInitializer;
	private _profitEarnings: string =  userSettings.marketData.defaultStringInitializer;
	private _return: string =  userSettings.marketData.defaultStringInitializer;
	private _informationRatio: string =  userSettings.marketData.defaultStringInitializer;
	private _excessReturn: string =  userSettings.marketData.defaultStringInitializer;
	private _trackingError: string =  userSettings.marketData.defaultStringInitializer;
	private _sharpeRatio: string =  userSettings.marketData.defaultStringInitializer;
	private _stock: number = userSettings.marketData.defaultNumberInitializer.zeroInitializer;
	private _bond: number = userSettings.marketData.defaultNumberInitializer.zeroInitializer;
	private _cash: number = userSettings.marketData.defaultNumberInitializer.zeroInitializer;
	private _other: number = userSettings.marketData.defaultNumberInitializer.zeroInitializer;
	private _stdDeviation: string =  userSettings.marketData.defaultStringInitializer;
	private _r2: string =  userSettings.marketData.defaultStringInitializer;

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
		this._benchMark = this._commonHelperService.getDisplaySymbolCode(value);
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

	public get sharpeRatio(): string {
		return this._sharpeRatio;
	}

	public set sharpeRatio(value: string) {
		this._sharpeRatio = this._commonHelperService.formatNumber(parseFloat(value), this.decimalPlaces);
	}

	public get trackingError(): string {
		return this._trackingError;
	}

	public set trackingError(value: string) {
		this._trackingError = this._commonHelperService.formatNumber(parseFloat(value), this.decimalPlaces);
	}

	public get excessReturn(): string {
		return this._excessReturn;
	}

	public set excessReturn(value: string) {
		this._excessReturn = this._commonHelperService.formatNumber(parseFloat(value), this.decimalPlaces);
	}

	public get informationRatio(): string {
		return this._informationRatio;
	}

	public set informationRatio(value: string) {
		this._informationRatio = this._commonHelperService.formatNumber(parseFloat(value), this.decimalPlaces);
	}

	public get return(): string {
		return this._return;
	}

	public set return(value: string) {
		this._return = this._commonHelperService.formatNumber(parseFloat(value), this.decimalPlaces);
	}

	public get profitEarnings(): string {
		return this._profitEarnings;
	}

	public set profitEarnings(value: string) {
		this._profitEarnings = this._commonHelperService.formatNumber(parseFloat(value), this.decimalPlaces);
	}

	public get averageMarketCap(): string {
		return this._averageMarketCap;
	}

	public set averageMarketCap(value: string) {
		this._averageMarketCap = this._commonHelperService.formatNumber(parseFloat(value), this.decimalPlaces);
	}

	public get expenseRatio(): string {
		return this._expenseRatio;
	}

	public set expenseRatio(value: string) {
		this._expenseRatio = this._commonHelperService.formatNumber(parseFloat(value), this.decimalPlaces);
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

	public get r2(): string {
		return this._r2;
	}

	public set r2(value: string) {
		this._r2 = this._commonHelperService.formatNumber(parseFloat(value), this.decimalPlaces);
	}

	public get stdDeviation(): string {
		return this._stdDeviation;
	}

	public set stdDeviation(value: string) {
		this._stdDeviation = this._commonHelperService.formatNumber(parseFloat(value), this.decimalPlaces);

	}

}
