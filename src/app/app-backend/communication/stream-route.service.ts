import { Channels } from '../../app-constants/enums/channels.enum';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { LoggerService } from '../../app-utils/logger.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class StreamRouteService { //routes 2 types of responses 

	private priceResponseStream$: Subject<Object>;
	private tradeResponseStream$: Subject<Object>;

	constructor(private dataService: DataService, private loggerService: LoggerService) {
		this.priceResponseStream$ = new Subject();
		this.tradeResponseStream$ = new Subject();
		this.routeResponseStream();
		this.routeAjaxResponseStream();
	}

	public getPriceResponseStream(): Subject<any> {
		return this.priceResponseStream$;
	}

	public getTradeResponseStream(): Subject<any> {
		return this.tradeResponseStream$;
	}

	private routeResponseStream(): void {
		this.dataService.getResponseSteam().subscribe(response => {
			switch (response.connection) {
				case Channels.Price :
					this.priceResponseStream$.next({ data : response.data , channel : Channels.Price });
					break;
				case Channels.PriceMeta :
					this.priceResponseStream$.next({ data : response.data , channel : Channels.PriceMeta });
					break;
				case Channels.Trade :
					this.tradeResponseStream$.next({ data : response.data , channel : Channels.Trade });
					break;
				default :
					this.loggerService.logError('Invalid Channel Found...!', 'StreamRouteService');
			}
		});
	}

	private routeAjaxResponseStream(): void {
		this.dataService.getAjaxResponseSteam().subscribe(response => {
			this.priceResponseStream$.next({ data : response.data , channel : Channels.PriceMeta });
		});
	}
}
