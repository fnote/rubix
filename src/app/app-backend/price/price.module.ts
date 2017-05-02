import { CommonModule } from '@angular/common';
import { DepthDataStore } from './data-stores/depth-data-store';
import { NgModule } from '@angular/core';
import { PriceService } from './price.service';
import { PriceStreamingResponseHandler } from './protocols/streaming/price-streaming-response-handler';
import { PriceSubscriptionService } from './price-subscription.service';
import { TimeAndSalesDataStore } from './data-stores/time-and-sales-data-store';

@NgModule({
	imports: [CommonModule],
	declarations: [],
	providers: [
		PriceService,
		PriceStreamingResponseHandler,
		PriceSubscriptionService,
		DepthDataStore,
		TimeAndSalesDataStore,
	],
})
export class PriceModule { }
