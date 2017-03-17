import { Component , ChangeDetectionStrategy } from '@angular/core';
import { ThemeService } from './utils/theme/theme.service';
import { PriceService } from './app-backend/price/price.service';
import { LoggerService } from './utils/logger.service';
import { CommonHelperService } from './utils/helper/common-helper.service';
import { TradeHelperService } from './utils/helper/trade-helper.service';
import { LocalizationService } from './utils/localization/localization.service';
import { StorageService } from './utils/storage.service';

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
		private commonHelperService : CommonHelperService,
		private themeService : ThemeService,
		private priceService : PriceService,
		private loggerService : LoggerService,
		private localizationService : LocalizationService) {}

	public convert() : void {
		// console.log(this.commonHelperService.getMonth('Jan'));
		// this.result = this.utilsService.formatDate('20170218142324' , 'YYYY-MM-DD hh:mm:ss' , {});
		// this.inputValues = this.commonHelperService.getMonth('Jan');
	}

	public changeLang() : void {
		if (this.localizationService.getActiveLanguage() === 'EN') {
			this.localizationService.setActiveLanguage('AR');
		}else {
			this.localizationService.setActiveLanguage('EN');
		}
	}

	private getPrice() : void {
		this.loggerService.logInfo(this.inputValues);
		this.priceService.addSymbolRequest(this.inputValues);
	}
}

