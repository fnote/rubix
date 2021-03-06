import { BasicTableComponent } from '../widget-util/sub-components/basic-table/basic-table.component';
import { C3ChartComponent } from '../widget-util/sub-components/c3-bar-chart/c3-bar-chart.component';
import { ChartComponent } from './chart/chart.component';
import { ChartModule } from 'angular2-highcharts';
import { CommonModule } from '@angular/common';
import { DetailQuoteComponent } from './detail-quote/detail-quote.component';
import { DispBoxComponent } from '../widget-util/sub-components/disp-box/disp-box.component';
import { FormsModule } from '@angular/forms';
import { MapSelectorComponent } from './map-selector/map-selector.component';
import { MiniChartComponent } from './mini-chart/mini-chart.component';
import { NewsAnnouncementsCombinedListComponent } from './news-announcements-combined-list/news-announcements-combined-list.component';
import { NgModule } from '@angular/core';
import { OrderBookChartWrapperComponent } from './order-book/order-book-chart-wrapper.component';
import { OrderBookComponent } from './order-book/order-book.component';
import { RangeSliderComponent } from '../widget-util/sub-components/range-slider/range-slider.component';
import { RealTimeAdviceComponent } from './real-time-advice/real-time-advice.component';
import { TimeAndSalesComponent } from './time-and-sales/time-and-sales.component';
import { UtilsModule } from '../../app-utils/utils.module';

@NgModule({
	imports: [CommonModule, FormsModule, UtilsModule,
		ChartModule,
	],
	declarations: [
		DetailQuoteComponent,
		TimeAndSalesComponent,
		ChartComponent,
		OrderBookComponent,
		OrderBookChartWrapperComponent,
		RangeSliderComponent,
		DispBoxComponent,
		C3ChartComponent,
		NewsAnnouncementsCombinedListComponent,
		MiniChartComponent,
		MapSelectorComponent,
		RealTimeAdviceComponent,
		BasicTableComponent,
	],
})
export class PriceWidgetModule { }
