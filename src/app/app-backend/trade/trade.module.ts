import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TradeService } from './trade.service';
import { TradeStreamingResponseHandler } from './protocols/streaming/trade-streaming-response-handler';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [],
	providers: [
		TradeService,
		TradeStreamingResponseHandler,
	],

	//providers are services 
})
export class TradeModule { }
