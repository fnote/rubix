import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { ChildComponent } from './child/child.component';
import { CommunicationModule } from './app-backend/communication/communication.module';
import { ConfigService } from './config/config.service';
import { DetailQuoteComponent } from './widgets/price-widgets/detail-quote/detail-quote.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { PriceModule } from './app-backend/price/price.module';
import { RubixTestPageComponent } from './widgets/test-widgets/rubix-test-page/rubix-test-page.component';
import { UtilsModule } from './utils/utils.module';

@NgModule({
	declarations: [
		AppComponent ,
		ChildComponent,
		RubixTestPageComponent,
		DetailQuoteComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		AppRoutingModule,
		CommunicationModule,
		PriceModule,
		UtilsModule,
	],
	providers: [
		ConfigService,
	],
	bootstrap: [AppComponent],
})
export class AppModule { }
