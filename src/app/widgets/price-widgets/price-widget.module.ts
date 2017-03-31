import { CommonModule } from '@angular/common';
import { DetailQuoteComponent } from './detail-quote/detail-quote.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

@NgModule({
	imports: [CommonModule, FormsModule],
	declarations: [
		DetailQuoteComponent,
	],
})
export class PriceWidgetModule { }
