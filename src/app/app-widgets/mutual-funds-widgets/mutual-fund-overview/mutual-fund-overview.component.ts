import { Component, Injector } from '@angular/core';
import { BaseWidgetComponent } from '../../widget-util/base-widget/base-widget.component';
import { LocalizationService } from '../../../app-utils/localization/localization.service';
import { MutualFundsDataStore } from '../../../app-backend/price/data-stores/mutual-funds-data-store';

@Component({
	selector: 'app-mutual-fund-overview',
	templateUrl: './mutual-fund-overview.component.html',
	styleUrls: ['./mutual-fund-overview.component.scss'],
})
export class MutualFundOverviewComponent extends BaseWidgetComponent {
	private symbolCode;
	public mutualFundEntityObj: Object;

	constructor(injector: Injector,  private mutualFundsDataStore: MutualFundsDataStore, public localizationService: LocalizationService) {
		super(injector);
	}

	public onInit(): void {
		const symbolCode = this.route.snapshot.queryParams['symbolCode'];
		const exchangeCode = this.route.snapshot.queryParams['exchangeCode'];
		this.symbolCode = [exchangeCode, symbolCode].join('~');
		this.mutualFundsDataStore.detailDataLoadedObserver.subscribe(isDataLoaded => {
			this.mutualFundEntityObj = this.mutualFundsDataStore.getMutualFundSymbol(symbolCode);
		});

	}

}
