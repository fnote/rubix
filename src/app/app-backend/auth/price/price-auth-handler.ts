import { BaseAuthHandler } from '../base-auth-handler';
import { Channels } from '../../../app-constants/enums/channels.enum';
import { RequestTags } from '../../../app-constants/enums/request-tags.enum';
import { UserState } from '../../../app-backend/auth/user-state';

//there are authentication handlers that inherits from a base auth handler 
export class PriceAuthHandler extends BaseAuthHandler {

	private static instance: PriceAuthHandler;
	private _isPriceAuthenticated = false;  //price not authenticated at the beginning
	private _isMetaAuthenticated = false; 

	public static getInstance(): PriceAuthHandler {
		PriceAuthHandler.instance = PriceAuthHandler.instance || new PriceAuthHandler();
		return PriceAuthHandler.instance;
	}

	constructor() {
		super();
		if (PriceAuthHandler.instance) {
			throw new Error('Error: Instantiation failed: Use SingletonClass.getInstance() instead of new.');
		}
	}

//getter 
	public get isPriceAuthenticated(): boolean {
		return this._isPriceAuthenticated;
	}

//setter
	public set isPriceAuthenticated(value: boolean) {
		this._isPriceAuthenticated = value;
	}
//setter
	public set isMetaAuthenticated(value: boolean) {
		this._isMetaAuthenticated = value;
	}


	public buildAuthRequest(userName: string, password: string): void {
		// code
	}
//getter
	public getPrimarySSORequest(): Object {
		const primarySSOReq = {
			channel: Channels.Price,
			data: this.buildPrimarySSORequest(),
		};
		return primarySSOReq;
	}
//setter
	public getSecondarySSORequest(): Object {
		const secoundaySSOReq = {
			channel: Channels.PriceMeta,
			data: this.buildSecondarySSORequest(),
		};
		return secoundaySSOReq;
	}
//building request
	public buildSecondarySSORequest(): string {
		const fs = '\u001C'; const ds = '\u0002';
		return [
			[RequestTags.AuthRequestVersion, '1'].join(ds),
			[RequestTags.UserName, UserState.getInstance().getTradeDetails().userName].join(ds),
			[RequestTags.UserType, '30'].join(ds),
			[RequestTags.UserId, UserState.getInstance().getTradeDetails().USR_ID].join(ds),
			[RequestTags.UserSubType, '1'].join(ds),
			[RequestTags.ConnectingType, '0'].join(ds),
			[RequestTags.UserSession, UserState.getInstance().getPriceDetails().SESSION].join(ds),
		].join(fs);
	}

	public processAuthRseponse(response: any): void {
		// code here
	}

//building request
	public buildPrimarySSORequest(): string {
		const fs = '\u001C';
		const ds = '\u0002';
		const deviceProfileType = 2;
		const paramArray = [
			[RequestTags.AuthRequestVersion, '1'].join(ds),
			[RequestTags.UserName, UserState.getInstance().getTradeDetails().ENC_SEC_TKN].join(ds),
			[RequestTags.UserType, '30'].join(ds),
			[RequestTags.UserSubType, '1'].join(ds),
			[RequestTags.SSO, 1].join(ds),
			[RequestTags.UserInstId, '2'].join(ds),
			[RequestTags.UserProfileVersion, undefined].join(ds),
			[RequestTags.UserProfileVersionDevice, undefined].join(ds),
			[RequestTags.UserDeviceType, deviceProfileType].join(ds),
		];
		return paramArray.join(fs);
	}
}
