//all auth handlers inherit from this
export abstract class BaseAuthHandler {

//all auth handlers auth is false originally
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
