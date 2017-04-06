import { CommonModule } from '@angular/common';
import { DetailQuoteComponent } from './detail-quote/detail-quote.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TimeAndSalesComponent } from './time-and-sales/time-and-sales.component';

@NgModule({
	imports: [CommonModule, FormsModule],
	declarations: [
		DetailQuoteComponent,
		TimeAndSalesComponent,
	],
})
export class PriceWidgetModule { }
