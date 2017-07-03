import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AuthGuardService } from './app-widgets/widget-util/auth-guard-service';
import { AuthModule } from './app-backend/auth/auth.module';
import { BaseWidgetComponent } from './app-widgets/widget-util/base-widget/base-widget.component';
import { BrowserModule } from '@angular/platform-browser';
import { CacheModule } from './app-backend/cache/cache.module';
import { ChartModule } from 'angular2-highcharts';
import { ChartWidgetModule } from './app-widgets/chart-widgets/chart-widget.module';
import { CommonWidgetModule } from './app-widgets/common-widgets/common-widget.module';
import { CommunicationModule } from './app-backend/communication/communication.module';
import { ConfigService } from './app-config/config.service';
import { FdLayoutComponent } from './app-layouts/fd-layout/fd-layout.component';
import { FdPageWidgetModule } from './app-widgets/fd-page-widgets/fd-page-widget.module';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { HttpModule } from '@angular/http';
import { MutualFundSummaryLayoutComponent } from './app-widgets/mutual-funds-widgets/mutual-fund-summary-layout/mutual-fund-summary-layout.component';
import { MutualFundsWidgetModule } from './app-widgets/mutual-funds-widgets/mutual-funds-widget.module';
import { NavigationService } from './app-widgets/widget-util/navigation-service';
import { NetworkModule } from './app-backend/network/network.module';
import { NetworkService } from './app-backend/network/network.service';
import { NgModule } from '@angular/core';
import { PriceModule } from './app-backend/price/price.module';
import { PriceWidgetModule } from './app-widgets/price-widgets/price-widget.module';
import { PrimaryLayoutOneComponent } from './app-layouts/primary-layout-one/primary-layout-one.component';
import { SecondaryLayoutOneComponent } from './app-layouts/secondary-layout-one/secondary-layout-one.component';
import { SecondaryLayoutThreeComponent } from './app-layouts/secondary-layout-three/secondary-layout-three.component';
import { SecondaryLayoutTwoComponent } from './app-layouts/secondary-layout-two/secondary-layout-two.component';
import { TradeModule } from './app-backend/trade/trade.module';
import { TwoByOneLayoutComponent } from './app-layouts/two-by-one-layout/two-by-one-layout.component';
import { TwoByTwoLayoutComponent } from './app-layouts/two-by-two-layout/two-by-two-layout.component';
import { UtilsModule } from './app-utils/utils.module';
import { WidgetLoaderService } from './app-widgets/widget-util/widget-loader.service';

export function highchartsFactory(): any {
	return require('highcharts/highmaps');
}

@NgModule({
	declarations: [
		AppComponent,
		PrimaryLayoutOneComponent,
		SecondaryLayoutOneComponent,
		SecondaryLayoutTwoComponent,
		BaseWidgetComponent,
		SecondaryLayoutThreeComponent,
		FdLayoutComponent,
		TwoByTwoLayoutComponent,
		TwoByOneLayoutComponent,
		MutualFundSummaryLayoutComponent,
	],
	imports: [
		BrowserModule,
		HttpModule,
		AppRoutingModule,
		UtilsModule,
		CommunicationModule,
		CacheModule,
		PriceModule,
		PriceWidgetModule,
		ChartWidgetModule,
		FdPageWidgetModule,
		CommonWidgetModule,
		MutualFundsWidgetModule,
		AuthModule,
		TradeModule,
		ChartModule,
		NetworkModule,
	],
	providers: [
		ConfigService,
		WidgetLoaderService,
		AuthGuardService,
		NetworkService,
		{
			provide: HighchartsStatic,
			useFactory: highchartsFactory,
		},
		NavigationService,
	],
	bootstrap: [AppComponent],
})
export class AppModule { }
