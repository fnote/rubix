import { Component } from '@angular/core';
import { Channels } from './constants/enums/channels.enum';
import { CommonHelperService } from './utils/helper/common-helper.service';
import { DataService } from './app-backend/communication/data.service';
import { LocalizationService } from './utils/localization/localization.service';
import { LoggerService } from './utils/logger.service';
import { PriceService } from './app-backend/price/price.service';
import { StorageService } from './utils/storage.service';
import { ThemeService } from './utils/theme.service';
import { TradeHelperService } from './utils/helper/trade-helper.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
})

export class AppComponent {

}
