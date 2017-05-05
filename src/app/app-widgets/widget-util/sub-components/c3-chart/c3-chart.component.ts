import * as c3 from 'c3';
import { Component , OnInit } from '@angular/core';

@Component({
	selector: 'app-c3-chart-component',
	templateUrl: './c3-chart.component.html',
})
export class C3ChartComponent implements OnInit {

	public ngOnInit(): void {
		this.drawLineChart();
	}

	// tslint:disable-next-line:typedef
	private drawLineChart() {
		const lineChart = c3.generate({
			bindto: '#lineChart',
			data: {
				columns: [
					// tslint:disable-next-line:indent
					// tslint:disable-next-line:no-magic-numbers
					['data1', 30, 200, 100, 400, 150, 250],
				],
				colors: {
					data1: '#80bfff',
				},
			},
			axis: {
				y: { show: false },
			},

		});
		// tslint:disable-next-line:typedef
		setTimeout(function () {
			lineChart.load({
				columns: [
					// tslint:disable-next-line:indent
					// tslint:disable-next-line:no-magic-numbers
					['data1', 230, 190, 300, 500, 300, 400],
				],
			});
			// tslint:disable-next-line:no-magic-numbers
		}, 1000);

		// tslint:disable-next-line:typedef
		setTimeout(function () {
			lineChart.load({
				columns: [
					// tslint:disable-next-line:indent
					// tslint:disable-next-line:no-magic-numbers
					['data1', 130, 150, 200, 300, 200, 100],
				],
			});
			// tslint:disable-next-line:no-magic-numbers
		}, 1500);
	}
}
