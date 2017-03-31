import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { CommonWidgetModule } from './widgets/common-widgets/common-widget.module';
import { CommunicationModule } from './app-backend/communication/communication.module';
import { ConfigService } from './config/config.service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { PriceModule } from './app-backend/price/price.module';
import { PriceWidgetModule } from './widgets/price-widgets/price-widget.module';
//import { RubixTestPageComponent } from './widgets/common-widgets/rubix-test-page/rubix-test-page.component';
import { UtilsModule } from './utils/utils.module';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		AppRoutingModule,
		CommunicationModule,
		PriceModule,
		PriceWidgetModule,
		CommonWidgetModule,
		UtilsModule,
	],
	providers: [ConfigService],
	bootstrap: [AppComponent],
})
export class AppModule { }
