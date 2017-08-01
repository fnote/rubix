import { ATAuthHandler } from './at/at-auth-handler';
import { Channels } from '../../app-constants/enums/channels.enum';
import { DataService } from '../communication/data.service';
import { Injectable } from '@angular/core';
import { LoggerService } from '../../app-utils/logger.service';
import { PriceAuthHandler } from './price/price-auth-handler';
import { PriceStreamingResponseHandler } from '../price/protocols/streaming/price-streaming-response-handler';
import { ResponseStatus } from '../../app-constants/enums/response-status.enum';
import { Subject } from 'rxjs/Rx';
import { TradeAuthHandler } from './trade/trade-auth-handler';
import { TradeStreamingResponseHandler } from '../trade/protocols/streaming/trade-streaming-response-handler';
import { UserState } from './user-state';

interface AuthStatus {                       //user status all false at beginning not authennticated
	isAuthenticate: boolean;                //not trade authenticated
	isTradeAuthenticate: boolean;    //not price authentiated
	isPriceAuthenticated: boolean;   //not meta authenticated these are web socket establishing to price,meta and trade
	isMetaAuthenticated: boolean;
	rejectReson: string;
}
const AUTH_TIME_INTERVAL = 20000; // 1000 * 20

@Injectable()  // a service is created
//it is injectable you can inject this service from someother place to get its data
export class AuthService {
	//private (variable):type of varibale
	private tradeAuthHandler: TradeAuthHandler;//creating instances
	private priceAuthHandler: PriceAuthHandler;
	private atAuthHandler: ATAuthHandler;
	private authStatus$: Subject<AuthStatus>;//auth status of user is price meta trade authenticated
	private authStatus: Subject<AuthStatus>;
	private _redirectURL: string;
	private authTerminateTimer: NodeJS.Timer;

	constructor(private dataService: DataService,
							private tradeStreamingResponseHandler: TradeStreamingResponseHandler,
							private priceStreamingResponseHandler: PriceStreamingResponseHandler,
							private loggerService: LoggerService) {

		this.updateAuthStatus();
		this.tradeAuthHandler = TradeAuthHandler.getInstance();
		this.priceAuthHandler = PriceAuthHandler.getInstance();
		this.atAuthHandler = ATAuthHandler.getInstance();
	}

// a method takes username and password as parameter this in auth service is called from login component
	public authenticateUser(userName: string, password: string): void {
		this.authStatus$ = new Subject();
		this.loggerService.logInfo('Trade Connecting...', 'AuthService'); //logged in to not code
		UserState.getInstance().setTadeValues({ userName: userName });
		const authRequest = this.tradeAuthHandler.buildAuthRequest(userName, password);
		this.dataService.sendToWs(authRequest);
		this.authTerminateTimer = setTimeout(() => {
			this.terminateAuthentication();
		}, AUTH_TIME_INTERVAL);
	}
	//newwww
	public authenticateATUser(userName: string, password: string): void {
		this.authStatus = new Subject();
		this.loggerService.logInfo('AT Connecting...', 'AuthService'); //logged in to not code
		UserState.getInstance().setATValues({ userName: userName }) ;
		const authRequest = this.atAuthHandler.buildAuthRequest(userName, password);
		this.dataService.sendAjaxRequest(authRequest).then((response) => {
			response = JSON.parse(response._body);

			if (response && response.DAT) {
				this.loggerService.logInfo('AT Connected', 'AuthService');
				const currentAuthStatus: AuthStatus = {
					isAuthenticate: false,
					isTradeAuthenticate: false,
					isPriceAuthenticated: false,
					isMetaAuthenticated: false,
					rejectReson: '',
				}

				if (response.DAT.STATUS === ResponseStatus.Success) {
					this.loggerService.logInfo('AT YES', 'AuthService');
					this.atAuthHandler.isAuthenticated = true;
					UserState.getInstance().setATValues(response.DAT);
					// this.authenticatePrimarySSO();
					UserState.getInstance().isATAuthenticated = true;
					currentAuthStatus.isAuthenticate = true;
					currentAuthStatus['isATAuthenticate'] = true;
					this.loggerService.logInfo('AT logging success', 'AuthService');

					this.authStatus.next(currentAuthStatus);
				} else if (response.DAT.STATUS === '4') {
					this.loggerService.logInfo('AT YES 2', 'AuthService');
					currentAuthStatus.rejectReson = response.DAT.DES;
					this.loggerService.logInfo('AT logging fail', 'AuthService');
					this.authStatus.next(currentAuthStatus);
				}
				else {
					this.loggerService.logInfo('AT NO', 'AuthService');
				}
			}
		});
	}
//to check whether user got authenticated we have to ccheck auth status
//subject is like promise
	public checkAuthenticated(): Subject<AuthStatus> {
		return this.authStatus$;
	}
	public checkATAuthenticated(): Subject<AuthStatus> {
		return this.authStatus;
	}

