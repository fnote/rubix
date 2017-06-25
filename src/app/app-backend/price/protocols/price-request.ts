import { PriceRequestTypes } from '../../../app-constants/enums/price-request-types.enum';

export class PriceRequest {

	private _mt: PriceRequestTypes = null;
	private _rt: number = null;
	private _lan: string = null;
	private _sym: string[] = null;
	private _tkn: string = null;
	private _typ: number = null;
	private _param: [string, string][];
	private _seg: string[];
	private _exg: string[];
	private _apm: Object;
	private _pgi: number;
	private _pgs: number;

	constructor() {
		this._param = [];
	}
	public get mt(): PriceRequestTypes  {
		return this._mt;
	}

	public set mt(value: PriceRequestTypes) {
		this._mt = value;
	}

	public get rt(): number  {
		return this._rt;
	}

	public set rt(value: number) {
		this._rt = value;
	}

	public get lan(): string  {
		return this._lan;
	}

	public set lan(value: string) {
		this._lan = value;
	}

	public get sym(): string[]  {
		return this._sym;
	}

	public set sym(value: string[]) {
		this._sym = value;
	}

	public get tkn(): string  {
		return this._tkn;
	}

	public set tkn(value: string) {
		this._tkn = value;
	}

	public get typ(): number  {
		return this._typ;
	}

	public set typ(value: number) {
		this._typ = value;
	}

	public get seg(): string[] {
		return this._seg;
	}

	public set seg(value: string[]) {
		this._seg = value;
	}

	public get exg(): string[] {
		return this._exg;
	}

	public set exg(value: string[]) {
		this._exg = value;
	}

	public get apm(): Object {
		return this._apm;
	}

	public set apm(value: Object) {
		this._apm = value;
	}

	public get pgi(): number {
		return this._pgi;
	}

	public set pgi(value: number) {
		this._pgi = value;
	}

	public get pgs(): number {
		return this._pgs;
	}

	public set pgs(value: number){
		this._pgs = value;
	}

	public addParam(exg: string, sym?: string): void {
		this._param.push([exg, sym]);
	}

	public buildMessage(): string {
		const arrBuild: string[] = [];
		arrBuild.push('{');

		if (this.rt) {
			arrBuild.push('"RT":');
			arrBuild.push(String(this.rt));
			arrBuild.push(',');
		}

		if (this.tkn) {
			arrBuild.push('"TKN":"');
			arrBuild.push(this.tkn);
			arrBuild.push('",');
		}

		if (this.typ) {
			arrBuild.push('"TYP":');
			arrBuild.push(this.typ.toString());
			arrBuild.push(',');
		}

		if (this.lan) {
			arrBuild.push('"LAN":');
			arrBuild.push(String(this.lan));
			arrBuild.push(',');
		}

		if (this.sym) {
			arrBuild.push('"SYM":["');
			arrBuild.push(this.sym.join('","'));
			arrBuild.push('"]');
			arrBuild.push(',');
		}

		if (this.seg) {
			arrBuild.push('"SEG":["');
			arrBuild.push(this.seg.join('","'));
			arrBuild.push('"],');
		}

		if (this.exg) {
			arrBuild.push('"EXG":["');
			arrBuild.push(this.exg.join('","'));
			arrBuild.push('"],');
		}

		const tmp = this.getParam();
		if (tmp.length > 0) {
			arrBuild.push('"PRM":["');
			arrBuild.push(tmp.join('","'));
			arrBuild.push('"],');
		}

		if (this.pgi) {
			arrBuild.push('"PGI":');
			arrBuild.push(this.pgi.toString() + ',');
		}

		if (this.pgs) {
			arrBuild.push('"PGS":');
			arrBuild.push(this.pgs.toString() + ',');
		}

		if (this.apm) {
			arrBuild.push('"APM":{');
			for (const key in this.apm) {
				if (this.apm.hasOwnProperty(key)) {
					arrBuild.push('"' + key + '":"' + this.apm[key] + '"');
					arrBuild.push(',');
				}
			}
			arrBuild.pop();
			arrBuild.push('},');
		}

		if (this.mt) {
			arrBuild.push('"MT":');
			arrBuild.push(String(this.mt));
		}

		arrBuild.push('}');
		return arrBuild.join('').trim();
	}

	private getParam(): string[] {
		const arrParam: string[] = [];

		for (const item of this._param) {
			if (item[1]) {
				arrParam.push(item[0] + '~' + item[1]);
			} else {
				arrParam.push(item[0]);
			}
		}

		return arrParam;
	}
}
