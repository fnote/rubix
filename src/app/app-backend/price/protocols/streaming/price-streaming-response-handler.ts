import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { StreamRouteService } from '../../../communication/stream-route.service';

@Injectable()

export class PriceStreamingResponseHandler {

		private priceResponseStream$ : Subject<Object>;

		constructor(private streamRouteService : StreamRouteService) {
				this.priceResponseStream$ = new Subject();
				this.updatePriceResponseStream();
		}

		private updatePriceResponseStream() : void {
				this.streamRouteService.getPriceResponseStream().map(response => {
						return this.processPriceResponseStream(response);
				}).subscribe(response => {
						console.log('[PriceStreamingResponseHandler]' + response );
						this.priceResponseStream$.next(response);
				});
		}

		private processPriceResponseStream (response : any) : any {
				return JSON.parse(response);
		}

		public getPriceResponseStream() : Subject<Object> {
				return this.priceResponseStream$;
		}
}
