import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PriceService } from './price.service';
import { PriceSubscriptionService } from './price-subscription.service';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [],
	providers: [
		PriceService,
		PriceSubscriptionService
	]
})
export class PriceModule { }
