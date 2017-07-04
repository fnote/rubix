import * as c3 from 'c3';
import { Component, Injector } from '@angular/core';
import { BaseWidgetComponent } from '../../widget-util/base-widget/base-widget.component';
import { LocalizationService } from '../../../app-utils/localization/localization.service';
import { MutualFundsDataStore } from '../../../app-backend/price/data-stores/mutual-funds-data-store';
import { PriceService } from '../../../app-backend/price/price.service';
@Component({
	selector: 'app-mutual-fund-benchmark',
	templateUrl: './mutual-fund-benchmark.component.html',
})
export class MutualFundBenchmarkComponent extends BaseWidgetComponent {

	constructor(private priceService: PriceService,
		private injector: Injector,
		private mutualFundsDataStore: MutualFundsDataStore,
		public localizationService: LocalizationService) {
		super(injector);
	}

	public onInit(): void {
		this.drawChart();
	}

	// TODO: [Amila] Fill with real data
	private drawChart(): void {
		const chart = c3.generate({
			bindto: '#strategyPerformanceC3Chart',
			data: {
				columns: [
					['data1', 300, 350, 300, -10, -40, 120, 20, 34, 56, 78],
					['data2', 130, 100, 140, 200, 150, 50, 12, 45, 67, 88]
				],
				types: {
					data1: 'area-spline',
					data2: 'area-spline'
				},
				groups: [['data1', 'data2']]
			},
		});
	}
}
