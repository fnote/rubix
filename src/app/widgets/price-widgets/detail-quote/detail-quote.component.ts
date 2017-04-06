import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalizationService } from '../../../utils/localization/localization.service';
import { PriceService } from '../../../app-backend/price/price.service';

@Component({
	selector: 'app-detail-quote',
	templateUrl: './detail-quote.component.html',
})
export class DetailQuoteComponent implements OnInit, OnDestroy {

	public stockObj;
	private exgStock: [string, string] = ['DFM', 'DIC'];

	constructor(private priceService: PriceService, public localizationService: LocalizationService) {
		// Constructor
		this.stockObj = this.priceService.stockDM.getOrAddStock(this.exgStock);
	}

	public ngOnInit(): void {
		// on init
		setTimeout(() => {
			if (!this.stockObj) {
				this.stockObj = this.priceService.stockDM.getOrAddStock(this.exgStock);
			}

			if (!this.stockObj.isMetaDataLoaded) {
				this.priceService.requestSymbolMeta(this.exgStock);
			}

			// Add the symbol subscription
			this.priceService.addSymbolRequest(this.exgStock);
		}, 5000);
	}

	public ngOnDestroy(): void {
		// Remove the symbol subscription
		this.priceService.removeSymbolRequest(this.exgStock);
	}
}
