import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalizationService } from '../../../utils/localization/localization.service';
import { PriceService } from '../../../app-backend/price/price.service';

@Component({
	selector: 'app-detail-quote',
	templateUrl: './detail-quote.component.html',
})
export class DetailQuoteComponent implements OnInit, OnDestroy {

	public response: Array<any> = [] ;
	private session = '';
	public stockObj;
	private exgStock: [string, string] = ['TDWL', '1020'];

	constructor(private priceService: PriceService, public localizationService: LocalizationService) {
		this.stockObj = this.priceService.stockDM.getOrAddStock(this.exgStock);

		// Temp
		this.updatePriceResponse();
	}

	private updatePriceResponse(): void {
		this.priceService.getPriceResponseStream().subscribe(response => {
			this.response.push(response);
			if (response && response[0] && response[0].MT === '-1') {
				this.session = response[0].SESSION;
			}
		});
	}

	public ngOnInit(): void {
		if (!this.stockObj) {
			this.stockObj = this.priceService.stockDM.getOrAddStock(this.exgStock);
		}

		this.priceService.requestSymbolMeta(this.exgStock);
		this.priceService.addSymbolRequest(this.exgStock);
	}

	public ngOnDestroy(): void {
		// Remove the symbol subscription
		this.priceService.removeSymbolRequest(this.exgStock);
	}
}
