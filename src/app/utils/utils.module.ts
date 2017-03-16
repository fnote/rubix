import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilsService } from './utils.service';
import { CommonHelperService } from './helper/common-helper.service';
import { TradeHelperService } from './helper/trade-helper.service';
import { LocalizationService } from './localization/localization.service';
import { StorageService } from './localStorage/storage.service';

@NgModule({
	imports: [ CommonModule ],
	declarations: [],
	providers: [
		UtilsService,
		CommonHelperService,
		TradeHelperService,
		LocalizationService,
		StorageService
		]
})
export class UtilsModule { }
