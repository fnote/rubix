import { BaseEntity } from './base-entity';
import { CommonHelperService } from '../../../utils/helper/common-helper.service';
import { ReflectiveInjector } from '@angular/core';
import { userSettings } from '../../../config/user-settings';

export class TimeAndSalesEntity extends BaseEntity {

	private commonHelperService: CommonHelperService;
	private _splits: number = userSettings.marketData.defaultNumberInitializer.zeroInitializer;
	private _time: string = userSettings.marketData.defaultStringInitializer;
	private _sequence: string = userSettings.marketData.defaultStringInitializer;
	private _lastTradePrice: number = userSettings.marketData.defaultNumberInitializer.minusOneInitializer;
	private _totalQty: number = userSettings.marketData.defaultNumberInitializer.minusOneInitializer;
	private _change: string = userSettings.marketData.defaultStringInitializer;
	private _perChange: string = userSettings.marketData.defaultStringInitializer;
	private _turnOver: string = userSettings.marketData.defaultStringInitializer;
	private _direction: string;
	private _type: string =  userSettings.marketData.defaultStringInitializer;
	private _typeString: string;
	private _typeClass: string;
	private _displayTime: string;
	private _decimalPlaces: number;

	public get splits(): number {
		return this._splits;
	}

	public set splits(value: number) {
		this._splits = value;
	}

	public get time(): string {
		return this._time;
	}

	public set time(value: string) {
		this._time = value;
	}

	public get sequence(): string {
		return this._sequence;
	}

	public set sequence(value: string) {
		this._sequence = value;
	}

	public get lastTradePrice(): number {
		return this._lastTradePrice;
	}

	public set lastTradePrice(value: number) {
		this._lastTradePrice = value;
	}

	public get totalQty(): number {
		return this._totalQty;
	}

	public set totalQty(value: number) {
		this._totalQty = value;
	}

	public get change(): string {
		return this._change;
	}

	public set change(value: string) {
		this._change = this.commonHelperService.roundNumber(parseFloat(value), this._decimalPlaces);
	}

	public get perChange(): string {
		return this._perChange;
	}

	public set perChange(value: string) {
		this._perChange = this.commonHelperService.roundNumber(parseFloat(value), this._decimalPlaces);
	}

	public get turnOver(): string {
		return this._turnOver;
	}

	public set turnOver(value: string) {
		this._turnOver = value;
	}

	public get direction(): string {
		return this._direction;
	}

	public set direction(value: string) {
		this._direction = value;
	}

	public get type(): string {
		return this._type;
	}

	public set type(value: string) {
		this._type = value;
	}

	public get typeString(): string {
		return this._typeString;
	}

	public set typeString(value: string) {
		this._typeString = value;
	}

	public get typeClass(): string {
		return this._typeClass;
	}

	public set typeClass(value: string) {
		this._typeClass = value;
	}

	public get displayTime(): string {
		return this._displayTime;
	}

	public set displayTime(value: string) {
		this._displayTime = value;
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
