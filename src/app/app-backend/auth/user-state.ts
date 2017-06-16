
export class UserState {

	private static instance: UserState;
	private _isAuthenticated = false;
	private _isTradeAuthenticated = false;
	private _isPriceAuthenticated = false;
	private tradeDetails = {};
	private priceDetails = {};

	public static getInstance(): UserState {
		UserState.instance = UserState.instance || new UserState();
		return UserState.instance;
	}

	constructor() {
		if (UserState.instance) {
			throw new Error('Error: Instantiation failed: Use SingletonClass.getInstance() instead of new.');
		}
	}

	public   getTradeDetails (): any {
		return this.tradeDetails;
	}

	public getPriceDetails(): any {
		return this.priceDetails;
	}

	public setPriceValues(values: Object = {}): void {
		Object.assign(this.priceDetails, values);
	}

	public setTadeValues(values: Object = {}): void {
		Object.assign(this.tradeDetails, values);
	}

	public get isAuthenticated(): boolean {
		return this._isAuthenticated;
	}

	public set isAuthenticated(value: boolean) {
		this._isAuthenticated = value;
	}

	public get isTradeAuthenticated(): boolean {
		return this._isTradeAuthenticated;
	}

	public set isTradeAuthenticated(value: boolean) {
		this._isTradeAuthenticated = value;
	}

	public get isPriceAuthenticated(): boolean {
		return this._isPriceAuthenticated;
	}

	public set isPriceAuthenticated(value: boolean) {
		this._isPriceAuthenticated = value;
	}

}
