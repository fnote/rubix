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
		const authParams: Object = {
			priceVerion: '1',
			userName: 'amilaaaaa',
			password: 'password',
			userType: '30',
			subType: '1',
			omsId: 10,
			brokerCode: 'MFS_UAT',
		};
		this.priceService.authenticateWithUsernameAndPassword(authParams, 2);

		/**setTimeout(() => {
			const authParams1: Object = {
				priceVerion: '1',
				userName: 'amilaaaaa',
				password: 'password',
				userType: '30',
				subType: '1',
				omsId: 10,
				session: this.session,
				brokerCode: 'MFS_UAT',
			};
			this.priceService.authenticateWithSecondaryAuthToken(authParams1, 3);
		}, 5000);*/

		setTimeout(() => {
			if (!this.stockObj) {
				this.stockObj = this.priceService.stockDM.getOrAddStock(this.exgStock);
			}

			// this.priceService.requestSymbolMeta(this.exgStock);
			this.priceService.addSymbolRequest(this.exgStock);
		}, 5000);
	}

	public ngOnDestroy(): void {
		// Remove the symbol subscription
		this.priceService.removeSymbolRequest(this.exgStock);
	}
}
