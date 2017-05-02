import { ChartComponent } from './chart/chart.component';
import { CommonModule } from '@angular/common';
import { DetailQuoteComponent } from './detail-quote/detail-quote.component';
import { DispBoxComponent } from '../widget-util/sub-components/disp-box/disp-box.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { OrderBookComponent } from './order-book/order-book.component';
import { RangeSliderComponent } from '../widget-util/sub-components/range-slider/range-slider.component';
import { TimeAndSalesComponent } from './time-and-sales/time-and-sales.component';
import { UtilsModule } from '../../app-utils/utils.module';

@NgModule({
	imports: [CommonModule, FormsModule, UtilsModule],
	declarations: [
		DetailQuoteComponent,
		TimeAndSalesComponent,
		ChartComponent,
		OrderBookComponent,
		RangeSliderComponent,
		DispBoxComponent,
	],
})
export class PriceWidgetModule { }
