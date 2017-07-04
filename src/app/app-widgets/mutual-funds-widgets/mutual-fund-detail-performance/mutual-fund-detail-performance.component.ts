import * as c3 from 'c3';
import { Component, Injector } from '@angular/core';
import { BaseWidgetComponent } from '../../widget-util/base-widget/base-widget.component';
import { LocalizationService } from '../../../app-utils/localization/localization.service';
import { MutualFundsDataStore } from '../../../app-backend/price/data-stores/mutual-funds-data-store';

@Component({
	selector: 'app-mutual-fund-detail-performance',
	templateUrl: './mutual-fund-detail-performance.component.html',
})
export class MutualFundDetailPerformanceComponent extends BaseWidgetComponent {
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
			bindto: '#assetAllocationC3Chart',
			data: {
				columns: [
					[this.localizationService.language.STOCK, this.mutualFundEntityObj['stock']],
					[this.localizationService.language.BOND, this.mutualFundEntityObj['bond']],
					[this.localizationService.language.CASH, this.mutualFundEntityObj['cash']],
					[this.localizationService.language.OTHER, this.mutualFundEntityObj['other']],
				],
				type: 'pie',
			},
			// TODO: [Amila] find a way to load below form CSS
			color: {
				pattern: ['#81b6e3', '#6aa76e', '#ecb127', '#a35dba'],
			},
		});
	}
}
