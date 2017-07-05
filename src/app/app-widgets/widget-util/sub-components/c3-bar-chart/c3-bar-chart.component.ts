import * as c3 from 'c3';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
	selector: 'app-c3-bar-chart-component',
	templateUrl: './c3-bar-chart.component.html',
})
export class C3ChartComponent implements OnChanges {
	@Input() public chartData;
	@Input() public options;

	public ngOnChanges(changes: SimpleChanges): void {
		if (changes['chartData']) {
			this.drawAreaChart();
		}
	}

	private drawAreaChart(): void {
		const options = this.options;

		options.bindto = '#c3Chart';
		options.data.columns = this.chartData;
		options.data.type = 'bar';

		const areaChart = c3.generate(options);
	}
}
