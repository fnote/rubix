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

	public generateAuthRequest(authParams : {priceVerion : string, userName : string, password : string, userType : string, subType : string  }) : string {
		const fs = '\u001C';
		const ds = '\u0002';
		return [
			[ 150 , authParams.priceVerion ].join(ds),
			[ 20 , authParams.userName ].join(ds),
			[ 21 , authParams.password ].join(ds),
			[ 24 , authParams.userType ].join(ds),
			[ 1000 , authParams.subType ].join(ds)
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
