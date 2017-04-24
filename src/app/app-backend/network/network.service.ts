import 'rxjs/add/operator/delay';
import { Injectable } from '@angular/core';
import { NetworkController } from '../cache/interfaces/network-controller';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NetworkService implements NetworkController {
	public get(key: string): any {
		const DELAY = 500;
		return new Observable((observer: any): any => {
			/*			if (key === 'cash_accountOne') {
			 observer.next(new CashAccount({ SEC_ACC_NUM: '10000_network', CASH_ACC_NUM: 'u10000_network' }));
			 } else if (key === 'cash_accountTwo') {
			 observer.next(new CashAccount({ SEC_ACC_NUM: '20000_network', CASH_ACC_NUM: 'u20000_network' }));
			 }
			 else if (key === 'cash_accountThree') {
			 observer.next(new CashAccount({ SEC_ACC_NUM: '30000_network', CASH_ACC_NUM: 'u30000_network' }));
			 }
			 else {
			 observer.next(new CashAccount({ SEC_ACC_NUM: '40000_network', CASH_ACC_NUM: 'u40000_network' }));
			 }*/
		})
			.delay(DELAY);
	}
}
