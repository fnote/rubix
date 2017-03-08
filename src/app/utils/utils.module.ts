import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilsService } from './utils.service';
import { CommonHelperService } from './helper/common-helper.service';
import { TradeHelperService } from './helper/trade-helper.service';
import { LocalizationService } from './localization/localization.service';

@NgModule({
	imports: [ CommonModule ],
	declarations: [],
	providers: [
		UtilsService,
		CommonHelperService,
		LocalizationService
		]
})
export class UtilsModule { }
