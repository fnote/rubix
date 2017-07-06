import { Component, Injector } from '@angular/core';
import { BaseWidgetComponent } from '../../widget-util/base-widget/base-widget.component';
import { CommonHelperService } from '../../../app-utils/helper/common-helper.service';
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

	constructor(injector: Injector,
		private priceService: PriceService,
		private mutualFundsDataStore: MutualFundsDataStore,
		private commonHelperService: CommonHelperService) {
		super(injector);
	}

	public onInit(): void {
		this.symbolCode = this.commonHelperService.generateKey(this.route.snapshot.queryParams['exchangeCode'], this.route.snapshot.queryParams['symbolCode']);
		this.subscribeForMutualFundDetail();
		this.mutualFundEntityObj = this.mutualFundsDataStore.getMutualFundSymbol(this.route.snapshot.queryParams['symbolCode']);
	}

	public BackToParent(): void {
		this.navigationService.backToParent();
	}

	private subscribeForMutualFundDetail(): void {
		const segment = ['MASTER', 'PERFORM', 'MONTHLY', 'FACTS'];
		this.priceService.addMutualFundDetailsRequest(segment, [this.symbolCode]);
	}
}
