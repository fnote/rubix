import { BaseAuthHandler } from '../base-auth-handler';

export class SSOAuthHandler extends BaseAuthHandler {
	constructor() {
		super();
	}

	public processAuthRseponse(response: any): void {
		// code here
	}

	public buildAuthRequest(userName: string, password: string): void {
		// code here
	}

	public buildPriceAuthRequest(userName: string, password: string): void {
		// code here
	}

}
