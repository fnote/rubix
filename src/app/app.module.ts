import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';

import { PriceService } from './app-backend/price/price.service';
import { LoggerService } from './utils/logger.service';
import { ConfigService } from './config/config.service';
import { ChildComponent } from './child/child.component';
import { ThemeService } from './utils/theme/theme.service';
import { CommonHelperService } from './utils/helper/common-helper.service';
import { TradeHelperService } from './utils/helper/trade-helper.service';
import { LocalizationService } from './utils/localization/localization.service';
import { StorageService } from './utils/storage.service';

@NgModule({
	declarations: [
		AppComponent ,
		ChildComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		AppRoutingModule
	],
	providers: [
		PriceService,
		LoggerService,
		ConfigService,
		ThemeService,
		CommonHelperService,
		TradeHelperService,
		LocalizationService,
		StorageService
	],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
