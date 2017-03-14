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

	public generateAddRequest(params : {MT : string, PRM : string}) : string {
		return ['{"RT":"1","MT":"', params.MT, '","PRM":"', params.PRM, '"]}'].join('');
	}

	public generateRemoveRequest(params : {MT : string, PRM : string}) : string {
		return ['{"RT":"0","MT":"', params.MT, '","PRM":"', params.PRM, '"]}'].join('');
	}
}
