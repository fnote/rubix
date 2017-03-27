import { Injectable } from '@angular/core';
import { PriceResponse } from '../price-response';
import { StreamRouteService } from '../../../communication/stream-route.service';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class PriceStreamingResponseHandler {

	private priceResponseStream$: Subject<Object>;

	constructor(private streamRouteService: StreamRouteService) {
		this.priceResponseStream$ = new Subject();
		this.updatePriceResponseStream();
	}

	private updatePriceResponseStream(): void {
		this.streamRouteService.getPriceResponseStream().map(response => {
			return this.processPriceResponseStream(response);
		}).subscribe(response => {
			console.log('[PriceStreamingResponseHandler]' + response);
			this.priceResponseStream$.next(response);
		});
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
