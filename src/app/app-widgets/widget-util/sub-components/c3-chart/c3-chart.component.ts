import * as c3 from 'c3';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
	selector: 'app-c3-chart-component',
	templateUrl: './c3-chart.component.html',
})
export class C3ChartComponent implements OnChanges {
	@Input() public bidData;
	@Input() public offerData;
	@Input() public totalBid;
	@Input() public totalOffer;
	@Input() public depthType;

	private values = [];
	private iterableDiffer;

	private populateChart(): void {
		this.values = [];
		this.values.push('values');

		if (this.bidData) {
			const reverseBids = this.bidData.reverse();
			this.values = this.values.concat(reverseBids);
		}

		if (this.offerData) {
			this.values = this.values.concat(this.offerData);
		}

		this.drawAreaChart();
	}

	public ngOnChanges(changes: SimpleChanges): void {
		if (changes['totalBid'] || changes['totalOffer'] || changes['depthType']) {
			this.populateChart();
		}
	}

	private drawAreaChart(): void {
		// tslint:disable-next-line:no-magic-numbers
		const pos = this.depthType ? 4 : 9;
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
				color: function (color: any, d: any): any {
					return d.id && d.x > pos ? '#f86c6b' : '#4dbd73';
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