	private terminateAuthentication(): void {
		let rejectReson: string;

//if user is state is not authenticated
//if user is not not authenticated that means not trade authenticated or price authenticated
		if (!UserState.getInstance().isAuthenticated)  {
			//if user is also trade not authenticated
			if (!UserState.getInstance().isTradeAuthenticated) {
				rejectReson = 'Trade Connection Fails';
			}else if (!UserState.getInstance().isPriceAuthenticated) {
				rejectReson = 'Price Connection Fails';
			}else {
				rejectReson = 'Error Occured..';
			}
			const authStatus = {
				isAuthenticate: UserState.getInstance().isAuthenticated,
				isTradeAuthenticate: UserState.getInstance().isTradeAuthenticated,
				isPriceAuthenticated: this.priceAuthHandler.isPriceAuthenticated,
				isMetaAuthenticated: this.priceAuthHandler.isMetaAuthenticated,
				rejectReson: rejectReson,
			};
			this.authStatus$.next(authStatus);
			this.authStatus$.complete();
			this.dataService.unsubscribeWsConnections([Channels.Trade, Channels.Price, Channels.PriceMeta]);
		}
	}

	private authenticatePrimarySSO(): void {
		this.loggerService.logInfo('Price Connecting...', 'AuthService');
		const request = this.priceAuthHandler.getPrimarySSORequest();
		this.dataService.sendToWs(request);
	}

	private authenticateSecondarySSO(): void {
		this.loggerService.logInfo('Meta Connecting...', 'AuthService');
		const request = this.priceAuthHandler.getSecondarySSORequest();
		this.dataService.sendToWs(request);
	}

	private updateAuthStatus(): void {
		this.tradeStreamingResponseHandler.getAuthenticationResponseStream().subscribe(response => {

			if (response && response.DAT) {
				this.loggerService.logInfo('Trade Connected', 'AuthService');

				if (response.DAT.AUTH_STS === ResponseStatus.Success) {
					this.tradeAuthHandler.isAuthenticated = true;
					UserState.getInstance().setTadeValues(response.DAT);
					UserState.getInstance().setTadeValues({ SESN_ID: response.HED.SESN_ID });
					this.authenticatePrimarySSO();
					UserState.getInstance().isTradeAuthenticated = true;

				}else if (response.DAT.AUTH_STS === ResponseStatus.Fail) {
					const authStatus = {
						isAuthenticate: false,
						isTradeAuthenticate: false,
						isPriceAuthenticated: false,
						isMetaAuthenticated: false,
						rejectReson: response.DAT.REJ_RESN,
					};
					clearTimeout(this.authTerminateTimer);
					this.authStatus$.next(authStatus);
				}
			}
		});

		this.priceStreamingResponseHandler.getPriceAuthResponseStream().subscribe(response => {
			this.loggerService.logInfo('Price Connected', 'AuthService');
			UserState.getInstance().setPriceValues(response);
			this.priceAuthHandler.isPriceAuthenticated = true;
			this.authenticateSecondarySSO();
		});

		this.priceStreamingResponseHandler.getMetaAuthResponseStream().subscribe(response => {
			this.loggerService.logInfo('Meta Connected', 'AuthService');
			UserState.getInstance().isPriceAuthenticated = true;
			this.priceAuthHandler.isMetaAuthenticated = true;

			if (this.priceAuthHandler.isPriceAuthenticated) {
				this.priceAuthHandler.isAuthenticated = true;
				UserState.getInstance().isAuthenticated = true;
				const authStatus = {
					isAuthenticate: true,
					isTradeAuthenticate: true,
					isPriceAuthenticated: true,
					isMetaAuthenticated: true,
					rejectReson: '',
				};
				this.authStatus$.next(authStatus);
			}
		});
	}

	public get redirectURL(): string {
		return this._redirectURL;
	}

	public set redirectURL(value: string) {
		this._redirectURL = value;
	}
}
