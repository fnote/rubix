import { Injectable } from '@angular/core';
import { PriceRequestTypes } from '../../../../constants/enums/price-request-types.enum';
import { PriceResponse } from '../price-response';
import { StockDataStore } from '../../data-stores/stock-data-store';
import { StockEntity } from '../../business-entities/stock-entity';
import { StreamRouteService } from '../../../communication/stream-route.service';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class PriceStreamingResponseHandler {

	private priceResponseStream$: Subject<Object>;
	private metaAuthResponseStream$: Subject<any>;
	private priceAuthResponseStream$: Subject<any>;
	private stockDataStore: StockDataStore;

	constructor(private streamRouteService: StreamRouteService) {
		this.priceResponseStream$ = new Subject();
		this.metaAuthResponseStream$ = new Subject();
		this.priceAuthResponseStream$ = new Subject();
		this.stockDataStore = StockDataStore.getInstance();
		this.updatePriceResponseStream();
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
		switch (response.MT) {
			case PriceRequestTypes.AuthMeta:
				this.metaAuthResponseStream$.next(response);
				break;
			case PriceRequestTypes.AuthPrice:
				this.priceAuthResponseStream$.next(response);
				break;
			case PriceRequestTypes.SnapshotSymbol:
				this.stockDataStore.getOrAddStock([response.exchangeCode, response.symbolCode]).setValues(response);
				break;

			case PriceRequestTypes.SymbolMeta:
				for (const symObj of response.SYMS) {
					const stockObj = this.stockDataStore.getOrAddStock([symObj.exchangeCode, symObj.symbolCode]);
					stockObj.setValues(symObj);
					stockObj.isMetaDataLoaded = true;
				}
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

	public getPriceResponseStream(): Subject<Object> {
		return this.priceResponseStream$;
	}

	public getMetaAuthResponseStream(): Subject<any> {
		return this.metaAuthResponseStream$;
	}

	public getPriceAuthResponseStream(): Subject<any> {
		return this.priceAuthResponseStream$;
	}
}
