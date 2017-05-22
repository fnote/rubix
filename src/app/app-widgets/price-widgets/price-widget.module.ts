import { C3ChartComponent } from '../widget-util/sub-components/depth-bar-chart/depth-bar-chart.component';
import { ChartModule } from 'angular2-highcharts';
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
import { MapSelectorComponent } from './map-selector/map-selector.component';

export declare let require: any;

import { NewsAnnouncementsCombinedListComponent } from './news-announcements-combined-list/news-announcements-combined-list.component';
import { MiniChartComponent } from './mini-chart/mini-chart.component';

@NgModule({
	imports: [CommonModule, FormsModule, UtilsModule,

		ChartModule.forRoot(require('highcharts'))
	],
	declarations: [
		DetailQuoteComponent,
		TimeAndSalesComponent,
		ChartComponent,
		OrderBookComponent,
		RangeSliderComponent,
		DispBoxComponent,
		C3ChartComponent,
		NewsAnnouncementsCombinedListComponent,
		MiniChartComponent,
		MapSelectorComponent,

	],
})
export class PriceWidgetModule { }
