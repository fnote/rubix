import { RouterModule, Routes } from '@angular/router';
import { ChartComponent } from '../widgets/price-widgets/chart/chart.component';
import { DetailQuoteComponent } from '../widgets/price-widgets/detail-quote/detail-quote.component';
import { LoginComponent } from '../widgets/common-widgets/login-widget/login.component';
import { NgModule } from '@angular/core';
import { OrderBookComponent } from '../widgets/price-widgets/order-book/order-book.component';
import { PrimaryLayoutOneComponent } from '../layouts/primary-layout-one/primary-layout-one.component';
import { RubixTestPageComponent } from '../widgets/common-widgets/rubix-test-page/rubix-test-page.component';
import { SecondaryLayoutOneComponent } from '../layouts/secondary-layout-one/secondary-layout-one.component';
import { SideBarComponent } from '../widgets/common-widgets/side-bar/side-bar.component';
import { TimeAndSalesComponent } from '../widgets/price-widgets/time-and-sales/time-and-sales.component';
import { routes } from './app-routes';

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	declarations: [],
})
export class AppRoutingModule { }
