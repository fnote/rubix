import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { DataService } from './communication/data.service';
import { Channels } from '../constants/enums/channels.enum';

@Injectable()
export class StreamRouteService {

	private priceResponseStream$ : Subject<Object>;

	constructor(private dataService : DataService) {
		this.priceResponseStream$ = new Subject();
		this.routeResponseStream();
	}

	private routeResponseStream() : void {
		this.dataService.getResponseSteam().subscribe(response => {
			switch (response.connection) {
				case Channels.Price:
					this.priceResponseStream$.next(response.data);
					break;
				default :
					console.log('[StreamRouteService] could not find the connection');
			}
		});
	}

	public getPriceResponseStream() : Subject<any> {
		return this.priceResponseStream$;
	}

}
