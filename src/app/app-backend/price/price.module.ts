import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PriceService } from './price.service';
import { PriceStreamingResponseHandler } from './protocols/streaming/price-streaming-response-handler';
import { PriceSubscriptionService } from './price-subscription.service';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [],
	providers: [
		PriceService,
		PriceStreamingResponseHandler,
		PriceSubscriptionService
	]
})
export class PriceModule { }
