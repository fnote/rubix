import { PriceRequestTypes } from '../../../constants/enums/price-request-types.enum';

export class PriceRequest {

	private _mt : PriceRequestTypes = null;
	private _rt : number = null;
	private _lan : string = null;
	private _exg : string[];
	private _sym : string[];

	public get mt() : PriceRequestTypes  {
		return this._mt;
	}

	public set mt(value : PriceRequestTypes ) {
		this._mt = value;
	}

	public get rt() : number  {
		return this._rt;
	}

	public set rt(value : number ) {
		this._rt = value;
	}

	public get lan() : string  {
		return this._lan;
	}

	public set lan(value : string ) {
		this._lan = value;
	}

	public addParam(exg : string, sym? : string) : void {
		this._exg.push(exg);

		if (sym) {
			this._sym.push(sym);
		}
	}

	private getParam() : string[] {
		const arrParam : string[] = [];

		let i = 0;
		for (const exg of this._exg) {
			if (this._sym[i]) {
				arrParam.push(exg + '~' + this._sym[i]);
			} else {
				arrParam.push(exg);
			}
			i++;
		}

		return arrParam;
	}

	public buildMessage() : string {
		const arrBuild : string[] = [];
		arrBuild.push('{');

		if (this.rt) {
			arrBuild.push('"RT":');
			arrBuild.push(String(this.rt));
		}

		if (this.mt) {
			arrBuild.push(',');
			arrBuild.push('"MT":');
			arrBuild.push(String(this.mt));
		}

		if (this.lan) {
			arrBuild.push(',');
			arrBuild.push('"LAN":');
			arrBuild.push(this.lan);
		}

		const tmp = this.getParam();
		if (tmp.length > 0) {
			arrBuild.push(',');
			arrBuild.push('"PRM":["');
			arrBuild.push(tmp.join('","'));
			arrBuild.push('"]');
		}

		arrBuild.push('}');

		return arrBuild.join('');
	}

	constructor() {
		this._exg = [];
		this._sym = [];
	}
}
