import { CommonHelperService } from './helper/common-helper.service';
import { CommonModule } from '@angular/common';
import { FormatArrowForBidAskDifPipe } from './helper/pipes/pipes';
import { KeysPipe } from './helper/pipes/keysPipe';
import { LocalizationService } from './localization/localization.service';
import { LoggerService } from './logger.service';
import { NgModule } from '@angular/core';
import { StorageService } from './storage.service';
import { ThemeService } from './theme.service';
import { TradeHelperService } from './helper/trade-helper.service';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
		FormatArrowForBidAskDifPipe,
		KeysPipe,
	],
	providers: [
		StorageService,
		LoggerService,
		ThemeService,
		LocalizationService,
		CommonHelperService,
		TradeHelperService,
	],
	exports: [
		FormatArrowForBidAskDifPipe,
		KeysPipe,
	],
})
export class UtilsModule { }
