import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { PriceModule } from './app-backend/price/price.module';
import { CommunicationModule } from './app-backend/communication/communication.module';
import { UtilsModule } from './utils/utils.module';

import { ConfigService } from './config/config.service';
import { ChildComponent } from './child/child.component';

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
		CommunicationModule,
		PriceModule,
		UtilsModule
	],
	providers: [
		ConfigService
	],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
