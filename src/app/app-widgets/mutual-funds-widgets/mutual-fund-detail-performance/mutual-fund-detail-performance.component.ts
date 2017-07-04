import * as c3 from 'c3';
import { Component, Injector } from '@angular/core';
import { BaseWidgetComponent } from '../../widget-util/base-widget/base-widget.component';
import { LocalizationService } from '../../../app-utils/localization/localization.service';
import { MutualFundsDataStore } from '../../../app-backend/price/data-stores/mutual-funds-data-store';
import { PriceService } from '../../../app-backend/price/price.service';

@Component({
	selector: 'app-mutual-fund-detail-performance',
	templateUrl: './mutual-fund-detail-performance.component.html',
})
export class MutualFundDetailPerformanceComponent extends BaseWidgetComponent {
	constructor(private priceService: PriceService,
		private injector: Injector,
		private mutualFundsDataStore: MutualFundsDataStore,
		public localizationService: LocalizationService) {
		super(injector);
	}

	public onInit(): void {
		this.drawChart();
	}

	private drawChart(): void {
		const chart = c3.generate({
			bindto: '#assetAllocationC3Chart',
			data: {
				columns: [
					['Stock', 66.4],
					['Bond', 24.1],
					['Cash', 8.7],
					['Other', 0.8]
				],
				type: 'pie',
				// onclick: function (d, i) { console.log("onclick", d, i); },
				// onmouseover: function (d, i) { console.log("onmouseover", d, i); },
				// onmouseout: function (d, i) { console.log("onmouseout", d, i); }
			},
		});
	}
}
