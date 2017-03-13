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

	private generateExchangeMetaRequest(params : Object = {}) : string {
		return 'exchange meta request';
	}

	private generateSymbolMetaRequest(params : Object = {}) : string {
		return 'symbol meta request';
	}
}
