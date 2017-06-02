import { Component, Injector, OnInit } from '@angular/core';
import { BaseWidgetComponent } from '../../widget-util/base-widget/base-widget.component';
import { PriceService } from '../../../app-backend/price/price.service';
import { StockDataStore } from '../../../app-backend/price/data-stores/stock-data-store';
import { widgetQueryParams } from '../../../app-constants/const/widget-query-params';

@Component({
	selector: 'app-chart',
	templateUrl: './chart.component.html',
})
export class ChartComponent extends BaseWidgetComponent {
	public stockObj;

	constructor(private priceService: PriceService, private stockDataStore: StockDataStore, injector: Injector) {
		super(injector);
	}

	public onInit(): void {
		const paramSymbol = this.getQueryParam(widgetQueryParams.SYMBOL);
		const paramExg = this.getQueryParam(widgetQueryParams.EXCHANGE);

		if (paramSymbol && paramExg) {
			this.exgStock = [paramExg.toUpperCase(), paramSymbol.toUpperCase()];
		}

		this.stockObj = this.stockDataStore.getOrAddStock(this.exgStock);
		this.priceService.addSymbolRequest(this.exgStock);
	}
}
