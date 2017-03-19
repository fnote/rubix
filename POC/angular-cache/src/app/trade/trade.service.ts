import { Injectable } from '@angular/core';
import { CacheService } from '../cache/cache.service';
import { CashAccount } from '../models/cash-account';

@Injectable()
export class TradeService {
	constructor(private cache : CacheService) {
	}

	public insertCashAccount() : void {
		const DELAY = 3000;

		this.cache.clear();

		this.cache.put('cash_account', new CashAccount({SEC_ACC_NUM : '10000', CASH_ACC_NUM : 'u10000'}));
		this.cache.put('cash_account2', new CashAccount({SEC_ACC_NUM : '20000', CASH_ACC_NUM : 'u20000'}));
		this.cache.put('cash_account3', new CashAccount({SEC_ACC_NUM : '30000', CASH_ACC_NUM : 'u30000'}));
		this.cache.put('cash_account4', new CashAccount({SEC_ACC_NUM : '40000', CASH_ACC_NUM : 'u40000'}));

		setTimeout(() => {
			/* tslint:disable */
			this.cache.get('cash_account').subscribe(x => {
				console.info(x);
			});
			this.cache.get('cash_account2').subscribe(x => {
				console.info(x);
			});
			this.cache.get('cash_account3').subscribe(x => {
				console.info(x);
			});
			this.cache.get('cash_account4').subscribe(x => {
				console.info(x);
			});

		/* tslint:enable */
		}, DELAY);
	}

	public getBuyingPower(secAccNo : string) : CashAccount[] {
		const value : CashAccount[] = null;
		const result = this.cache.search(secAccNo).subscribe(
			x => {
				value.push(new CashAccount(x));
			},
			e => {
				console.error('couldn\'t get value from cache');
			},
			() => {
			}
		);
		return value;
	}

	public getCashAccount(cashAccNo : string) : CashAccount {
		let value : CashAccount = null;
		const result = this.cache.get(cashAccNo).subscribe(
			x => {
				value = new CashAccount(x);
			},
			e => {
				console.error('couldn\'t get value from cache');
			},
			() => {
			}
		);
		return value;
	}
}
