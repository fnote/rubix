import { PriceRequestTypes } from '../../../app-constants/enums/price-request-types.enum';

export class PriceRequest {

	private _mt: PriceRequestTypes = null;
	private _rt: number = null;
	private _lan: string = null;
	private _tkn: number = null;
	private _param: [string, string][];
	private _seg: string[];
	private _exg: string[];

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

	public get tkn(): number  {
		return this._tkn;
	}

	public set tkn(value: number) {
		this._tkn = value;
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

	public addParam(exg: string, sym?: string): void {
		this._param.push([exg, sym]);
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

	public buildMessage(): string {
		const arrBuild: string[] = [];
		arrBuild.push('{');

		if (this.rt) {
			arrBuild.push('"RT":');
			arrBuild.push(String(this.rt));
			arrBuild.push(',');
		}

		if (this.mt) {
			arrBuild.push('"MT":');
			arrBuild.push(String(this.mt));
			arrBuild.push(',');
		}

		if (this.tkn) {
			arrBuild.push('"TKN":');
			arrBuild.push(String(this.tkn));
			arrBuild.push(',');
		}

		if (this.lan) {
			arrBuild.push('"LAN":');
			arrBuild.push(String(this.lan));
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
			arrBuild.push('"]');
		}

		arrBuild.push('}');

		return arrBuild.join('').trim();
	}

	constructor() {
		this._param = [];
	}
}
