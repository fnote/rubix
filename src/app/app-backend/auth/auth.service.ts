import { DataService } from '../communication/data.service';
import { Injectable } from '@angular/core';
import { PriceAuthHandler } from './price/price-auth-handler';
import { ResponseStatus } from '../../constants/enums/response-status.enum';
import { TradeAuthHandler } from './trade/trade-auth-handler';
import { TradeStreamingResponseHandler } from '../trade/protocols/streaming/trade-streaming-response-handler';

@Injectable()
export class AuthService {

	private tradeAuthHandler: TradeAuthHandler;

	constructor(private dataService: DataService,
		private tradeStreamingResponseHandler: TradeStreamingResponseHandler) {

		this.updateAuthStatus();
		this.tradeAuthHandler = TradeAuthHandler.getInstance();
	}

	public authenticateUser(userName: string, password: string): void {
		const authRequest = this.tradeAuthHandler.buildAuthRequest(userName, password);
		this.dataService.sendToWs(authRequest);
	}

	private updateAuthStatus(): void {
		this.tradeStreamingResponseHandler.getAuthenticationResponseStream().subscribe(response => {
			if (response && response.DAT) {
				if (response.DAT.AUTH_STS === ResponseStatus.Success) {
					this.tradeAuthHandler.isAuthenticated = true;
				}
			}
		});
	}

}
