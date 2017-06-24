import { CommonModule } from '@angular/common';
import { MutualFundCategoryComponent } from './mutual-fund-category/mutual-fund-category.component';
import { MutualFundPerformanceComponent } from './mutual-fund-performance/mutual-fund-performance.component';
import { NgModule } from '@angular/core';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
		MutualFundCategoryComponent,
		MutualFundPerformanceComponent,
	],
})
export class MutualFundsWidgetModule { }
