import * as c3 from 'c3';
import { Component, Injector } from '@angular/core';
import { BaseWidgetComponent } from '../../widget-util/base-widget/base-widget.component';
import { PriceService } from '../../../app-backend/price/price.service';

@Component({
	selector: 'app-mutual-fund-performance',
	templateUrl: './mutual-fund-performance.component.html',
	styleUrls: ['./mutual-fund-performance.component.scss'],
})
export class MutualFundPerformanceComponent extends BaseWidgetComponent {

	// TODO: [Amila] Refactor the code once Malindu implement the chart properly
	constructor(private priceService: PriceService, private injector: Injector) {
		super(injector);
	}

	public onInit(): void {
		this.drawAreaChart();
		this.subscribeForMutualFund();
	}

	private drawAreaChart(): void {
		const areaChart = c3.generate({
			bindto: '#c3Chart',
			legend: {
				show: false,
			},
			data: {
				/* tslint:disable */
				columns: [
					['data1', 30, 200, 100, 400, 150, 250],
					['data2', 130, 100, 140, 200, 150, 50],
					['data3', 130, 150, 200, 300, 200, 100],
				],
				/* tslint:enable */
				type: 'bar',
			},
			bar: {
				width: {
					ratio: 0.5, // this makes bar width 50% of length between ticks
				},
			},
		});
	}

	private subscribeForMutualFund(): void {
		const seg = ['MASTER', 'PERFORM', 'ANNUAL'];
		this.priceService.addMutualFundRequest(seg);
	}
}
