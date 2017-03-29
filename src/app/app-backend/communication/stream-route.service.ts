import { Channels } from '../../constants/enums/channels.enum';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { LoggerService } from '../../utils/logger.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class StreamRouteService {

	private priceResponseStream$: Subject<Object>;

	constructor(private dataService: DataService, private loggerService: LoggerService) {
		this.priceResponseStream$ = new Subject();
		this.routeResponseStream();
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
				default :
					this.loggerService.logInfo('could not find the connection', 'StreamRouteService');
			}
		});
	}

	public getPriceResponseStream(): Subject<any> {
		return this.priceResponseStream$;
	}

}
