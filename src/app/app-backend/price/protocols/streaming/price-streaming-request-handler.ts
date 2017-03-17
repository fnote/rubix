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

	public generateAuthRequest(authParams : Object = {}) : string {
		return 'auth request';
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
