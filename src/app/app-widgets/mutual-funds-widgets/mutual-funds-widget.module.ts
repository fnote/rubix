import { CommonModule } from '@angular/common';
import { ContentDisplayBoxComponent } from '../widget-util/sub-components/content-display-box/content-display-box.component';
import { MutualFundBenchmarkComponent } from './mutual-fund-benchmark/mutual-fund-benchmark.component';
import { MutualFundCategoryComponent } from './mutual-fund-category/mutual-fund-category.component';
import { MutualFundDetailHeaderComponent } from './mutual-fund-detail-header/mutual-fund-detail-header.component';
import { MutualFundDetailLayoutComponent } from './mutual-fund-detail-layout/mutual-fund-detail-layout.component';
import { MutualFundDetailPerformanceComponent } from './mutual-fund-detail-performance/mutual-fund-detail-performance.component';
import { MutualFundOverviewComponent } from './mutual-fund-overview/mutual-fund-overview.component';
import { MutualFundPerformanceComponent } from './mutual-fund-performance/mutual-fund-performance.component';
import { MutualFundReportComponent } from './mutual-fund-report/mutual-fund-report.component';
import { NgModule } from '@angular/core';
import { UtilsModule } from '../../app-utils/utils.module';

@NgModule({
	imports: [
		CommonModule,
		UtilsModule,
	],
	declarations: [
		MutualFundCategoryComponent,
		MutualFundPerformanceComponent,
		ContentDisplayBoxComponent,
		MutualFundBenchmarkComponent,
		MutualFundReportComponent,
		MutualFundOverviewComponent,
		MutualFundDetailLayoutComponent,
		MutualFundDetailHeaderComponent,
		MutualFundDetailPerformanceComponent,
	],
})
export class MutualFundsWidgetModule { }
