
export abstract class BaseAuthHandler {

	private _isAuthenticated= false;

	constructor() {
		// code here
	}

	public get isAuthenticated(): boolean {
		return this._isAuthenticated;
	}

	public set isAuthenticated(value: boolean) {
		this._isAuthenticated = value;
	}

	protected abstract buildAuthRequest(userName: string, password: string): void;

	protected abstract processAuthRseponse(params: any): void;

}
