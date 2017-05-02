import { BaseDataStore } from './data-stores/base-data-store';
import { Channels } from '../../app-constants/enums/channels.enum';
import { DataManagers } from '../../app-constants/enums/data-managers.enum';
import { DataService } from '../communication/data.service';
import { Injectable } from '@angular/core';
import { LocalizationService } from '../../app-utils/localization/localization.service';
import { PriceRequest } from './protocols/price-request';
import { PriceRequestTypes } from '../../app-constants/enums/price-request-types.enum';
import { PriceStreamingRequestHandler } from './protocols/streaming/price-streaming-request-handler';
import { PriceStreamingResponseHandler } from './protocols/streaming/price-streaming-response-handler';
import { PriceSubscriptionService } from './price-subscription.service';
import { StockDataStore } from './data-stores/stock-data-store';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class PriceService {

	constructor(private dataService: DataService, private priceStreamingResponseHandler: PriceStreamingResponseHandler,
		private priceSubscriptionService: PriceSubscriptionService, private localizationService: LocalizationService,
		private stockDataStore: StockDataStore) {}

	/**
	 * Get the price response handler
	 * @returns {Subject<Object>} Response stream
	 */
	public getPriceResponseStream(): Subject<Object> {
		return this.priceStreamingResponseHandler.getPriceResponseStream();
	}

	//
	// API to handle authentication
	//

	// TODO: [Amila] Validate the auth protocols
	/**
	 * Authenticate with username and password
	 * @param {Object} authParams - An object with following properties set
	 * 			channel		: Value Defined at Channels Enum. Mandatory
	 * 			username    : Username. Mandatory.
	 * 			password    : Password. Mandatory.
	 * 			loginIP     : Machine IP
	 * 			appVersion  : Application version
	 * 			lan         : Current Language. Mandatory.
	 * @param {number} channel - Respective Channel from Channel Enum
	*/
	public authenticateWithUsernameAndPassword (authParams: any, channel: Channels): void  {
		const authReqest =  PriceStreamingRequestHandler.getInstance().generateAuthRequest(authParams);
		const request = {
			channel : channel,
			data : authReqest,
		};

		this.dataService.sendToWs(request);
	}

	/**
	* Authenticate with Secondary Auth Token
	* @param {Object} authParams An object with following properties set
	* 			username    : Username. Mandatory.
	* 			password    : Password. Mandatory.
	* 			loginIP     : Machine IP
	* 			appVersion  : Application version
	* 			lan         : Current Language. Mandatory.
	* @param {number} channel - Respective CHannel from Channel Enum
	*/
	public authenticateWithSecondaryAuthToken (authParams: any, channel: number): void  {
		const authRequest =  PriceStreamingRequestHandler.getInstance().generateSecondaryAuthRequest(authParams);
		const request = {
			channel : channel,
			data : authRequest,
		};
		this.dataService.sendToWs(request);
	}

	//
	// API to handle price streaming
	//

	/**
		 * Subscribe and Un-subscribe from exchange updates
		 * @param {string} exchange - Exchange code
		 */
	public addExchangeRequest (exchange: string): void {
		if (this.priceSubscriptionService.subscribeFor(PriceRequestTypes.Exchange, exchange)) {
			const req = new PriceRequest();
			req.mt = PriceRequestTypes.Exchange;
			req.addParam(exchange);

			const request = {
				channel : Channels.Price,
				data : PriceStreamingRequestHandler.getInstance().generateAddRequest(req),
			};
			this.dataService.sendToWs(request);
		}
	}

	public removeExchangeRequest (exchange: string): void {
		if (this.priceSubscriptionService.unSubscribeFor(PriceRequestTypes.Exchange, exchange)) {
			const req = new PriceRequest();
			req.mt = PriceRequestTypes.Exchange;
			req.addParam(exchange);

			const request = {
				channel : Channels.Price,
				data : PriceStreamingRequestHandler.getInstance().generateRemoveRequest(req),
			};
			this.dataService.sendToWs(request);
		}
	}

	public addExchangeListRequest (exchange: string[]): void {
		let isValidItemsAvailable = false;
		const req = new PriceRequest();
		req.mt = PriceRequestTypes.Exchange;

		for (const exg of exchange) {
			if (this.priceSubscriptionService.subscribeFor(PriceRequestTypes.Exchange, exg)) {
				req.addParam(exg);
				isValidItemsAvailable = true;
			}
		}

		if (isValidItemsAvailable) {
			const request = {
				channel : Channels.Price,
				data : PriceStreamingRequestHandler.getInstance().generateAddRequest(req),
			};
			this.dataService.sendToWs(request);
		}
	}

	public removeExchangeListRequest (exchange: string[]): void {
		let isValidItemsAvailable = false;
		const req = new PriceRequest();
		req.mt = PriceRequestTypes.Exchange;

		for (const exg of exchange) {
			if (this.priceSubscriptionService.unSubscribeFor(PriceRequestTypes.Exchange, exg)) {
				req.addParam(exg);
				isValidItemsAvailable = true;
			}
		}

		if (isValidItemsAvailable) {
			const request = {
				channel : Channels.Price,
				data : PriceStreamingRequestHandler.getInstance().generateRemoveRequest(req),
			};
			this.dataService.sendToWs(request);
		}
	}

		/**
		 * Subscribe and Un-subscribe for a symbol updates
		 * @param {[string, string]} exgSym - A tupple with Exchange Code and Symbol Code
		 */
	public addSymbolRequest (exgSym: [string, string]): void {
		if (this.priceSubscriptionService.subscribeFor(PriceRequestTypes.SnapshotSymbol, exgSym[0], exgSym[1])) {
			const req = new PriceRequest();
			req.mt = PriceRequestTypes.SnapshotSymbol;
			req.addParam(exgSym[0], exgSym[1]);

			const request = {
				channel : Channels.Price,
				data : PriceStreamingRequestHandler.getInstance().generateAddRequest(req),
			};
			this.dataService.sendToWs(request);
		}
	}

	public removeSymbolRequest (exgSym: [string, string]): void {
		if (this.priceSubscriptionService.unSubscribeFor(PriceRequestTypes.SnapshotSymbol, exgSym[0], exgSym[1])) {
			const req = new PriceRequest();
			req.mt = PriceRequestTypes.SnapshotSymbol;
			req.addParam(exgSym[0], exgSym[1]);

			const request = {
				channel : Channels.Price,
				data : PriceStreamingRequestHandler.getInstance().generateRemoveRequest(req),
			};
			this.dataService.sendToWs(request);
		}
	}

	public addTimeAndSalesRequest (exgSym: [string, string]): void {
		if (this.priceSubscriptionService.subscribeFor(PriceRequestTypes.TimeAndSalesSymbol, exgSym[0], exgSym[1])) {
			const req = new PriceRequest();
			req.mt = PriceRequestTypes.TimeAndSalesSymbol;
			req.addParam(exgSym[0], exgSym[1]);

			const request = {
				channel : Channels.Price,
				data : PriceStreamingRequestHandler.getInstance().generateAddRequest(req),
			};
			this.dataService.sendToWs(request);
		}
	}

	public removeTimeAndSalesRequest (exgSym: [string, string]): void {
		if (this.priceSubscriptionService.unSubscribeFor(PriceRequestTypes.TimeAndSalesSymbol, exgSym[0], exgSym[1])) {
			const req = new PriceRequest();
			req.mt = PriceRequestTypes.TimeAndSalesSymbol;
			req.addParam(exgSym[0], exgSym[1]);

			const request = {
				channel : Channels.Price,
				data : PriceStreamingRequestHandler.getInstance().generateRemoveRequest(req),
			};
			this.dataService.sendToWs(request);
		}
	}

	public addRealTimeExchangeRequest (exchangeCode: string): void {
		if (this.priceSubscriptionService.subscribeFor(PriceRequestTypes.ExchangeAndSubmarket, exchangeCode)) {
			const req = new PriceRequest();
			req.mt = PriceRequestTypes.ExchangeAndSubmarket;
			req.addParam(exchangeCode);

			const request = {
				channel : Channels.Price,
				data : PriceStreamingRequestHandler.getInstance().generateAddRequest(req),
			};
			this.dataService.sendToWs(request);
		}
	}

	public removeRealTimeExchangeRequest (exchangeCode: string): void {
		if (this.priceSubscriptionService.unSubscribeFor(PriceRequestTypes.ExchangeAndSubmarket, exchangeCode)) {
			const req = new PriceRequest();
			req.mt = PriceRequestTypes.ExchangeAndSubmarket;
			req.addParam(exchangeCode);

			const request = {
				channel : Channels.Price,
				data : PriceStreamingRequestHandler.getInstance().generateRemoveRequest(req),
			};
			this.dataService.sendToWs(request);
		}
	}

	/**
	 * Subscribe and unsubscribe for market depth by price
	 * @param {[string, string]} exgSym - A tuple with Exchange Code and Symbol Code
	 */
	public removeMarketDepthByPriceRequest (exgSym: [string, string]): void {
		if (this.priceSubscriptionService.unSubscribeFor(PriceRequestTypes.MarketDepthByPrice, exgSym[0], exgSym[1])) {
			const req = new PriceRequest();
			req.mt = PriceRequestTypes.MarketDepthByPrice;
			req.addParam(exgSym[0], exgSym[1]);

			const request = {
				channel : Channels.Price,
				data : PriceStreamingRequestHandler.getInstance().generateRemoveRequest(req),
			};
			this.dataService.sendToWs(request);
		}
	}

	public addMarketDepthByPriceRequest (exgSym: [string, string]): void {
		if (this.priceSubscriptionService.subscribeFor(PriceRequestTypes.MarketDepthByPrice, exgSym[0], exgSym[1])) {
			const req = new PriceRequest();
			req.mt = PriceRequestTypes.MarketDepthByPrice;
			req.addParam(exgSym[0], exgSym[1]);

			const request = {
				channel : Channels.Price,
				data : PriceStreamingRequestHandler.getInstance().generateAddRequest(req),
			};
			this.dataService.sendToWs(request);
		}
	}

	public addMarketDepthByOrderRequest (exgSym: [string, string]): void {
		if (this.priceSubscriptionService.subscribeFor(PriceRequestTypes.MarketDepthByOrder, exgSym[0], exgSym[1])) {
			const req = new PriceRequest();
			req.mt = PriceRequestTypes.MarketDepthByOrder;
			req.addParam(exgSym[0], exgSym[1]);

			const request = {
				channel : Channels.Price,
				data : PriceStreamingRequestHandler.getInstance().generateAddRequest(req),
			};
			this.dataService.sendToWs(request);
		}
	}

	public removeMarketDepthByOrderRequest (exgSym: [string, string]): void {
		if (this.priceSubscriptionService.unSubscribeFor(PriceRequestTypes.MarketDepthByOrder, exgSym[0], exgSym[1])) {
			const req = new PriceRequest();
			req.mt = PriceRequestTypes.MarketDepthByOrder;
			req.addParam(exgSym[0], exgSym[1]);

			const request = {
				channel : Channels.Price,
				data : PriceStreamingRequestHandler.getInstance().generateRemoveRequest(req),
			};
			this.dataService.sendToWs(request);
		}
	}
	/**
		 * Subscribe and Un-subscribe for a list of symbol updates.
		 * @param {[string, string][]} exgSym - An array of tupples with Exchange Code and Symbol Code
		 */
	public addSymbolListRequest (exgSym: [string, string][]): void {
		let isValidItemsAvailable = false;
		const req = new PriceRequest();
		req.mt = PriceRequestTypes.SnapshotSymbol;

		for (const sym of exgSym) {
			if (this.priceSubscriptionService.subscribeFor(PriceRequestTypes.SnapshotSymbol, sym[0], sym[1])) {
				req.addParam(sym[0], sym[1]);
				isValidItemsAvailable = true;
			}
		}

		if (isValidItemsAvailable) {
			const request = {
				channel : Channels.Price,
				data : PriceStreamingRequestHandler.getInstance().generateAddRequest(req),
			};
			this.dataService.sendToWs(request);
		}
	}

	public removeSymbolListRequest (exgSym: [string, string][]): void {
		let isValidItemsAvailable = false;
		const req = new PriceRequest();
		req.mt = PriceRequestTypes.SnapshotSymbol;

		for (const sym of exgSym) {
			if (this.priceSubscriptionService.unSubscribeFor(PriceRequestTypes.SnapshotSymbol, sym[0], sym[1])) {
				req.addParam(sym[0], sym[1]);
				isValidItemsAvailable = true;
			}
		}

		if (isValidItemsAvailable) {
			const request = {
				channel : Channels.Price,
				data : PriceStreamingRequestHandler.getInstance().generateRemoveRequest(req),
			};
			this.dataService.sendToWs(request);
		}
	}

	//
	// API to handle price related meta
	//
	public requestSymbolMeta (exgSym: [string, string]): void {
		if (!this.stockDataStore.getOrAddStock(exgSym).isMetaDataLoaded) {
			const req = new PriceRequest();
			req.mt = PriceRequestTypes.SymbolMeta;
			req.tkn = 1;
			req.lan = this.localizationService.getshortCode();
			req.addParam(exgSym[0], exgSym[1]);

			const request = {
				channel : Channels.PriceMeta,
				data : PriceStreamingRequestHandler.getInstance().generateMetaRequest(req),
			};
			this.dataService.sendToWs(request);
		}
	}

	public requestSymbolListMeta (exgSym: [string, string][]): void {
		let isValidItemsAvailable = false;
		const req = new PriceRequest();
		req.mt = PriceRequestTypes.SymbolMeta;
		req.tkn = 1;
		req.lan = this.localizationService.getshortCode();

		for (const sym of exgSym) {
			if (!this.stockDataStore.getOrAddStock(sym).isMetaDataLoaded) {
				req.addParam(sym[0], sym[1]);
				isValidItemsAvailable = true;
			}
		}

		if (isValidItemsAvailable) {
			const request = {
				channel : Channels.PriceMeta,
				data : PriceStreamingRequestHandler.getInstance().generateMetaRequest(req),
			};
			this.dataService.sendToWs(request);
		}
	}
}
