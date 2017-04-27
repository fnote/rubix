import { Component, Injector } from '@angular/core';
import { BaseWidgetComponent } from '../../widget-util/base-widget/base-widget.component';
import { LocalizationService } from '../../../app-utils/localization/localization.service';
import { PriceService } from '../../../app-backend/price/price.service';

@Component({
	selector: 'app-time-and-sales',
	templateUrl: './time-and-sales.component.html',
})
export class TimeAndSalesComponent extends BaseWidgetComponent {

	public timeAndSalesDataArray;
	public stockObj;

	constructor(
		private priceService: PriceService,
		public localizationService: LocalizationService,
		injector: Injector,
	) {
		super(injector);
		this.stockObj = this.priceService.stockDM.getOrAddStock(this.exgStock);
		this.priceService.timeAndSalesDM.reset(this.exgStock);
		this.timeAndSalesDataArray = this.priceService.timeAndSalesDM.getTimeAndSalesDataArray();
	}

	public onInit(): void {
		this.priceService.addSymbolRequest(this.exgStock);
		this.priceService.addRealTimeExchangeRequest(this.exgStock[0]);
		this.priceService.addTimeAndSalesRequest(this.exgStock);
	}

	public onDestroy(): void {
		this.priceService.removeSymbolRequest(this.exgStock);
		this.priceService.removeTimeAndSalesRequest(this.exgStock);
		this.priceService.removeRealTimeExchangeRequest(this.exgStock[0]);
	}
}
