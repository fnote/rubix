import { Component, Injector } from '@angular/core';
import { BaseWidgetComponent } from '../../widget-util/base-widget/base-widget.component';
import { LocalizationService } from '../../../app-utils/localization/localization.service';
import { MutualFundEntity } from '../../../app-backend/price/business-entities/mutual-fund-entity';
import { MutualFundsDataStore } from '../../../app-backend/price/data-stores/mutual-funds-data-store';

@Component({
	selector: 'app-mutual-fund-overview',
	templateUrl: './mutual-fund-overview.component.html',
})
export class MutualFundOverviewComponent extends BaseWidgetComponent {
	public mutualFundEntityObj: MutualFundEntity;

	constructor(injector: Injector,  private mutualFundsDataStore: MutualFundsDataStore, public localizationService: LocalizationService) {
		super(injector);
	}

	public onInit(): void {
		const symbolCode = this.route.snapshot.queryParams['symbolCode'];
		const exchangeCode = this.route.snapshot.queryParams['exchangeCode'];
		this.mutualFundEntityObj = this.mutualFundsDataStore.getMutualFundSymbol(symbolCode);
	}

}
