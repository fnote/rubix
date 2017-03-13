export class RequestHandler {
	private static _instance : RequestHandler = new RequestHandler();

	public static getInstance() : RequestHandler {
		return RequestHandler._instance;
	}

	constructor() {
		if (RequestHandler._instance) {
			throw new Error('Error: Instantiation failed: Use SingletonClass.getInstance() instead of new.');
		}

		RequestHandler._instance = this;
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
