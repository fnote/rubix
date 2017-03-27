import { CommonHelperService } from './helper/common-helper.service';
import { CommonModule } from '@angular/common';
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
	declarations: [],
	providers: [
		StorageService,
		LoggerService,
		ThemeService,
		LocalizationService,
		CommonHelperService,
		TradeHelperService,
	],
})
export class UtilsModule { }
