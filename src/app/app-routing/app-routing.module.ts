import { RouterModule, Routes } from '@angular/router';
import { DetailQuoteComponent } from '../widgets/price-widgets/detail-quote/detail-quote.component';
import { LoginComponent } from '../widgets/common-widgets/login-widget/login.component';
import { NgModule } from '@angular/core';
import { OrderBookComponent } from '../widgets/price-widgets/order-book/order-book.component';
import { RubixTestPageComponent } from '../widgets/common-widgets/rubix-test-page/rubix-test-page.component';
import { TimeAndSalesComponent } from '../widgets/price-widgets/time-and-sales/time-and-sales.component';

const routes: Routes = [
	{ path: '', redirectTo: 'test', pathMatch: 'full' },
	{ path: 'test', component: RubixTestPageComponent },
	{ path: 'detail-quote', component: DetailQuoteComponent },
	{ path: 'time-and-sales', component: TimeAndSalesComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'order-book', component: OrderBookComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	declarations: [],
})
export class AppRoutingModule { }
