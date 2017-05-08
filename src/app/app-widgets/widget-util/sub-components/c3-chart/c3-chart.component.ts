import * as c3 from 'c3';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
	selector: 'app-c3-chart-component',
	templateUrl: './c3-chart.component.html',
})
export class C3ChartComponent implements OnInit, OnChanges {
	@Input() public bidData;
	@Input() public offerData;
	private values = [];

	public ngOnInit(): void {
		// iterate the depth object and populate the values array
		// this.populateChart();
	}

	private populateChart(): void {
		this.values = [];
		this.values.push('values');

		if (this.bidData) {
			const reverseBids = this.bidData.reverse();
			this.values.push(reverseBids);
		}

		if (this.offerData) {
			this.values.push(this.offerData);
		}

		this.drawAreaChart();
	}

	public ngOnChanges(changes: SimpleChanges): void {
		if (changes['bidData'] || changes['OfferData']) {
			this.populateChart();
		}
	}

	private drawAreaChart(): void {
		const areaChart = c3.generate({
			bindto: '#c3Chart',
			legend: {
				show: false,
			},
			data: {
				columns: [
					this.values,
				],
				types: {
					values: 'bar',
				},
				colors: {
					values: '#4dbd73',
				},
				color: function (color: any, d: any): any {
            		// tslint:disable-next-line:no-magic-numbers
					return d.id && d.x > 4 ? '#f86c6b' : color;
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
