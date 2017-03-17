import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { UtilsModule } from './utils/utils.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';

import { PriceService } from './app-backend/price/price.service';
import { LoggerService } from './utils/logger.service';
import { ConfigService } from './config/config.service';
import { ChildComponent } from './child/child.component';
import { ThemeService } from './utils/theme/theme.service';

@NgModule({
	declarations: [
		AppComponent ,
		ChildComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		AppRoutingModule,
		UtilsModule
	],
	providers: [
		PriceService,
		LoggerService,
		ConfigService,
    ThemeService
	],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
