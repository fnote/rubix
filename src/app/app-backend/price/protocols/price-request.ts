import { PriceRequestTypes } from '../../../app-constants/enums/price-request-types.enum';

export class PriceRequest {

	private _MT: PriceRequestTypes = null;
	private _RT: number = null;
	private _LAN: string = null;
	private _SYM: string[] = null;
	private _TKN: string = null;
	private _TYP: number = null;
	private _param: [string, string][];
	private _SEG: string[];
	private _EXG: string[];
	private _APM: Object;
	private _PGI: number;
	private _PGS: number;
	private _PRV: string[];

	constructor() {
		this._param = [];
	}

	public get MT(): PriceRequestTypes {
		return this._MT;
	}

	public set MT(value: PriceRequestTypes) {
		this._MT = value;
	}

	public get RT(): number {
		return this._RT;
	}

	public set RT(value: number) {
		this._RT = value;
	}

	public get LAN(): string {
		return this._LAN;
	}

	public set LAN(value: string) {
		this._LAN = value;
	}

	public get SYM(): string[] {
		return this._SYM;
	}

	public set SYM(value: string[]) {
		this._SYM = value;
	}

	public get TKN(): string {
		return this._TKN;
	}

	public set TKN(value: string) {
		this._TKN = value;
	}

	public get TYP(): number {
		return this._TYP;
	}

	public set TYP(value: number) {
		this._TYP = value;
	}

	public get SEG(): string[] {
		return this._SEG;
	}

	public set SEG(value: string[]) {
		this._SEG = value;
	}

	public get EXG(): string[] {
		return this._EXG;
	}

	public set EXG(value: string[]) {
		this._EXG = value;
	}

	public get APM(): Object {
		return this._APM;
	}

	public set APM(value: Object) {
		this._APM = value;
	}

	public get PGI(): number {
		return this._PGI;
	}

	public set PGI(value: number) {
		this._PGI = value;
	}

	public get PGS(): number {
		return this._PGS;
	}

	public set PGS(value: number) {
		this._PGS = value;
	}

	public get PRV(): string[] {
		return this._PRV;
	}

	public set PRV(value: string[]) {
		this._PRV = value;
	}

	public addParam(exg: string, sym?: string): void {
		this._param.push([exg, sym]);
	}

	public buildMessage(): string {
		const arrBuild: string[] = [];
		arrBuild.push('{');

		if (this.RT) {
			arrBuild.push('"RT":');
			arrBuild.push(String(this.RT));
			arrBuild.push(',');
		}

		if (this.TKN) {
			arrBuild.push('"TKN":"');
			arrBuild.push(this.TKN);
			arrBuild.push('",');
		}

		if (this.TYP) {
			arrBuild.push('"TYP":');
			arrBuild.push(this.TYP.toString());
			arrBuild.push(',');
		}

		if (this.LAN) {
			arrBuild.push('"LAN":');
			arrBuild.push('"' + String(this.LAN) + '"');
			arrBuild.push(',');
		}

		if (this.SYM) {
			arrBuild.push('"SYM":["');
			arrBuild.push(this.SYM.join('","'));
			arrBuild.push('"]');
			arrBuild.push(',');
		}

		if (this.SEG) {
			arrBuild.push('"SEG":["');
			arrBuild.push(this.SEG.join('","'));
			arrBuild.push('"],');
		}

		if (this.EXG) {
			arrBuild.push('"EXG":["');
			arrBuild.push(this.EXG.join('","'));
			arrBuild.push('"],');
		}

		const tmp = this.getParam();
		if (tmp.length > 0) {
			arrBuild.push('"PRM":["');
			arrBuild.push(tmp.join('","'));
			arrBuild.push('"],');
		}

		if (this.PGI) {
			arrBuild.push('"PGI":');
			arrBuild.push(this.PGI.toString() + ',');
		}

		if (this.PGS) {
			arrBuild.push('"PGS":');
			arrBuild.push(this.PGS.toString() + ',');
		}

		if (this.PRV) {
			arrBuild.push('"PRV":["');
			arrBuild.push(this.PRV.join('","'));
			arrBuild.push('"],');
		}

		if (this.APM) {
			arrBuild.push('"APM":{');
			for (const key in this.APM) {
				if (this.APM.hasOwnProperty(key)) {
					arrBuild.push('"' + key + '":"' + this.APM[key] + '"');
					arrBuild.push(',');
				}
			}
			arrBuild.pop();
			arrBuild.push('},');
		}

		if (this.MT) {
			arrBuild.push('"MT":');
			arrBuild.push(String(this.MT));
		}

		arrBuild.push('}');
		return arrBuild.join('').trim();
	}

	public getParam(): string[] {
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
