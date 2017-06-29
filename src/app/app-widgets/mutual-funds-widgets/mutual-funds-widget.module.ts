import { CommonModule } from '@angular/common';
import { ContentDisplayBoxComponent } from '../widget-util/sub-components/content-display-box/content-display-box.component';
import { MutualFundCategoryComponent } from './mutual-fund-category/mutual-fund-category.component';
import { MutualFundPerformanceComponent } from './mutual-fund-performance/mutual-fund-performance.component';
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
	],
})
export class MutualFundsWidgetModule { }
