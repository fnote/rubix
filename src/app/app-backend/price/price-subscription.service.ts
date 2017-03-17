import { Injectable } from '@angular/core';
import { PriceRequestTypes } from '../../constants/enums/price-request-types.enum';

@Injectable()
export class PriceSubscriptionService {

	constructor() { }

	public subscribeFor(messageType : PriceRequestTypes, exchange : string, symbol? : string) : boolean {
		return true;
	}

	public unSubscribeFor(messageType : PriceRequestTypes, exchange : string, symbol? : string) : boolean {
		return true;
	}
}
