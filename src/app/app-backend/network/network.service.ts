import 'rxjs/add/operator/delay';
import { CacheRequest } from '../cache/cache-request';
import { Channels } from '../../app-constants/enums/channels.enum';
import { DataService } from '../communication/data.service';
import { Injectable } from '@angular/core';
import { LoggerService } from '../../app-utils/logger.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NetworkService {
	constructor(private data: DataService, private logger: LoggerService) {
	}
	public get(cacheReq: CacheRequest): any {
	/*	const DELAY = 500;
		return new Observable((observer: any): any => {
						if (key === 'cash_accountOne') {
			 observer.next(new CashAccount({ SEC_ACC_NUM: '10000_network', CASH_ACC_NUM: 'u10000_network' }));
			 } else if (key === 'cash_accountTwo') {
			 observer.next(new CashAccount({ SEC_ACC_NUM: '20000_network', CASH_ACC_NUM: 'u20000_network' }));
			 }
			 else if (key === 'cash_accountThree') {
			 observer.next(new CashAccount({ SEC_ACC_NUM: '30000_network', CASH_ACC_NUM: 'u30000_network' }));
			 }
			 else {
			 observer.next(new CashAccount({ SEC_ACC_NUM: '40000_network', CASH_ACC_NUM: 'u40000_network' }));
			 }
		})
			.delay(DELAY);*/
		/*this.data.sendToWs({channel: cacheReq.channel, data: cacheReq.data});
			if(cacheReq.channel === Channels.Price){
				return this.price.getPriceResponseStream()
					.filter((response : {MT: string}) => {
						return response.MT === cacheReq.name;
					});
			}*/
	}
}
