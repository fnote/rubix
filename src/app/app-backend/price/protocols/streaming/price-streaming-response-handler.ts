import { Injectable } from '@angular/core';
import { PriceRequestTypes } from '../../../../constants/enums/price-request-types.enum';
import { PriceResponse } from '../price-response';
import { StockDataStore } from '../../data-stores/stock-data-store';
import { StreamRouteService } from '../../../communication/stream-route.service';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class PriceStreamingResponseHandler {

	private priceResponseStream$: Subject<Object>;
	private stockDataStore: StockDataStore;

	constructor(private streamRouteService: StreamRouteService) {
		this.priceResponseStream$ = new Subject();
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
			case PriceRequestTypes.SnapshotSymbol :
				this.stockDataStore.setStock(response);
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
}
