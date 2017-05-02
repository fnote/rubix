import { Component, Injector } from '@angular/core';
import { BaseWidgetComponent } from '../../widget-util/base-widget/base-widget.component';
import { DepthDataStore } from '../../../app-backend/price/data-stores/depth-data-store';
import { LocalizationService } from '../../../app-utils/localization/localization.service';
import { PriceService } from '../../../app-backend/price/price.service';
import { StockDataStore } from '../../../app-backend/price/data-stores/stock-data-store';

@Component({
	selector: 'app-order-book',
	templateUrl: './order-book.component.html',
})
export class OrderBookComponent  extends BaseWidgetComponent {

	public stockObj;
	public depthObj;
	private depthPriceRequestSent = false;
	private depthOrderRequestSent = false;
	public isPriceSelected = true;

	constructor(private priceService: PriceService, private depthDataStore: DepthDataStore,
		private stockDataStore: StockDataStore,  public localizationService: LocalizationService, injector: Injector) {
		// Constructor
		super(injector);
		this.stockObj = this.stockDataStore.getOrAddStock(this.exgStock);
		this.depthObj = this.depthDataStore.getDepthByPriceSymbol(this.exgStock);
	}

	public onInit(): void {
		if (!this.stockObj.isMetaDataLoaded) {
			this.priceService.requestSymbolMeta(this.exgStock);
		}

		// Add the symbol subscription
		this.priceService.addSymbolRequest(this.exgStock);
		this.sendDepthPriceRequest();
	}

	public onDestroy(): void {
		// Remove the symbol subscription
		this.priceService.removeSymbolRequest(this.exgStock);
		this.removeDepthPriceRequest();
		if (this.depthOrderRequestSent) {
			this.removeDepthOrderRequest();
		}
	}

	public loadMarketDepthPrice(): void {
		this.isPriceSelected = true;
		this.depthObj = this.depthDataStore.getDepthByPriceSymbol(this.exgStock);
		if (!this.depthPriceRequestSent) {
			this.sendDepthPriceRequest();
		}
	}

	public loadMarketDepthOrder(): void {
		this.isPriceSelected = false;
		this.depthObj = this.depthDataStore.getDepthByOrderSymbol(this.exgStock);
		if (!this.depthOrderRequestSent) {
			this.sendDepthOrderRequest();
		}
	}

	private sendDepthPriceRequest(): void {
		this.priceService.addMarketDepthByPriceRequest(this.exgStock);
		this.depthPriceRequestSent = true;
	}

	private removeDepthPriceRequest(): void {
		this.priceService.removeMarketDepthByPriceRequest(this.exgStock);
		this.depthPriceRequestSent = false;
	}

	private sendDepthOrderRequest(): void {
		this.priceService.addMarketDepthByOrderRequest(this.exgStock);
		this.depthOrderRequestSent = true;
	}

	private removeDepthOrderRequest(): void {
		this.priceService.removeMarketDepthByOrderRequest(this.exgStock);
		this.depthOrderRequestSent = false;
	}
}
