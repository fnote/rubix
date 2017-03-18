import { PriceRequest } from '../price-request';

export class PriceStreamingRequestHandler {

	private static _instance : PriceStreamingRequestHandler = new PriceStreamingRequestHandler();

	public static getInstance() : PriceStreamingRequestHandler {
		return PriceStreamingRequestHandler._instance;
	}

	constructor() {
		if (PriceStreamingRequestHandler._instance) {
			throw new Error('Error: Instantiation failed: Use SingletonClass.getInstance() instead of new.');
		}

		PriceStreamingRequestHandler._instance = this;
	}

	public generateAuthRequest(authParams : {
								priceVerion : string,
								userName : string,
								password : string,
								userType : string,
								subType : string}) : string {
		const fs = '\u001C';
		const ds = '\u0002';
		const AUTHENTICATION_REQUEST_VERSION_TAG = 150;
		const USER_NAME_TAG = 20;
		const USER_PASSWORD_TAG = 21;
		const USER_TYPE_TAG = 24;
		const USER_SUB_TYPE_TAG = 1000;
		return [
			[ AUTHENTICATION_REQUEST_VERSION_TAG , authParams.priceVerion ].join(ds),
			[ USER_NAME_TAG , authParams.userName ].join(ds),
			[ USER_PASSWORD_TAG , authParams.password ].join(ds),
			[ USER_TYPE_TAG , authParams.userType ].join(ds),
			[ USER_SUB_TYPE_TAG , authParams.subType ].join(ds)
		].join(fs);
	}

	public generateSSOAuthRequest(authParams : Object = {}) : string {
		return 'sso auth request';
	}

	public generateAddRequest(req : PriceRequest) : string {
		req.rt = 1;
		return req.buildMessage();
	}

	public generateRemoveRequest(req : PriceRequest) : string {
		req.rt = 0;
		return req.buildMessage();
	}
}
