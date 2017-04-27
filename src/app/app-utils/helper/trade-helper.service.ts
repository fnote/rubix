import { Injectable } from '@angular/core';

@Injectable()
export class TradeHelperService {

	// TODO: [Malindu] Complete this
	/**
	* Return price ratio
	* @param value Input value
	* @param isExg Is exchange
	*/
	public getPriceRatios(value: number , isExg: boolean): number {
		const rate = 1;

		return rate;
	}
}
