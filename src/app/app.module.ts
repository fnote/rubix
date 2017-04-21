import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AuthGuardService } from './widgets/widget-util/auth-guard-service';
import { AuthModule } from './app-backend/auth/auth.module';
import { BrowserModule } from '@angular/platform-browser';
import { CommonWidgetModule } from './widgets/common-widgets/common-widget.module';
import { CommunicationModule } from './app-backend/communication/communication.module';
import { ConfigService } from './app-config/config.service';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { PriceModule } from './app-backend/price/price.module';
import { PriceWidgetModule } from './widgets/price-widgets/price-widget.module';
import { PrimaryLayoutOneComponent } from './layouts/primary-layout-one/primary-layout-one.component';
import { SecondaryLayoutOneComponent } from './layouts/secondary-layout-one/secondary-layout-one.component';
import { SecondaryLayoutTwoComponent } from './layouts/secondary-layout-two/secondary-layout-two.component';
import { TradeModule } from './app-backend/trade/trade.module';
import { UtilsModule } from './utils/utils.module';
import { WidgetLoaderService } from './widgets/widget-util/widget-loader.service';

@NgModule({
	declarations: [AppComponent, PrimaryLayoutOneComponent, SecondaryLayoutOneComponent, SecondaryLayoutTwoComponent],
	imports: [
		BrowserModule,
		HttpModule,
		AppRoutingModule,
		CommunicationModule,
		PriceModule,
		PriceWidgetModule,
		CommonWidgetModule,
		UtilsModule,
		AuthModule,
		TradeModule,
	],
	providers: [ConfigService, WidgetLoaderService, AuthGuardService],
	bootstrap: [AppComponent],
})
export class AppModule { }
