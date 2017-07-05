import * as c3 from 'c3';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
	selector: 'app-order-book-chart-wrapper-component',
	templateUrl: './order-book-chart-wrapper.component.html',
})
export class OrderBookChartWrapperComponent implements OnChanges {
	@Input() public bidData;
	@Input() public offerData;
	@Input() public totalBid;
	@Input() public totalOffer;
	@Input() public depthType;

	public values = [];
	public chartOptions = {
		legend: {
			show: false,
		},
		data: {
			color: null,
		},
		axis: {
			x: { show: false },
			y: { show: false },
		},
	};

	public ngOnChanges(changes: SimpleChanges): void {

		if (changes['totalBid'] || changes['totalOffer'] || changes['depthType']) {
			this.updateColorFunction();
			this.populateChartData();
		}
	}

	private updateColorFunction(): void {
		const pos = this.depthType ? this.bidData.length - 1 : this.offerData.length - 1;
		this.chartOptions.data.color =  function (color: any, d: any): any {
			return d.id && d.x > pos ? '#f86c6b' : '#4dbd73';
		};
	}

	private populateChartData(): void {
		this.values = [];
		this.values.push('values');

		if (this.bidData) {
			const reverseBids = this.bidData.reverse();
			this.values = this.values.concat(reverseBids);
		}

		if (this.offerData) {
			this.values = this.values.concat(this.offerData);
		}
	}
}
