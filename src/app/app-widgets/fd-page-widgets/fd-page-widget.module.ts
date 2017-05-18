import { CommonModule } from '@angular/common';
import { FdCorporateActionsComponent } from './fd-corporate-actions/fd-corporate-actions.component';
import { FdDetailQuoteComponent } from './fd-detail-quote/fd-detail-quote.component';
import { FdEarningsProgressComponent } from './fd-earnings-progress/fd-earnings-progress.component';
import { FdFinancialStatementsComponent } from './fd-financial-statements/fd-financial-statements.component';
import { FdKeyStatisticsComponent } from './fd-key-statistics/fd-key-statistics.component';
import { FdRatiosMedianComponent } from './fd-ratios-median/fd-ratios-median.component';
import { NgModule } from '@angular/core';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
		FdCorporateActionsComponent,
		FdDetailQuoteComponent,
		FdEarningsProgressComponent,
		FdFinancialStatementsComponent,
		FdKeyStatisticsComponent,
		FdRatiosMedianComponent,
	],
})
export class FdPageWidgetModule { }
