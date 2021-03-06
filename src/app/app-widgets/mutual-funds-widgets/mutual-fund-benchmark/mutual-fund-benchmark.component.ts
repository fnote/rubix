import * as c3 from 'c3';
import { Component, Injector } from '@angular/core';
import { BaseWidgetComponent } from '../../widget-util/base-widget/base-widget.component';
import { CommonHelperService } from '../../../app-utils/helper/common-helper.service';
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

	constructor(private injector: Injector,
		private commonHelperService: CommonHelperService,
		private mutualFundsDataStore: MutualFundsDataStore,
		public localizationService: LocalizationService) {
		super(injector);
	}

	public onInit(): void {
		this.symbolCode = this.commonHelperService.generateKey(this.route.snapshot.queryParams['exchangeCode'], this.route.snapshot.queryParams['symbolCode']);
		this.dataLoadedSubscription = this.mutualFundsDataStore.detailDataLoadedObserver.subscribe(isDataLoaded => {
			if (isDataLoaded) {
				this.mutualFundEntityObj = this.mutualFundsDataStore.getMutualFundSymbol(this.route.snapshot.queryParams['symbolCode']);
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
				xFormat: '%Y%m%d',
				keys: {
					x: 'date',
					value: ['benchMark', 'value'],
				},
			},
			axis: {
				x: {
					type: 'timeseries',
					tick: {
						format: '%Y-%m',
						culling: {
							max: 5,
						},
					},
				},
			},
			point: {
				show: false,
			},
		});
	}
}
