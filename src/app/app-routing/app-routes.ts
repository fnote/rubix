import { AuthGuardService } from '../widgets/widget-util/auth-guard-service';
import { ChartComponent } from '../widgets/price-widgets/chart/chart.component';
import { DetailQuoteComponent } from '../widgets/price-widgets/detail-quote/detail-quote.component';
import { LoginComponent } from '../widgets/common-widgets/login-widget/login.component';
import { OrderBookComponent } from '../widgets/price-widgets/order-book/order-book.component';
import { PrimaryLayoutOneComponent } from '../layouts/primary-layout-one/primary-layout-one.component';
import { Routes } from '@angular/router';
import { RubixTestPageComponent } from '../widgets/common-widgets/rubix-test-page/rubix-test-page.component';
import { SecondaryLayoutOneComponent } from '../layouts/secondary-layout-one/secondary-layout-one.component';
import { SecondaryLayoutThreeComponent } from '../layouts/secondary-layout-three/secondary-layout-three.component';
import { SecondaryLayoutTwoComponent } from '../layouts/secondary-layout-two/secondary-layout-two.component';
import { SideBarComponent } from '../widgets/common-widgets/side-bar/side-bar.component';
import { TimeAndSalesComponent } from '../widgets/price-widgets/time-and-sales/time-and-sales.component';

// endOfImports //
export const routes: Routes = [
	{ path: 'primary-layout-one',  canActivate: [AuthGuardService],  component: PrimaryLayoutOneComponent,
		children: [
			{ path: 'side-bar', component: SideBarComponent, outlet: 'outlet1' },
			{ path: 'secondary-layout-three', component: SecondaryLayoutThreeComponent, outlet: 'outlet2',
				children: [
					{ path: 'chart', component: ChartComponent, outlet: 'outlet1', data: { title: 'One' } },
					{ path: 'chart', component: ChartComponent, outlet: 'outlet2', data: { title: 'Two' } },
					{ path: 'chart', component: ChartComponent, outlet: 'outlet3', data: { title: 'Three' } },
					{ path: 'chart', component: ChartComponent, outlet: 'outlet4', data: { title: 'Four' } },
					{ path: 'chart', component: ChartComponent, outlet: 'outlet5', data: { title: 'Five' } },
					{ path: 'chart', component: ChartComponent, outlet: 'outlet6', data: { title: 'Six' } },
					{ path: 'chart', component: ChartComponent, outlet: 'outlet7', data: { title: 'Seven' } },
					{ path: 'chart', component: ChartComponent, outlet: 'outlet8', data: { title: 'Eight' } },
					{ path: 'chart', component: ChartComponent, outlet: 'outlet9', data: { title: 'Nine' } },
					{ path: 'chart', component: ChartComponent, outlet: 'outlet10', data: { title: 'Ten' } },
					{ path: 'chart', component: ChartComponent, outlet: 'outlet11', data: { title: 'Eleven' } },
					{ path: 'chart', component: ChartComponent, outlet: 'outlet12', data: { title: 'Twelve' } },
				],
			},
			{ path: 'secondary-layout-two', component: SecondaryLayoutTwoComponent, outlet: 'outlet2',
				children: [
					{ path: 'detail-quote', component: DetailQuoteComponent, outlet: 'outlet1', data: { exgStock: ['TDWL', '1090'] } },
				],
			},
			{ path: 'secondary-layout-two', component: SecondaryLayoutTwoComponent, outlet: 'outlet2',
				children: [
					{ path: 'time-and-sales', component: TimeAndSalesComponent, outlet: 'outlet1', data: { exgStock: ['TDWL', '1090'] } },
				],
			},
			{ path: 'secondary-layout-one', component: SecondaryLayoutOneComponent, outlet: 'outlet2',
				children: [
					{ path: 'detail-quote', component: DetailQuoteComponent, outlet: 'outlet1', data: { exgStock: ['TDWL', '1010'] } },
					{ path: 'detail-quote', component: DetailQuoteComponent, outlet: 'outlet2', data: { exgStock: ['DFM', 'EMAAR'] } },
					{ path: 'detail-quote', component: DetailQuoteComponent, outlet: 'outlet3', data: { exgStock: ['DFM', 'DIC'] } },
					{ path: 'time-and-sales', component: TimeAndSalesComponent, outlet: 'outlet4', data: { exgStock: ['TDWL', '1090'] } },
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

	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: 'detail-quote', canActivate: [AuthGuardService], component: DetailQuoteComponent, data: { exgStock: ['TDWL', '1010'] } },
	{ path: 'time-and-sales', canActivate: [AuthGuardService], component: TimeAndSalesComponent, data: { exgStock: ['TDWL', '1010'] } },
	{ path: 'test', component: RubixTestPageComponent },
	{ path: 'login', component: LoginComponent },
];
