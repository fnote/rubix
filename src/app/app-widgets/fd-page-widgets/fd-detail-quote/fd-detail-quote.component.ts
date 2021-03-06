import { Component, Injector } from '@angular/core';
import { BaseWidgetComponent } from '../../widget-util/base-widget/base-widget.component';
import { LocalizationService } from '../../../app-utils/localization/localization.service';
import { PriceService } from '../../../app-backend/price/price.service';
import { StockDataStore } from '../../../app-backend/price/data-stores/stock-data-store';
import { widgetQueryParams } from '../../../app-constants/const/widget-query-params';

@Component({
	selector: 'app-fd-detail-quote',
	templateUrl: './fd-detail-quote.component.html',
	styleUrls: ['./fd-detail-quote.component.scss'],
})
export class FdDetailQuoteComponent extends BaseWidgetComponent {
	public stockObj;

	constructor(private priceService: PriceService, public localizationService: LocalizationService,
		private stockDataStore: StockDataStore, injector: Injector,
	) {
		super(injector);
	}

	public onInit(): void {
		const paramSymbol = this.getQueryParam(widgetQueryParams.SYMBOL);
		const paramExg = this.getQueryParam(widgetQueryParams.EXCHANGE);

		if (paramSymbol && paramExg) {
			this.exgStock = [paramExg.toUpperCase(), paramSymbol.toUpperCase()];
		}

		this.stockObj = this.stockDataStore.getOrAddStock(this.exgStock);
		this.priceService.requestSymbolMeta(this.exgStock);
		this.priceService.addSymbolRequest(this.exgStock);
	}

	public onDestroy(): void {
		// Remove the symbol subscription
		this.priceService.removeSymbolRequest(this.exgStock);
	}
}
