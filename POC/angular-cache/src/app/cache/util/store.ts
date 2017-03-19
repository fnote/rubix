export class Store {
	private _name : string;
	private _mode : string;

	constructor(name : string, mode : string) {
		this.name = name;
		this.mode = mode;
	}

	public get name() : string {
		return this._name;
	}

	public set name(value : string) {
		this._name = value;
	}

	public get mode() : string {
		return this._mode;
	}

	public set mode(value : string) {
		this._mode = value;
	}
}
