import { BaseEntity } from './base-entity';

export class IndexEntity extends BaseEntity {
	private _des: string;
	private _sDes: string;
	private _contry: string;
	private _cat: string;
	// private _sec: string;
	// private _dep: string;
	// private _symt: string;
	// private _isg: string;
	// private _pri: string;
	// private _clf: string;

	private _symbolList: string[];
	private _indexSymbolCode: string;

	constructor(values: Object = {}) {
		super();

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

	public get contry(): string {
		return this._contry;
	}

	public set contry(value: string) {
		this._contry = value;
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

	public get indexSymbolCode(): string {
		return this._indexSymbolCode;
	}

	public set indexSymbolCode(value: string) {
		this._indexSymbolCode = value;
	}
}
