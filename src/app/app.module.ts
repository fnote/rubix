import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AuthGuardService } from './app-widgets/widget-util/auth-guard-service';
import { AuthModule } from './app-backend/auth/auth.module';
import { BaseWidgetComponent } from './app-widgets/widget-util/base-widget/base-widget.component';
import { BrowserModule } from '@angular/platform-browser';
import { ChartModule } from 'angular2-highcharts';
import { CommonWidgetModule } from './app-widgets/common-widgets/common-widget.module';
import { CommunicationModule } from './app-backend/communication/communication.module';
import { ConfigService } from './app-config/config.service';
import { FdLayoutComponent } from './app-layouts/fd-layout/fd-layout.component';
import { FdPageWidgetModule } from './app-widgets/fd-page-widgets/fd-page-widget.module';
import { HttpModule } from '@angular/http';
import { NetworkService } from './app-backend/network/network.service';
import { NgModule } from '@angular/core';
import { PriceModule } from './app-backend/price/price.module';
import { PriceWidgetModule } from './app-widgets/price-widgets/price-widget.module';
import { PrimaryLayoutOneComponent } from './app-layouts/primary-layout-one/primary-layout-one.component';
import { SecondaryLayoutOneComponent } from './app-layouts/secondary-layout-one/secondary-layout-one.component';
import { SecondaryLayoutThreeComponent } from './app-layouts/secondary-layout-three/secondary-layout-three.component';
import { SecondaryLayoutTwoComponent } from './app-layouts/secondary-layout-two/secondary-layout-two.component';
import { TradeModule } from './app-backend/trade/trade.module';
import { UtilsModule } from './app-utils/utils.module';
import { WidgetLoaderService } from './app-widgets/widget-util/widget-loader.service';

export declare let require: any;

@NgModule({
	declarations: [
		AppComponent,
		PrimaryLayoutOneComponent,
		SecondaryLayoutOneComponent,
		SecondaryLayoutTwoComponent,
		BaseWidgetComponent,
		SecondaryLayoutThreeComponent,
		FdLayoutComponent,
	],
	imports: [
		BrowserModule,
		HttpModule,
		AppRoutingModule,
		CommunicationModule,
		PriceModule,
		PriceWidgetModule,
		FdPageWidgetModule,
		CommonWidgetModule,
		UtilsModule,
		AuthModule,
		TradeModule,
		ChartModule.forRoot(require('highcharts/highmaps')),

	],
	providers: [
		ConfigService,
		WidgetLoaderService,
		AuthGuardService,
		NetworkService,
	],
	bootstrap: [AppComponent],
})
export class AppModule { }
