import * as c3 from 'c3';
import { Component, Injector } from '@angular/core';
import { BaseWidgetComponent } from '../../widget-util/base-widget/base-widget.component';
import { LocalizationService } from '../../../app-utils/localization/localization.service';
import { MutualFundsDataStore } from '../../../app-backend/price/data-stores/mutual-funds-data-store';
@Component({
	selector: 'app-mutual-fund-benchmark',
	templateUrl: './mutual-fund-benchmark.component.html',
})
export class MutualFundBenchmarkComponent extends BaseWidgetComponent {
	private symbolCode;
	public mutualFundEntityObj: Object;
	private dataLoadedSubscription;

	constructor(private injector: Injector, private mutualFundsDataStore: MutualFundsDataStore, public localizationService: LocalizationService) {
		super(injector);
	}

	public onInit(): void {
		const symbolCode = this.route.snapshot.queryParams['symbolCode'];
		const exchangeCode = this.route.snapshot.queryParams['exchangeCode'];
		this.symbolCode = [exchangeCode, symbolCode].join('~');
		this.dataLoadedSubscription = this.mutualFundsDataStore.detailDataLoadedObserver.subscribe(isDataLoaded => {
			if (isDataLoaded) {
				this.mutualFundEntityObj = this.mutualFundsDataStore.getMutualFundSymbol(symbolCode);
				this.drawChart();
			}
		});
	}

	public onDestroy(): void {
		this.dataLoadedSubscription.unsubscribe();
	}

	private drawChart(): void {
		const chart = c3.generate({
			bindto: '#strategyPerformanceC3Chart',
			data: {
				json: this.mutualFundEntityObj['benchmarkData'],
				keys: {
					x: 'date',
					value: ['benchMark', 'value'],
				},
			},
			axis: {
				x: {
					type: 'category',
					tick: {
						format: '%Y-%m-%d',
						culling: {
							max: 2,
						},
					},
				},
			},
			point: {
				show: false,
			},
			// color: {
			// 	pattern: ['#81b6e3', '#6aa76e', '#ecb127', '#a35dba'],
			// },
		});
	}
}
