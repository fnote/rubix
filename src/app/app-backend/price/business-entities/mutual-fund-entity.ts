import { BaseEntity } from './base-entity';
import { CommonHelperService } from '../../../app-utils/helper/common-helper.service';
import { userSettings } from '../../../app-config/user-settings';

export class MutualFundEntity extends BaseEntity {

	private _commonHelperService: CommonHelperService;

	private _chartDataMap = {};

	private _region: string = userSettings.marketData.defaultStringInitializer;
	private _riskType: string = userSettings.marketData.defaultStringInitializer;
	private _description: string = userSettings.marketData.defaultStringInitializer;
	private _fullDescription: string = userSettings.marketData.defaultStringInitializer;
	private _shortDescription: string = userSettings.marketData.defaultStringInitializer;
	private _currency: string = userSettings.marketData.defaultStringInitializer;
	private _benchMark: string =  userSettings.marketData.defaultStringInitializer;
	private _percentageOneMonth: string =  userSettings.marketData.defaultStringInitializer;
	private _percentageThreeMonth: string =  userSettings.marketData.defaultStringInitializer;

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
		this._percentageOneMonth = this._commonHelperService.formatNumber(parseFloat(value), 1) + '%';
	}

	public get percentageThreeMonth(): string {
		return this._percentageThreeMonth;
	}

	public set percentageThreeMonth(value: string) {
		this._percentageThreeMonth = this._commonHelperService.formatNumber(parseFloat(value), 1) + '%';
	}

	public addchartData(duration: string, value: number): void {
		this._chartDataMap[duration] = value;
	}

}
