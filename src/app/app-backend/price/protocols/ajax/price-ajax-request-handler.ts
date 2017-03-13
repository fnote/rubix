export class PriceAjaxRequestHandler {
	private static _instance : PriceAjaxRequestHandler = new PriceAjaxRequestHandler();

	public static getInstance() : PriceAjaxRequestHandler {
		return PriceAjaxRequestHandler._instance;
	}

	constructor() {
		if (PriceAjaxRequestHandler._instance) {
			throw new Error('Error: Instantiation failed: Use SingletonClass.getInstance() instead of new.');
		}

		PriceAjaxRequestHandler._instance = this;
	}

	private generateExchangeMetaRequest(params : Object = {}) : string {
		return 'exchange meta request';
	}

	private generateSymbolMetaRequest(params : Object = {}) : string {
		return 'symbol meta request';
	}
}
