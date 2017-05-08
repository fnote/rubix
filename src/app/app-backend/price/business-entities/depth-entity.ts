import { BaseEntity } from './base-entity';
import { CommonHelperService } from '../../../app-utils/helper/common-helper.service';
import { ReflectiveInjector } from '@angular/core';
import { userSettings } from '../../../app-config/user-settings';

export class DepthEntity {

	private commonHelperService: CommonHelperService;
	private _depthID = userSettings.marketData.defaultStringInitializer;
	private _depthType: string;
	private _depthValue = userSettings.marketData.defaultStringInitializer;
	private _depthQty: [string, string] = [
		userSettings.marketData.defaultStringInitializer,
		userSettings.marketData.defaultStringInitializer,
	];
	private _depthSplit = userSettings.marketData.defaultStringInitializer;

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
		this._depthValue =  this.commonHelperService.formatNumber(parseFloat(value), 3);
	}

	public get depthQty(): string {
		return this._depthQty[1];
	}

	public get displayDepthQty(): string {
		return this._depthQty[0];
	}

	public set depthQty(value: string) {
		this._depthQty = [this.commonHelperService.formatNumber(parseFloat(value), 0), value];
	}

	public get depthSplit(): string {
		return this._depthSplit;
	}

	public set depthSplit(value: string) {
		this._depthSplit = this.commonHelperService.formatNumber(parseFloat(value), 0);
	}

	public setValues(values: Object = {}): void {
		Object.assign(this, values);
	}

	constructor(values: Object = {}) {
		const injector = ReflectiveInjector.resolveAndCreate([CommonHelperService]);
		this.commonHelperService = injector.get(CommonHelperService);
		this.setValues(values);
	}
}

export class DepthDisplayEntity extends BaseEntity {

	private commonHelperService: CommonHelperService;
	private _bidDisplayPoints: Array<DepthEntity>;
	private _offerDisplayPoints: Array<DepthEntity>;
	private _bidQtyArray: Array<string>;
	private _offerQtyArray: Array<string>;
	private _totalBidQty: [string, string] = [
		userSettings.marketData.defaultStringInitializer,
		userSettings.marketData.defaultStringInitializer,
	];
	private _totalOfferQty: [string, string] = [
		userSettings.marketData.defaultStringInitializer,
		userSettings.marketData.defaultStringInitializer,
	];
	private _subscriptionCount = 0 ;

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
		this._totalBidQty = [this.commonHelperService.formatNumber(parseFloat(value), 0), value];
	}

	public get totalOfferQty(): string {
		return this._totalOfferQty[1];
	}

	public get displayTotalOfferQty(): string {
		return this._totalOfferQty[0];
	}

	public set totalOfferQty (value: string) {
		this._totalOfferQty = [this.commonHelperService.formatNumber(parseFloat(value), 0), value];
	}
	public get subscriptionCount(): number {
		return this._subscriptionCount;
	}

	public set subscriptionCount(value: number) {
		this._subscriptionCount = value;
	}

	public get bidQtyArray(): Array<string> {
		return this._bidQtyArray;
	}

	public set bidQtyArray(value: Array<string>) {
		this._bidQtyArray = value;
	}

	public get offerQtyArray(): Array<string> {
		return this._offerQtyArray;
	}

	public set offerQtyArray(value: Array<string>) {
		this._offerQtyArray = value;
	}

	constructor(values: Object = {}) {
		super();
		const injector = ReflectiveInjector.resolveAndCreate([CommonHelperService]);
		this.commonHelperService = injector.get(CommonHelperService);
		this.setValues(values);
	}
}
