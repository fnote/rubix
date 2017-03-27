import { Channels } from '../../constants/enums/channels.enum';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class StreamRouteService {

	private priceResponseStream$: Subject<Object>;

	constructor(private dataService: DataService) {
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
					console.log('[StreamRouteService] could not find the connection');
			}
		});
	}

	public getPriceResponseStream(): Subject<any> {
		return this.priceResponseStream$;
	}

}
