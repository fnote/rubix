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
     * @param exchange Exchange Code string
     * @param symbol Symbol Code string
     */
	public addSymbolRequest (exchange : string, symbol : string) : void {
		if (this.priceSubscriptionService.subscribeFor(PriceRequestTypes.Exchange, exchange, symbol)) {
			const req = new PriceRequest;
			req.mt = PriceRequestTypes.SnapshotSymbol;
			req.addParam(exchange, symbol);
			alert(PriceStreamingRequestHandler.getInstance().generateAddRequest(req));
		}
	}

	public removeSymbolRequest (exchange : string, symbol : string) : void {
		if (this.priceSubscriptionService.unSubscribeFor(PriceRequestTypes.Exchange, exchange)) {
			const req = new PriceRequest;
			req.mt = PriceRequestTypes.SnapshotSymbol;
			req.addParam(exchange, symbol);
			alert(PriceStreamingRequestHandler.getInstance().generateRemoveRequest(req));
		}
	}

	/**
     * Subscribe and Un-subscribe for a list of symbol updates.
	 * !!!!! important:	params needs to be sufficient to generate a request.
	 * 					i.e: Symbol array and Exchange arrays should contain corresponsing
	 * 					values ordered way.
     * @param exchange Exchange Code string array
     * @param symbol Symbol Code string array
     */
	public addSymbolListRequest (exchange : string[], symbol : string[]) : void {
		const req = new PriceRequest;
		req.mt = PriceRequestTypes.SnapshotSymbol;

		let i = 0;
		for (const exg of exchange) {
			req.addParam(exg, symbol[i++]);
		}

		alert(PriceStreamingRequestHandler.getInstance().generateAddRequest(req));
	}

	public removeSymbolListRequest (exchange : string[], symbol : string[]) : void {
		const req = new PriceRequest;
		req.mt = PriceRequestTypes.SnapshotSymbol;

		let i = 0;
		for (const exg of exchange) {
			req.addParam(exg, symbol[i++]);
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
