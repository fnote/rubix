import * as c3 from 'c3';
import { Component , OnInit } from '@angular/core';

@Component({
	selector: 'app-c3-chart-component',
	templateUrl: './c3-chart.component.html',
})
export class C3ChartComponent implements OnInit {

	public ngOnInit(): void {
		this.drawAreaChart();
	}

	// tslint:disable-next-line:typedef
	private drawAreaChart() {
		const areaChart = c3.generate({
			bindto: '#areaChart',
			data: {
				columns: [
					// tslint:disable-next-line:indent
					// tslint:disable-next-line:no-magic-numbers
					['data1', 0, 10, 15, 20, 25, 30, 90, 100, 400, 150, 250, 100, 80, 40, 20, 0],
				],
				types: {
					data1: 'area',
				},
				colors: {
					data1: '#648afd',
				},
			},
			axis: {
				x: { show: false },
				y: { show: false },
			},
			point: {
				show: false,
			},

		});
	}
}
