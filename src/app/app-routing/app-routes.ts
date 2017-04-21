import { AuthGuardService } from '../widgets/widget-util/auth-guard-service';
import { ChartComponent } from '../widgets/price-widgets/chart/chart.component';
import { DetailQuoteComponent } from '../widgets/price-widgets/detail-quote/detail-quote.component';
import { LoginComponent } from '../widgets/common-widgets/login-widget/login.component';
import { OrderBookComponent } from '../widgets/price-widgets/order-book/order-book.component';
import { PrimaryLayoutOneComponent } from '../layouts/primary-layout-one/primary-layout-one.component';
import { Routes } from '@angular/router';
import { RubixTestPageComponent } from '../widgets/common-widgets/rubix-test-page/rubix-test-page.component';
import { SecondaryLayoutOneComponent } from '../layouts/secondary-layout-one/secondary-layout-one.component';
import { SecondaryLayoutTwoComponent } from '../layouts/secondary-layout-two/secondary-layout-two.component';
import { SideBarComponent } from '../widgets/common-widgets/side-bar/side-bar.component';
import { TimeAndSalesComponent } from '../widgets/price-widgets/time-and-sales/time-and-sales.component';

// endOfImports //
export const routes: Routes = [
	{ path: 'primary-layout-one',  canActivate: [AuthGuardService],  component: PrimaryLayoutOneComponent,
		children: [
			{ path: 'side-bar', component: SideBarComponent, outlet: 'outlet1' },
			{ path: 'secondary-layout-two', component: SecondaryLayoutTwoComponent, outlet: 'outlet2',
				children: [
					{ path: 'detail-quote', component: DetailQuoteComponent, outlet: 'outlet1' },
				],
			},
			{ path: 'secondary-layout-one', component: SecondaryLayoutOneComponent, outlet: 'outlet2',
				children: [
					{ path: 'detail-quote', component: DetailQuoteComponent, outlet: 'outlet1' },
					{ path: 'detail-quote', component: DetailQuoteComponent, outlet: 'outlet2' },
					{ path: 'detail-quote', component: DetailQuoteComponent, outlet: 'outlet3' },
					{ path: 'time-and-sales', component: TimeAndSalesComponent, outlet: 'outlet4' },
				],
			},
			{ path: 'secondary-layout-one', component: SecondaryLayoutOneComponent, outlet: 'outlet2',
				children: [
					{ path: 'chart', component: ChartComponent, outlet: 'outlet1' },
					{ path: 'chart', component: ChartComponent, outlet: 'outlet2' },
					{ path: 'chart', component: ChartComponent, outlet: 'outlet3' },
					{ path: 'chart', component: ChartComponent, outlet: 'outlet4' },
				],
			},
		],
	},

	{ path: '', redirectTo: 'detail-quote', pathMatch: 'full' },
	{ path: 'detail-quote', canActivate: [AuthGuardService], component: DetailQuoteComponent },
	{ path: 'time-and-sales', canActivate: [AuthGuardService], component: TimeAndSalesComponent },
	{ path: 'test', component: RubixTestPageComponent },
	{ path: 'login', component: LoginComponent },
];
