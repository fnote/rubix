
export class UserState { //auth status

	private static instance: UserState; //variables
	private _isAuthenticated = false;
	private _isTradeAuthenticated = false;
	private _isPriceAuthenticated = false;
	private _isATAuthenticated = false;
	private tradeDetails = {};
	private priceDetails = {};
	private aTDetails= {};

	//these are the details that user status should have,is user authenticated,trade authenticated ,price authenticated,if
	//price autheticated and trade authenticated trade and price details
	//write setters and getters for trade and price details
	//setters and getters for each type of authentication
	//have to find from where authentication is set and price and trade details are set

//provides a user status to any other class requeesting it
//singleton
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
	public getATDetails(): any {
		return this.aTDetails;
	}

//from where price is set?
	public setPriceValues(values: Object = {}): void {
		Object.assign(this.priceDetails, values);
	}

//from where trade is set?
	public setATValues(values: Object = {}): void {
		Object.assign(this.aTDetails, values);
	}

	public setTadeValues(values: Object = {}): void {
		Object.assign(this.tradeDetails, values);
	}
//getter
	public get isAuthenticated(): boolean {
		return this._isAuthenticated;
	}
//from where auth is set?
	public set isAuthenticated(value: boolean) {
		this._isAuthenticated = value;
	}
//ggetter
	public get isTradeAuthenticated(): boolean {
		return this._isTradeAuthenticated;
	}

	public get isATAuthenticated(): boolean {
		return this._isATAuthenticated;
	}
//setter
	public set isTradeAuthenticated(value: boolean) {
		this._isTradeAuthenticated = value;
	}
//getter
	public get isPriceAuthenticated(): boolean {
		return this._isPriceAuthenticated;
	}
//setter
	public set isPriceAuthenticated(value: boolean) {
		this._isPriceAuthenticated = value;
	}
	public set isATAuthenticated(value: boolean){
		this._isATAuthenticated = value ;
	}

}
