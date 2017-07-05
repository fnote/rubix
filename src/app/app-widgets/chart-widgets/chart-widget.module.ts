import { BaseC3ChartComponent } from '../chart-widgets/c3-chart/base/base-c3-chart.component';
import { C3LineChartComponent } from '../widget-util/sub-components/c3-bar-chart/c3-line-chart.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
	imports: [CommonModule],
	declarations: [BaseC3ChartComponent, C3LineChartComponent],
})
export class ChartWidgetModule { }
