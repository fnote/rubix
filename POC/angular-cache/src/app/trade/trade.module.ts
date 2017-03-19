import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TradeService } from './trade.service';
import { CacheModule } from '../cache/cache.module';

@NgModule({
	imports : [
		CommonModule,
		CacheModule
	],
	declarations : [],
	providers : [TradeService]
})
export class TradeModule {
}
