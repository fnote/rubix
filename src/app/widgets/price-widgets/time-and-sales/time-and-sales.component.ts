import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalizationService } from '../../../utils/localization/localization.service';
import { PriceService } from '../../../app-backend/price/price.service';

@Component({
	selector: 'app-time-and-sales',
	templateUrl: './time-and-sales.component.html',
})
export class TimeAndSalesComponent implements OnInit, OnDestroy {

	public timeAndSalesDataArray;
	public stockObj;
	private exgStock: [string, string] = ['TDWL', '1020'];

	constructor(private priceService: PriceService, public localizationService: LocalizationService) {
		this.stockObj = this.priceService.stockDM.getOrAddStock(this.exgStock);
		this.priceService.timeAndSalesDM.reset(this.exgStock);
		this.timeAndSalesDataArray = this.priceService.timeAndSalesDM.getTimeAndSalesDataArray();
	}

	public ngOnInit(): void {
		this.priceService.addSymbolRequest(this.exgStock);
		this.priceService.addRealTimeExchangeRequest(this.exgStock[0]);
		this.priceService.addTimeAndSalesRequest(this.exgStock);

	}

	public ngOnDestroy(): void {
		this.priceService.removeSymbolRequest(this.exgStock);
		this.priceService.removeTimeAndSalesRequest(this.exgStock);
		this.priceService.removeRealTimeExchangeRequest(this.exgStock[0]);
	}
}
