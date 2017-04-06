import { Component, OnInit } from '@angular/core';
import { LocalizationService } from '../../../utils/localization/localization.service';
import { PriceService } from '../../../app-backend/price/price.service';

@Component({
	selector: 'app-time-and-sales',
	templateUrl: './time-and-sales.component.html',
})
export class TimeAndSalesComponent {

	public stockObj;
	private exgStock: [string, string] = ['DFM', 'DIC'];

	constructor(private priceService: PriceService, public localizationService: LocalizationService) {
		this.stockObj = this.priceService.stockDM.getOrAddStock(this.exgStock);

    // TODO: [Malindu] Below is hardcoded until the login is impmented
		const authParams: Object = {
			priceVerion: '1',
			userName: 'amila',
			password: 'password',
			userType: '30',
			subType: '1',
			omsId: 10,
			brokerCode: 'MFS_UAT',
		};
		this.priceService.authenticateWithUsernameAndPassword(authParams, 2);
	}
}
