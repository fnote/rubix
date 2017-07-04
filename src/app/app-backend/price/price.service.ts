import { BaseDataStore } from './data-stores/base-data-store';
import { CacheService } from '../cache/cache.service';
import { Channels } from '../../app-constants/enums/channels.enum';
import { ChartDataStore } from './data-stores/chart-data-store';
import { ConfigService } from '../../app-config/config.service';
import { DataManagers } from '../../app-constants/enums/data-managers.enum';
import { DataService } from '../communication/data.service';
import { Injectable } from '@angular/core';
import { LocalizationService } from '../../app-utils/localization/localization.service';
import { PriceRequest } from './protocols/price-request';
import { PriceRequestTypes } from '../../app-constants/enums/price-request-types.enum';
import { PriceStreamingRequestHandler } from './protocols/streaming/price-streaming-request-handler';
import { PriceStreamingResponseHandler } from './protocols/streaming/price-streaming-response-handler';
import { PriceSubscriptionService } from './price-subscription.service';
import { RequestMethod } from '@angular/http';
import { StockDataStore } from './data-stores/stock-data-store';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class PriceService {

	constructor(
		private cache: CacheService,
		private chartDataStore: ChartDataStore,
		private configService: ConfigService,
		private dataService: DataService,
		private priceStreamingResponseHandler: PriceStreamingResponseHandler,
		private priceSubscriptionService: PriceSubscriptionService,
		private localizationService: LocalizationService,
		private stockDataStore: StockDataStore,
	) {}

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
			req.MT = PriceRequestTypes.Exchange;
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
			req.MT = PriceRequestTypes.Exchange;
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
		req.MT = PriceRequestTypes.Exchange;

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
		req.MT = PriceRequestTypes.Exchange;

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
			req.MT = PriceRequestTypes.SnapshotSymbol;
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
			req.MT = PriceRequestTypes.SnapshotSymbol;
			req.addParam(exgSym[0], exgSym[1]);

			const request = {
				channel : Channels.Price,
				data : PriceStreamingRequestHandler.getInstance().generateRemoveRequest(req),
			};
			this.dataService.sendToWs(request);
		}
	}

	public addChartHistoryRequest (exgSym: [string, string]): void {
		this.chartDataStore.getHistory(exgSym).subscribe(history => {
			if (history.length === 0) {
				const key: string = exgSym[0] + '~' + exgSym[1];
				const req = new PriceRequest();
				req.MT = PriceRequestTypes.PriceHistory;
				req.TKN = key;
				req.SYM = [key];
				req.addParam(exgSym[0], exgSym[1]);

				const request = {
					channel : Channels.PriceMeta,
					data : PriceStreamingRequestHandler.getInstance().generateMetaRequest(req),
				};
				this.dataService.sendToWs(request);
			}
		});
	}

	public addChartOHLCBacklogRequest (exgSym: [string, string]): void {
		const key: string = exgSym[0] + '~' + exgSym[1];
		const req = new PriceRequest();
		req.MT = PriceRequestTypes.OHLCBacklog;
		req.TKN = key;
		req.TYP = 1;
		req.SYM = [key];
		req.addParam(exgSym[0], exgSym[1]);

		const request = {
			channel : Channels.PriceMeta,
			data : PriceStreamingRequestHandler.getInstance().generateMetaRequest(req),
		};
		this.dataService.sendToWs(request);

		this.addChartOHLCRequest(exgSym);

	}

	public removeChartOHLCRequest (exgSym: [string, string]): void {
		if (this.priceSubscriptionService.unSubscribeFor(PriceRequestTypes.OHLCSymbol, exgSym[0], exgSym[1])) {
			const req = new PriceRequest();
			req.MT = PriceRequestTypes.OHLCSymbol;
			req.addParam(exgSym[0], exgSym[1]);

			const request = {
				channel : Channels.Price,
				data : PriceStreamingRequestHandler.getInstance().generateRemoveRequest(req),
			};
			this.dataService.sendToWs(request);
		}
	}

	public addChartOHLCRequest (exgSym: [string, string]): void {
		if (this.priceSubscriptionService.subscribeFor(PriceRequestTypes.OHLCSymbol, exgSym[0], exgSym[1])) {
			const key: string = exgSym[0] + '~' + exgSym[1];
			const req = new PriceRequest();
			req.MT = PriceRequestTypes.OHLCSymbol;
			req.TKN = key;
			req.SYM = [key];
			req.addParam(exgSym[0], exgSym[1]);

			const request = {
				channel: Channels.Price,
				data: PriceStreamingRequestHandler.getInstance().generateAddRequest(req),
			};
			this.dataService.sendToWs(request);
		}
	}

	public addRealTimeAdviceRequest(apm: Object, exgList: Array<string>): void {
		const subExgList = [];
		for (const exg of exgList) {
			if (this.priceSubscriptionService.subscribeFor(PriceRequestTypes.TradingAdvices, exg)) {
				subExgList.push(exg);
			}
		}
		if (subExgList.length > 0) {
			const req = new PriceRequest();
			req.MT = PriceRequestTypes.TradingAdvices;
			req.LAN = this.localizationService.getshortCode();
			req.APM = apm;
			req.SYM = subExgList;
			const request = {
				channel : Channels.Price,
				data : PriceStreamingRequestHandler.getInstance().generateAddRequest(req),
			};
			this.dataService.sendToWs(request);
		}
	}

	public removeRealTimeAdviceRequest(apm: Object, exgList: Array<string>): void {
		const unsubExgList = [];
		for (const exg of exgList) {
			if (this.priceSubscriptionService.unSubscribeFor(PriceRequestTypes.TradingAdvices, exg)) {
				unsubExgList.push(exg);
			}
		}
		if (unsubExgList.length > 0) {
			const req = new PriceRequest();
			req.MT = PriceRequestTypes.TradingAdvices;
			req.LAN = this.localizationService.getshortCode();
			req.APM = apm;
			req.SYM = unsubExgList;
			const request = {
				channel : Channels.Price,
				data : PriceStreamingRequestHandler.getInstance().generateRemoveRequest(req),
			};
			this.dataService.sendToWs(request);
		}
	}

	public addBacklogRTARequest(requestParms: {exg: string[],
		apm?: Object,
		pgi: number,
		pgs: number}): void {
		const req = new PriceRequest();
		req.MT = PriceRequestTypes.TradingAdvices;
		req.LAN = this.localizationService.getshortCode();
		req.EXG = requestParms.exg;
		req.APM = requestParms.apm;
		req.PGI = requestParms.pgi;
		req.PGS = requestParms.pgs;

		const request = {
			channel : Channels.PriceMeta,
			data : PriceStreamingRequestHandler.getInstance().generateAddRequest(req),
		};
		this.dataService.sendToWs(request);
	}

	public addMutualFundRequest(segments: Array<string>, exchanges: Array<string>, providers: Array<string>): void {
		const req = new PriceRequest();
		req.MT = PriceRequestTypes.MutualFund;
		req.LAN = this.localizationService.getshortCode();
		req.SEG = segments;
		req.EXG = exchanges;
		req.PRV = providers;
		const request = {
			channel : Channels.PriceMeta,
			data : PriceStreamingRequestHandler.getInstance().generateAddRequest(req),
		};
		this.dataService.sendToWs(request);
	}

	public addMutualFundDetailsRequest(segments: Array<string>, symbol: Array<string>): void {
		const req = new PriceRequest();
		req.MT = PriceRequestTypes.MutualFundDS;
		req.LAN = this.localizationService.getshortCode();
		req.SEG = segments;
		req.SYM = symbol;
		const request = {
			channel : Channels.PriceMeta,
			data : req,
			req_gen : PriceStreamingRequestHandler.getInstance().generateAddRequest,
		};
		this.cache.get(this.cache.generateGetRequest(request));
		// this.dataService.sendToWs(request);

	}

	public addTimeAndSalesRequest (exgSym: [string, string]): void {
		if (this.priceSubscriptionService.subscribeFor(PriceRequestTypes.TimeAndSalesSymbol, exgSym[0], exgSym[1])) {
			const req = new PriceRequest();
			req.MT = PriceRequestTypes.TimeAndSalesSymbol;
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
			req.MT = PriceRequestTypes.TimeAndSalesSymbol;
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
			req.MT = PriceRequestTypes.ExchangeAndSubmarket;
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
			req.MT = PriceRequestTypes.ExchangeAndSubmarket;
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
			req.MT = PriceRequestTypes.MarketDepthByPrice;
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
			req.MT = PriceRequestTypes.MarketDepthByPrice;
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
			req.MT = PriceRequestTypes.MarketDepthByOrder;
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
			req.MT = PriceRequestTypes.MarketDepthByOrder;
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
		req.MT = PriceRequestTypes.SnapshotSymbol;

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

	public addIndexList (exgs: string[], segs: string[]): void {
		let isValidItemsAvailable = false;
		const req = new PriceRequest();

		for (const exg of exgs) {
			if (this.priceSubscriptionService.subscribeFor(PriceRequestTypes.MarketMeta, exg)) {
				req.MT = PriceRequestTypes.MarketMeta;
				req.EXG = exgs;
				req.SEG = segs;
				req.TKN = '1';
				req.LAN = this.localizationService.getshortCode();
				isValidItemsAvailable = true;
			}
		}

		if (isValidItemsAvailable) {
			const request = {
				channel : Channels.PriceMeta,
				data : req,
				req_gen : PriceStreamingRequestHandler.getInstance().generateAddRequest,
			};
			// this.dataService.sendToWs(request);
			this.cache.get(this.cache.generateGetRequest(request));
		}
	}

	public addIndexListAjax (exgs: string[], segs: string[], sessionID: string): void {
		this.configService.getStringConfigVal('connectionConfig', 'price', 'ajax_url').then(url => {
			const req = new PriceRequest();
			req.MT = PriceRequestTypes.MarketMeta;
			req.EXG = exgs;
			req.SEG = segs;
			req.TKN = '1';
			req.LAN = this.localizationService.getshortCode();
			const reqURL = PriceStreamingRequestHandler.getInstance().generateAddAjaxRequest(url, sessionID, req);
			const request = {
				url: reqURL,
				method: RequestMethod.Get,
			};
			this.dataService.sendAjaxRequest(request);
		});
	}

	public removeSymbolListRequest (exgSym: [string, string][]): void {
		let isValidItemsAvailable = false;
		const req = new PriceRequest();
		req.MT = PriceRequestTypes.SnapshotSymbol;

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
			req.MT = PriceRequestTypes.SymbolMeta;
			req.LAN = this.localizationService.getshortCode();
			req.addParam(exgSym[0], exgSym[1]);

			const request = {
				channel : Channels.PriceMeta,
				data : req,
				req_gen: PriceStreamingRequestHandler.getInstance().generateMetaRequest,
			};
			// this.dataService.sendToWs(request);
			this.cache.get(this.cache.generateGetRequest(request));
		}
	}

	public requestSymbolListMeta (exgSym: [string, string][]): void {
		let isValidItemsAvailable = false;
		const req = new PriceRequest();
		req.MT = PriceRequestTypes.SymbolMeta;
		req.TKN = '1';
		req.LAN = this.localizationService.getshortCode();

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

	public requestSysMeta(): void {
		const req = new PriceRequest();
		req.MT = PriceRequestTypes.MarketMeta;
		req.TKN = '1';
		req.LAN = this.localizationService.getshortCode();
		req.SEG = ['NPD', 'CAT', 'CNT', 'TZD', 'GMS', 'RD', 'DCAT', 'DSCAT', 'DCSCM', 'DCSCM', 'AST', 'INS', 'GICSL2', 'NEWSEDIT', 'DCAT'];

		const request = {
			channel: Channels.PriceMeta,
			data: PriceStreamingRequestHandler.getInstance().generateMetaRequest(req),
		};
		this.dataService.sendToWs(request);

	}

}
