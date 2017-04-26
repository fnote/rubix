import { BaseEntity } from './base-entity';

export class DepthEntity {

	private _depthID = '--';
	private _depthType: string;
	private _depthValue = '--';
	private _depthQty = '--';
	private _depthSplit = '--';

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
		this._depthValue = value;
	}

	public get depthQty(): string {
		return this._depthQty;
	}

	public set depthQty(value: string) {
		this._depthQty = value;
	}

	public get depthSplit(): string {
		return this._depthSplit;
	}

	public set depthSplit(value: string) {
		this._depthSplit = value;
	}

	public setValues(values: Object = {}): void {
		Object.assign(this, values);
	}

	constructor(values: Object = {}) {
		this.setValues(values);
	}
}

export class DepthDisplayEntity extends BaseEntity {

	private _bidDisplayPoints: Object;
	private _offerDisplayPoints: Object;
	private _summary: Object;
	private _subscriptionCount = 0 ;

	public get bidDisplayPoints(): Object {
		return this._bidDisplayPoints;
	}

	public set bidDisplayPoints(value: Object) {
		this._bidDisplayPoints = value;
	}

	public get offerDisplayPoints(): Object {
		return this._offerDisplayPoints;
	}

	public set offerDisplayPoints(value: Object) {
		this._offerDisplayPoints = value;
	}

	public get summary(): Object {
		return this._summary;
	}

	public set summary(value: Object) {
		this._summary = value;
	}

	public get subscriptionCount(): number {
		return this._subscriptionCount;
	}

	public set subscriptionCount(value: number) {
		this._subscriptionCount = value;
	}

	constructor(values: Object = {}) {
		super();
		this.setValues(values);
	}
}
