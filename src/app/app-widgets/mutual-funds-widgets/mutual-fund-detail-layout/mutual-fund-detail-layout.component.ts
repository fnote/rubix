import { Component, Injector } from '@angular/core';
import { BaseWidgetComponent } from '../../widget-util/base-widget/base-widget.component';
import { LocalizationService } from '../../../app-utils/localization/localization.service';
import { MutualFundEntity } from '../../../app-backend/price/business-entities/mutual-fund-entity';
import { MutualFundsDataStore } from '../../../app-backend/price/data-stores/mutual-funds-data-store';
import { PriceService } from '../../../app-backend/price/price.service';

@Component({
	selector: 'app-mutual-fund-detail-layout',
	templateUrl: './mutual-fund-detail-layout.component.html',
})
export class MutualFundDetailLayoutComponent extends BaseWidgetComponent {
	private symbolCode;
	public mutualFundEntityObj: MutualFundEntity;

	constructor(injector: Injector, private priceService: PriceService, private mutualFundsDataStore: MutualFundsDataStore) {
		super(injector);
	}

	public onInit(): void {
		const symbolCode = this.route.snapshot.queryParams['symbolCode'];
		const exchangeCode = this.route.snapshot.queryParams['exchangeCode'];
		this.symbolCode = [exchangeCode, symbolCode].join('~');
		this.subscribeForMutualFundDetail();
		this.mutualFundEntityObj = this.mutualFundsDataStore.getMutualFundSymbol(symbolCode);
	}

	public BackToParent(): void {
		this.navigationService.backToParent();
	}

	private subscribeForMutualFundDetail(): void {
		const segment = ['MASTER', 'PERFORM', 'MONTHLY', 'FACTS'];

		this.priceService.addMutualFundDetailsRequest(segment, [this.symbolCode]);
	}
}
