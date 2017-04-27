import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AuthGuardService } from './app-widgets/widget-util/auth-guard-service';
import { AuthModule } from './app-backend/auth/auth.module';
import { BaseWidgetComponent } from './app-widgets/widget-util/base-widget/base-widget.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonWidgetModule } from './app-widgets/common-widgets/common-widget.module';
import { CommunicationModule } from './app-backend/communication/communication.module';
import { ConfigService } from './app-config/config.service';
import { HttpModule } from '@angular/http';
import { NetworkService } from './app-backend/network/network.service';
import { NgModule } from '@angular/core';
import { PriceModule } from './app-backend/price/price.module';
import { PriceWidgetModule } from './app-widgets/price-widgets/price-widget.module';
import { PrimaryLayoutOneComponent } from './layouts/primary-layout-one/primary-layout-one.component';
import { SecondaryLayoutOneComponent } from './layouts/secondary-layout-one/secondary-layout-one.component';
import { SecondaryLayoutThreeComponent } from './layouts/secondary-layout-three/secondary-layout-three.component';
import { SecondaryLayoutTwoComponent } from './layouts/secondary-layout-two/secondary-layout-two.component';
import { TradeModule } from './app-backend/trade/trade.module';
import { UtilsModule } from './utils/utils.module';
import { WidgetLoaderService } from './app-widgets/widget-util/widget-loader.service';

@NgModule({
	declarations: [
		AppComponent,
		PrimaryLayoutOneComponent,
		SecondaryLayoutOneComponent,
		SecondaryLayoutTwoComponent,
		BaseWidgetComponent,
		SecondaryLayoutThreeComponent,
	],
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
	providers: [
		ConfigService,
		WidgetLoaderService,
		AuthGuardService,
		NetworkService,
	],
	bootstrap: [AppComponent],
})
export class AppModule { }
