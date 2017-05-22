import { BaseEntity } from './base-entity';
import { CommonHelperService } from '../../../app-utils/helper/common-helper.service';
import { ReflectiveInjector } from '@angular/core';

export class IndexEntity extends BaseEntity {
	private _des: string;
	private _sDes: string;
	private _con: string;
	private _cat: string;
	private _symbolList: string[];
	private commonHelperService: CommonHelperService;

	constructor(values: Object = {}) {
		super();

		const injector = ReflectiveInjector.resolveAndCreate([CommonHelperService]);
		this.commonHelperService = injector.get(CommonHelperService);

		this.setValues(values);
	}

	public get des(): string {
		return this._des;
	}

	public set des(value: string) {
		this._des = value;
	}

	public get sDes(): string {
		return this._sDes;
	}

	public set sDes(value: string) {
		this._sDes = value;
	}

	public get con(): string {
		return this._con;
	}

	public set con(value: string) {
		this._con = value;
	}

	public get cat(): string {
		return this._cat;
	}

	public set cat(value: string) {
		this._cat = value;
	}

	public get symbolList(): string[] {
		return this._symbolList;
	}

	public set symbolList(value: string[]) {
		this._symbolList = value;
	}
}
