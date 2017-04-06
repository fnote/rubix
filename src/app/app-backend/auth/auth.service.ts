import { DataService } from '../communication/data.service';
import { Injectable } from '@angular/core';
import { PriceAuthHandler } from './price/price-auth-handler';
import { TradeAuthHandler } from './trade/trade-auth-handler';
import { TradeStreamingResponseHandler } from '../trade/protocols/streaming/trade-streaming-response-handler';

@Injectable()
export class AuthService {

	constructor(private dataService: DataService,
		private tradeStreamingResponseHandler: TradeStreamingResponseHandler) {

		this.updateAuthStatus();
	}

	public authenticateUser(userName: string, password: string): void {
		const tradeAuthHandler = new TradeAuthHandler();
		const authRequest = tradeAuthHandler.buildAuthRequest(userName, password);
		this.dataService.sendToWs(authRequest);
	}

	private updateAuthStatus(): void {
		this.tradeStreamingResponseHandler.getAuthenticationResponseStream().subscribe(response => {
			if (response && response.DAT) {
				if (response.DAT.AUTH_STS === 1) {
					// user authenticated
				}
			}
		});
	}

}
