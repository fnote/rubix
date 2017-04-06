import { DataService } from '../communication/data.service';
import { Injectable } from '@angular/core';
import { PriceAuthHandler } from './price/price-auth-handler';
import { StreamRouteService } from '../communication/stream-route.service';
import { TradeAuthHandler } from './trade/trade-auth-handler';

@Injectable()
export class AuthService {

	constructor(private dataService: DataService, private streamRouteService: StreamRouteService) {
		// code here
	}

	public authenticateUser(userName: string, password: string): void {
		const tradeAuthHandler = new TradeAuthHandler();
		const authRequest = tradeAuthHandler.buildAuthRequest(userName, password);
		this.dataService.sendToWs(authRequest);
	}

}
