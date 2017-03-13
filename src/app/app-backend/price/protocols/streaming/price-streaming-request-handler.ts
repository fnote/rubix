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

	private generateAuthRequest(authParams : Object = {}) : string {
		return 'auth request';
	}

	private generateSSOAuthRequest(authParams : Object = {}) : string {
		return 'sso auth request';
	}

	private generateAddExchangeRequest(params : Object = {}) : string {
		return 'add exchange request';
	}
}
