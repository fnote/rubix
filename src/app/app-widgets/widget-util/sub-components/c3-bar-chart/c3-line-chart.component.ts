import * as c3 from 'c3';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
	selector: 'app-c3-line-chart-component',
	templateUrl: './c3-line-chart.component.html',
})
export class C3LineChartComponent implements OnChanges {
	@Input() public initialChartData;
	@Input() public chartAppendData;
	@Input() public options;

	public chartId = 'chart' + Math.ceil(Math.random() * 100);
	private chart;

	public ngOnChanges(changes: SimpleChanges): void {
		if (changes['initialChartData']) {
			if (this.initialChartData && this.initialChartData[0]) {
				this.drawChart();
			}
		}

		if (changes['chartAppendData']) {
			if (this.chartAppendData) {
				this.appendChart();
			}
		}
	}

	private drawChart(): void {
		const options = this.options;

		options.bindto = '#' + this.chartId;
		options.data.columns = this.initialChartData;
		options.data.type = 'line';

		this.chart = c3.generate(options);
	}

	private appendChart(): void {
		this.chart.flow({
			columns: this.chartAppendData,
		});
	}
}
