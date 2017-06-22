import { AdviceDataStore } from './data-stores/advice-data-store';
import { ChartDataStore } from './data-stores/chart-data-store';
import { CommonModule } from '@angular/common';
import { DepthDataStore } from './data-stores/depth-data-store';
import { ExchangeDataStore } from './data-stores/exchange-data-store';
import { IndexDataStore } from './data-stores/index-data-store';
import { NgModule } from '@angular/core';
import { PriceService } from './price.service';
import { PriceStreamingResponseHandler } from './protocols/streaming/price-streaming-response-handler';
import { PriceSubscriptionService } from './price-subscription.service';
import { StockDataStore } from './data-stores/stock-data-store';
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
		StockDataStore,
		IndexDataStore,
		ExchangeDataStore,
		ChartDataStore,
		AdviceDataStore,
	],
})
export class PriceModule { }
