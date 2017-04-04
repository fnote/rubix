import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PriceAuthHandler } from './price/price-auth-handler';
import { TradeAuthHandler } from './trade/trade-auth-handler';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [],
	providers: [
		AuthService,
		PriceAuthHandler,
		TradeAuthHandler,
	],
})
export class AuthModule { }
