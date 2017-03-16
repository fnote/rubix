import { Component , ChangeDetectionStrategy } from '@angular/core';
import { UtilsService } from './utils/utils.service';
import { CommonHelperService } from './utils/helper/common-helper.service';
import { PriceService } from './app-backend/price/price.service';
import { LoggerService } from './utils/logger.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent {

	private title = 'Rubix test page';
	private result : string;
	private inputValues : string;

	constructor(
		private commonHelperService : CommonHelperService ,
		private utilsService : UtilsService ,
		private priceService : PriceService,
		private loggerService : LoggerService) {}

	public convert() : void {
		// console.log(this.commonHelperService.getMonth('Jan'));
		// this.result = this.utilsService.formatDate('20170218142324' , 'YYYY-MM-DD hh:mm:ss' , {});
		// this.inputValues = this.commonHelperService.getMonth('Jan');
	}

	public changeLang() : void {
		if (this.utilsService.getActiveLanguage() === 'EN') {
			this.utilsService.setActiveLanguage('AR');
		} else {
			this.utilsService.setActiveLanguage('EN');
		}
	}

	private getPrice() : void {
		this.loggerService.logInfo(this.inputValues);
		this.priceService.addSymbolRequest(this.inputValues);
	}
}

