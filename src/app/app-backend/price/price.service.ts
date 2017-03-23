import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

import { DataManagers } from '../../constants/enums/data-managers.enum';
import { BaseDataStore } from './data-stores/base-data-store';
import { StockDataStore } from './data-stores/stock-data-store';
import { PriceStreamingRequestHandler } from './protocols/streaming/price-streaming-request-handler';
import { PriceStreamingResponseHandler} from './protocols/streaming/price-streaming-response-handler';
import { PriceRequest } from './protocols/price-request';
import { PriceRequestTypes } from '../../constants/enums/price-request-types.enum';
import { PriceSubscriptionService } from './price-subscription.service';
import { DataService } from '../communication/data.service';

@Injectable()
export class PriceService {

	constructor(private dataService : DataService , private priceStreamingResponseHandler : PriceStreamingResponseHandler , private priceSubscriptionService : PriceSubscriptionService ) {  }

	/**
		 * Fetch data managers
		 * @param dmID Data Manager ID number
		 */
	public getDataManager (dmID : number) : BaseDataStore {
		let dtStore : BaseDataStore = null;

		switch (dmID) {
			case DataManagers.Stock:
				dtStore = StockDataStore.getInstance();
				break;
			case DataManagers.Exchange:
				dtStore = StockDataStore.getInstance();
				break;
		}

		return dtStore;
	}

	//
	// API to handle authentication
	//

	/**
		 * Authenticate with username and password
		 * @param authParams An object with following properties set
	 * 						channel		: Value Defined at Channels Enum. Mandatory
		 *                      username    : Username. Mandatory.
		 *                      password    : Password. Mandatory.
		 *                      loginIP     : Machine IP
		 *                      appVersion  : Application version
		 *                      lan         : Current Language. Mandatory.
		 */
	public authenticateWithUsernameAndPassword (authParams : any, connectionIndex : number) : void  {
		const authReqest =  PriceStreamingRequestHandler.getInstance().generateAuthRequest(authParams);
		const request = {
			index : connectionIndex,
			data : authReqest
		};
		this.dataService.sendToWs(request);
	}

  /**
   * Authenticate with Secondary Auth Token
   * @param authParams An object with following properties set
   *                      username    : Username. Mandatory.
   *                      password    : Password. Mandatory.
   *                      loginIP     : Machine IP
   *                      appVersion  : Application version
   *                      lan         : Current Language. Mandatory.
   */
	public authenticateWithSecondaryAuthToken (authParams : any, channel : number) : void  {
		const authRequest =  PriceStreamingRequestHandler.getInstance().generateSecondaryAuthRequest(authParams);
		const request = {
			index : channel,
			data : authRequest
		};
		this.dataService.sendToWs(request);
	}

	/**
		 * Authenticate with SSO token
		 * @param authParams An object with following properties set
		 *                      channel		: Value Defined at Channels Enum. Mandatory
		 *                      sso token	: SSO token. Mandatory
		 *                      loginIP     : Machine IP
		 *                      appVersion  : Application version
		 *                      lan         : Current Language. Mandatory.
		 */
	public authenticateWithSSOToken (authParams : Object = {}) : void  {
	}

	/**
		 * Authenticate with Primary AuthToken
		 * @param authParams An object with following properties set
		 *                      channel		: Value Defined at Channels Enum. Mandatory
		 *                      sso token	: SSO token. Mandatory
		 *                      loginIP     : Machine IP
		 *                      appVersion  : Application version
		 *                      lan         : Current Language. Mandatory.
		 */
	public authenticateWithPrimaryAuthToken(authParams : Object = {}) : void  {
	}


	//
	// API to handle price related meta and streaming
	//

	/**
     * Subscribe and Un-subscribe from exchange updates
     * @param exchange Exchange code string
     */
	public addExchangeRequest (exchange : string) : void {
		if (this.priceSubscriptionService.subscribeFor(PriceRequestTypes.Exchange, exchange)) {
			const req = new PriceRequest;
			req.mt = PriceRequestTypes.Exchange;
			req.addParam(exchange);
			alert(PriceStreamingRequestHandler.getInstance().generateAddRequest(req));
		}
	}

	public removeExchangeRequest (exchange : string) : void {
		if (this.priceSubscriptionService.unSubscribeFor(PriceRequestTypes.Exchange, exchange)) {
			const req = new PriceRequest;
			req.mt = PriceRequestTypes.Exchange;
			req.addParam(exchange);
			alert(PriceStreamingRequestHandler.getInstance().generateRemoveRequest(req));
		}
	}

	public addExchangeListRequest (exchange : string[]) : void {
		const req = new PriceRequest;
		req.mt = PriceRequestTypes.Exchange;

		for (const exg of exchange) {
			req.addParam(exg);
		}

		alert(PriceStreamingRequestHandler.getInstance().generateAddRequest(req));
	}

	public removeExchangeListRequest (exchange : string[]) : void {
		const req = new PriceRequest;
		req.mt = PriceRequestTypes.Exchange;

		for (const exg of exchange) {
			req.addParam(exg);
		}

		alert(PriceStreamingRequestHandler.getInstance().generateRemoveRequest(req));
	}

    /**
     * Subscribe and Un-subscribe for a symbol updates
     * @param exchangeSymbol A tupple with Exchange Code and Symbol Code [string, string]
     */
	public addSymbolRequest (exchangeSymbol : [string, string]) : void {
		if (this.priceSubscriptionService.subscribeFor(PriceRequestTypes.Exchange, exchangeSymbol[0], exchangeSymbol[1])) {
			const req = new PriceRequest;
			req.mt = PriceRequestTypes.SnapshotSymbol;
			req.addParam(exchangeSymbol[0], exchangeSymbol[1]);
			alert(PriceStreamingRequestHandler.getInstance().generateAddRequest(req));
		}
	}

	public removeSymbolRequest (exchangeSymbol : [string, string]) : void {
		if (this.priceSubscriptionService.unSubscribeFor(PriceRequestTypes.Exchange, exchangeSymbol[0], exchangeSymbol[1])) {
			const req = new PriceRequest;
			req.mt = PriceRequestTypes.SnapshotSymbol;
			req.addParam(exchangeSymbol[0], exchangeSymbol[1]);
			alert(PriceStreamingRequestHandler.getInstance().generateRemoveRequest(req));
		}
	}

	/**
     * Subscribe and Un-subscribe for a list of symbol updates.
     * @param @param exchangeSymbol An array of tupples with Exchange Code and Symbol Code [string, string][]
     */
	public addSymbolListRequest (exchangeSymbol : [string, string][]) : void {
		const req = new PriceRequest;
		req.mt = PriceRequestTypes.SnapshotSymbol;

		for (const exgSym of exchangeSymbol) {
			req.addParam(exgSym[0], exgSym[1]);
		}

		alert(PriceStreamingRequestHandler.getInstance().generateAddRequest(req));
	}

	public removeSymbolListRequest (exchangeSymbol : [string, string][]) : void {
		const req = new PriceRequest;
		req.mt = PriceRequestTypes.SnapshotSymbol;

		for (const exgSym of exchangeSymbol) {
			req.addParam(exgSym[0], exgSym[1]);
		}

		alert(PriceStreamingRequestHandler.getInstance().generateRemoveRequest(req));
	}

	public getPriceResponseStream() : Subject<Object> {
		return this.priceStreamingResponseHandler.getPriceResponseStream();
	}

	//
	// API to handle trade related meta and streaming
	//
}
