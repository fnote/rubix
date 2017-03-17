import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StorageService } from './storage.service';
import { LoggerService } from './logger.service';
import { ThemeService } from './theme.service';
import { LocalizationService } from './localization/localization.service';
import { CommonHelperService } from './helper/common-helper.service';
import { TradeHelperService } from './helper/trade-helper.service';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [],
	providers: [
		StorageService,
		LoggerService,
		ThemeService,
		LocalizationService,
		CommonHelperService,
		TradeHelperService
	]
})
export class UtilsModule { }
