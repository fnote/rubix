import { Component, Injector } from '@angular/core';
import { BaseWidgetComponent } from '../../widget-util/base-widget/base-widget.component';
import { PriceService } from '../../../app-backend/price/price.service';

@Component({
	selector: 'app-mutual-fund-overview',
	templateUrl: './mutual-fund-overview.component.html',
	styleUrls: ['./mutual-fund-overview.component.scss'],
})
export class MutualFundOverviewComponent extends BaseWidgetComponent {
	private symbolCode;

	constructor(injector: Injector, private priceService: PriceService) {
		super(injector);
	}

	public onInit(): void {
		const symbolCode = this.route.snapshot.queryParams['symbolCode'];
		const exchangeCode = this.route.snapshot.queryParams['exchangeCode'];
		this.symbolCode = [exchangeCode, symbolCode].join('~');
		this.subscribeForMutualFundDetail();
	}

	private subscribeForMutualFundDetail(): void {
		const segment = ['MASTER', 'PERFORM', 'MONTHLY', 'FACTS'];

		this.priceService.addMutualFundDetailsRequest(segment, [this.symbolCode]);
	}
}
