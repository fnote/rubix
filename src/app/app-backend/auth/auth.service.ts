import { DataService } from '../communication/data.service';
import { Injectable } from '@angular/core';
import { LoggerService } from '../../utils/logger.service';
import { PriceAuthHandler } from './price/price-auth-handler';
import { PriceStreamingResponseHandler } from '../price/protocols/streaming/price-streaming-response-handler';
import { ResponseStatus } from '../../constants/enums/response-status.enum';
import { TradeAuthHandler } from './trade/trade-auth-handler';
import { TradeStreamingResponseHandler } from '../trade/protocols/streaming/trade-streaming-response-handler';
import { UserState } from '../../model/user-state';

@Injectable()
export class AuthService {

	private tradeAuthHandler: TradeAuthHandler;
	private priceAuthHandler: PriceAuthHandler;

	constructor(private dataService: DataService,
		private tradeStreamingResponseHandler: TradeStreamingResponseHandler,
		private priceStreamingResponseHandler: PriceStreamingResponseHandler,
		private loggerService: LoggerService) {

		this.updateAuthStatus();
		this.tradeAuthHandler = TradeAuthHandler.getInstance();
		this.priceAuthHandler = PriceAuthHandler.getInstance();
	}

	public authenticateUser(userName: string, password: string): void {
		this.loggerService.logInfo('Trade Connecting...', 'AuthService');
		UserState.getInstance().setTadeValues({ userName: userName });
		const authRequest = this.tradeAuthHandler.buildAuthRequest(userName, password);
		this.dataService.sendToWs(authRequest);
	}

	private authenticatePrimarySSO(): void {
		const request = this.priceAuthHandler.getPrimarySSORequest();
		this.dataService.sendToWs(request);
	}

	private authenticateSecondarySSO(): void {
		const request = this.priceAuthHandler.getSecondarySSORequest();
		this.dataService.sendToWs(request);
	}

	private updateAuthStatus(): void {
		this.tradeStreamingResponseHandler.getAuthenticationResponseStream().subscribe(response => {
			if (response && response.DAT) {
				if (response.DAT.AUTH_STS === ResponseStatus.Success) {
					this.loggerService.logInfo('Trade Connected', 'AuthService');
					this.tradeAuthHandler.isAuthenticated = true;
					UserState.getInstance().setTadeValues(response.DAT);
					UserState.getInstance().setTadeValues({ SESN_ID: response.HED.SESN_ID });
					this.loggerService.logInfo('Price Connecting...', 'AuthService');
					this.authenticatePrimarySSO();
				}
			}
		});

		this.priceStreamingResponseHandler.getPriceAuthResponseStream().subscribe(response => {
			this.loggerService.logInfo('Price Connected', 'AuthService');
			UserState.getInstance().setPriceValues(response);
			this.priceAuthHandler.isPriceAuthenticated = true;
			this.loggerService.logInfo('Meta Connecting...', 'AuthService');
			this.authenticateSecondarySSO();
		});

		this.priceStreamingResponseHandler.getMetaAuthResponseStream().subscribe(response => {
			this.loggerService.logInfo('Meta Connected', 'AuthService');
			this.priceAuthHandler.isMetaAuthenticated = true;
			if (this.priceAuthHandler.isPriceAuthenticated) {
				this.priceAuthHandler.isAuthenticated = true;
			}
		});
	}

}
