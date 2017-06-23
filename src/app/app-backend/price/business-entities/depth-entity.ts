import { BaseEntity } from './base-entity';
import { CommonHelperService } from '../../../app-utils/helper/common-helper.service';
import { userSettings } from '../../../app-config/user-settings';

export class DepthEntity {

	private _commonHelperService: CommonHelperService;
	private _depthID = userSettings.marketData.defaultStringInitializer;
	private _depthType: string;
	private _depthValue = userSettings.marketData.defaultStringInitializer;
	private _depthQty: [string, string] = [
		userSettings.marketData.defaultStringInitializer,
		userSettings.marketData.defaultStringInitializer,
	];
	private _depthSplit = userSettings.marketData.defaultStringInitializer;

	public set commonHelperService(value: CommonHelperService) {
		this._commonHelperService = value;
	}

	public get depthID(): string {
		return this._depthID;
	}

	public set depthID(value: string) {
		this._depthID = value;
	}

	public get depthType(): string {
		return this._depthType;
	}

	public set depthType(value: string) {
		this._depthType = value;
	}

	public get depthValue(): string {
		return this._depthValue;
	}

	public set depthValue(value: string) {
		this._depthValue =  this._commonHelperService.formatNumber(parseFloat(value), 3);
	}

	public get depthQty(): string {
		return this._depthQty[1];
	}

	public get displayDepthQty(): string {
		return this._depthQty[0];
	}

	public set depthQty(value: string) {
		this._depthQty = [this._commonHelperService.formatNumber(parseFloat(value), 0), value];
	}

	public get depthSplit(): string {
		return this._depthSplit;
	}

	public set depthSplit(value: string) {
		this._depthSplit = this._commonHelperService.formatNumber(parseFloat(value), 0);
	}

	public setValues(values: Object = {}): void {
		Object.assign(this, values);
	}

	constructor(values: Object = {}) {
		this.setValues(values);
	}
}

export class DepthDisplayEntity extends BaseEntity {

	private _commonHelperService: CommonHelperService;
	private _bidDisplayPoints: Array<DepthEntity>;
	private _offerDisplayPoints: Array<DepthEntity>;
	private _bidQtyArray: Array<number>;
	private _offerQtyArray: Array<number>;
	private _totalBidQty: [string, string] = [
		userSettings.marketData.defaultStringInitializer,
		userSettings.marketData.defaultStringInitializer,
	];
	private _totalOfferQty: [string, string] = [
		userSettings.marketData.defaultStringInitializer,
		userSettings.marketData.defaultStringInitializer,
	];
	private _subscriptionCount = 0 ;

	public set commonHelperService(value: CommonHelperService) {
		this._commonHelperService = value;
	}

	public get bidDisplayPoints(): Array<DepthEntity> {
		return this._bidDisplayPoints;
	}

	public set bidDisplayPoints(value: Array<DepthEntity>) {
		this._bidDisplayPoints = value;
	}

	public get offerDisplayPoints(): Array<DepthEntity> {
		return this._offerDisplayPoints;
	}

	public set offerDisplayPoints(value: Array<DepthEntity>) {
		this._offerDisplayPoints = value;
	}

	public get totalBidQty(): string {
		return this._totalBidQty[1];
	}

	public get displayTotalBidQty(): string {
		return this._totalBidQty[0];
	}

	public set totalBidQty(value: string) {
		this._totalBidQty = [this._commonHelperService.formatNumber(parseFloat(value), 0), value];
	}

	public get totalOfferQty(): string {
		return this._totalOfferQty[1];
	}

	public get displayTotalOfferQty(): string {
		return this._totalOfferQty[0];
	}

	public set totalOfferQty (value: string) {
		this._totalOfferQty = [this._commonHelperService.formatNumber(parseFloat(value), 0), value];
	}
	public get subscriptionCount(): number {
		return this._subscriptionCount;
	}

	public set subscriptionCount(value: number) {
		this._subscriptionCount = value;
	}

	public get bidQtyArray(): Array<number> {
		return this._bidQtyArray;
	}

	public set bidQtyArray(value: Array<number>) {
		this._bidQtyArray = value;
	}

	public get offerQtyArray(): Array<number> {
		return this._offerQtyArray;
	}

	public set offerQtyArray(value: Array<number>) {
		this._offerQtyArray = value;
	}

	constructor(values: Object = {}) {
		super();
		this.setValues(values);
	}
}
