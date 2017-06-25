import { AdviceDataStore } from '../../data-stores/advice-data-store';
import { ChartDataStore } from '../../data-stores/chart-data-store';
import { DepthDataStore } from '../../data-stores/depth-data-store';
import { ExchangeDataStore } from '../../data-stores/exchange-data-store';
import { IndexDataStore } from '../../data-stores/index-data-store';
import { Injectable } from '@angular/core';
import { PriceRequestTypes } from '../../../../app-constants/enums/price-request-types.enum';
import { PriceResponse } from '../price-response';
import { StockDataStore } from '../../data-stores/stock-data-store';
import { StockEntity } from '../../business-entities/stock-entity';
import { StreamRouteService } from '../../../communication/stream-route.service';
import { Subject } from 'rxjs/Rx';
import { TimeAndSalesDataStore } from '../../data-stores/time-and-sales-data-store';

@Injectable()
export class PriceStreamingResponseHandler {

	private priceResponseStream$: Subject<Object>;
	private metaAuthResponseStream$: Subject<any>;
	private priceAuthResponseStream$: Subject<any>;

	constructor(
		private chartDataStore: ChartDataStore,
		private streamRouteService: StreamRouteService,
		private depthDataStore: DepthDataStore,
		private timeAndSalesDataStore: TimeAndSalesDataStore,
		private stockDataStore: StockDataStore,
		private exchangeDataStore: ExchangeDataStore,
		private indexDataStore: IndexDataStore,
		private adviceDataStore: AdviceDataStore,
	) {
		this.priceResponseStream$ = new Subject();
		this.metaAuthResponseStream$ = new Subject();
		this.priceAuthResponseStream$ = new Subject();
		this.updatePriceResponseStream();
	}

	public getPriceResponseStream(): Subject<Object> {
		return this.priceResponseStream$;
	}

	public getMetaAuthResponseStream(): Subject<any> {
		return this.metaAuthResponseStream$;
	}

	public getPriceAuthResponseStream(): Subject<any> {
		return this.priceAuthResponseStream$;
	}

	private updatePriceResponseStream(): void {
		this.streamRouteService.getPriceResponseStream().map(response => {
			return this.processPriceResponseStream(response);
		}).subscribe(response => {
			this.priceResponseStream$.next(response);
			for (const res of response) {
				this.updatePriceModel(res);
			}
		});
	}

	private updatePriceModel(response: any): void {
		switch (parseInt(response.MT, 10)) {
			case PriceRequestTypes.AuthMeta:
				this.metaAuthResponseStream$.next(response);
				break;
			case PriceRequestTypes.AuthPrice:
				this.priceAuthResponseStream$.next(response);
				break;
			case PriceRequestTypes.SnapshotSymbol:
				this.stockDataStore.getOrAddStock([response.exchangeCode, response.symbolCode]).setValues(response);
				break;
			case PriceRequestTypes.TimeAndSalesSymbol:
				this.timeAndSalesDataStore.updateTick(response);
				break;
			case PriceRequestTypes.SymbolMeta:
				for (const symObj of response.SYMS) {
					const stockObj = this.stockDataStore.getOrAddStock([symObj.exchangeCode, symObj.symbolCode]);
					stockObj.setValues(symObj);
					stockObj.isMetaDataLoaded = true;
				}
				break;
			case PriceRequestTypes.PriceHistory:
				this.chartDataStore.updateHistory(response);
				break;
			case PriceRequestTypes.OHLCBacklog:
				this.chartDataStore.updateOHLCHistory(response);
				break;
			case PriceRequestTypes.OHLCSymbol:
				this.chartDataStore.updateOHLC(response);
				break;
			case PriceRequestTypes.ExchangeAndSubmarket:
				this.exchangeDataStore.getOrAddExchange(response.exchangeCode).setValues(response);
				break;
			case PriceRequestTypes.MarketDepthByPrice:
			case PriceRequestTypes.MarketDepthByOrder:
				this.depthDataStore.updateDepthPriceModel(response);
				break;
			case PriceRequestTypes.MarketMeta:
				this.indexDataStore.updateIndexDataStote(response);
				break;
			case PriceRequestTypes.TradingAdvices:
				this.adviceDataStore.updateTradingAdvices(response);
				break;
			default:
				// code here
		}
	}

	private processPriceResponseStream (response: any): any {
		const priceResponse = new PriceResponse();
		const parsedResponse = {
			channel : response.channel,
			data : JSON.parse(response.data),
		};
		const processedResponse = priceResponse.processPriceResponse(parsedResponse);
		return processedResponse;
	}
}
