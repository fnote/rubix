import { AuthGuardService } from '../app-widgets/widget-util/auth-guard-service';
import { BaseC3ChartComponent } from '../app-widgets/chart-widgets/c3-chart/base/base-c3-chart.component';
import { DetailQuoteComponent } from '../app-widgets/price-widgets/detail-quote/detail-quote.component';
import { FdDetailQuoteComponent } from '../app-widgets/fd-page-widgets/fd-detail-quote/fd-detail-quote.component';
import { FdLayoutComponent } from '../app-layouts/fd-layout/fd-layout.component';
import { LoginComponent } from '../app-widgets/common-widgets/login-widget/login.component';
import { MapSelectorComponent } from '../app-widgets/price-widgets/map-selector/map-selector.component';
import { MutualFundCategoryComponent } from '../app-widgets/mutual-funds-widgets/mutual-fund-category/mutual-fund-category.component';
import { MutualFundPerformanceComponent } from '../app-widgets/mutual-funds-widgets/mutual-fund-performance/mutual-fund-performance.component';
import { OrderBookComponent } from '../app-widgets/price-widgets/order-book/order-book.component';
import { PrimaryLayoutOneComponent } from '../app-layouts/primary-layout-one/primary-layout-one.component';
import { Routes } from '@angular/router';
import { RubixTestPageComponent } from '../app-widgets/common-widgets/rubix-test-page/rubix-test-page.component';
import { SecondaryLayoutOneComponent } from '../app-layouts/secondary-layout-one/secondary-layout-one.component';
import { SecondaryLayoutThreeComponent } from '../app-layouts/secondary-layout-three/secondary-layout-three.component';
import { SecondaryLayoutTwoComponent } from '../app-layouts/secondary-layout-two/secondary-layout-two.component';
import { SideBarComponent } from '../app-widgets/common-widgets/side-bar/side-bar.component';
import { TimeAndSalesComponent } from '../app-widgets/price-widgets/time-and-sales/time-and-sales.component';
import { TwoByTwoLayoutComponent } from '../app-layouts/two-by-two-layout/two-by-two-layout.component';
// { path: 'map', component: MapSelectorComponent },

// endOfImports //
export const routes: Routes = [
	{ path: 'primary-layout-one', component: PrimaryLayoutOneComponent, canActivate: [AuthGuardService],
		children: [
			{ path: 'side-bar', component: SideBarComponent, outlet: 'outlet1' },
			{ path: 'secondary-layout-two', component: SecondaryLayoutTwoComponent, outlet: 'outlet2',
				children: [
					{ path: 'detail-quote', component: DetailQuoteComponent, outlet: 'outlet1', data: { exgStock: ['TDWL', '1090'] } },
				],
			},
			{ path: 'secondary-layout-two', component: SecondaryLayoutTwoComponent, outlet: 'outlet2',
				children: [
					{ path: 'time-and-sales', component: TimeAndSalesComponent, outlet: 'outlet1', data: { exgStock: ['TDWL', '1010'] } },
				],
			},
			{ path: 'secondary-layout-two', component: SecondaryLayoutTwoComponent, outlet: 'outlet2',
				children: [
					{ path: 'order-book', component: OrderBookComponent, outlet: 'outlet1', data: { exgStock: ['DFM', 'GFH'] } },
				],
			},
			{ path: 'secondary-layout-two', component: SecondaryLayoutTwoComponent, outlet: 'outlet2',
				children: [
					{ path: 'chart', component: BaseC3ChartComponent, outlet: 'outlet1', data: { exgStock: ['TDWL', '1090'], chartOutletID: 'outlet1' } },
				],
			},
			{ path: 'secondary-layout-one', component: SecondaryLayoutOneComponent, outlet: 'outlet2',
				children: [
					{ path: 'detail-quote', component: DetailQuoteComponent, outlet: 'outlet1', data: { exgStock: ['ADSM', 'ALDAR'] } },
					{ path: 'detail-quote', component: DetailQuoteComponent, outlet: 'outlet2', data: { exgStock: ['PFX', 'EURUSD'] } },
					{ path: 'order-book', component: OrderBookComponent, outlet: 'outlet3', data: { exgStock: ['DFM', 'GFH'] } },
					{ path: 'time-and-sales', component: TimeAndSalesComponent, outlet: 'outlet4', data: { exgStock: ['TDWL', '1010'] } },
				],
			},
			{ path: 'secondary-layout-three', component: SecondaryLayoutThreeComponent, outlet: 'outlet2',
				children: [
					{ path: 'chart', component: BaseC3ChartComponent, outlet: 'outlet1', data: { exgStock: ['TDWL', '1090'], chartOutletID: 'outlet2' } },
					{ path: 'chart', component: BaseC3ChartComponent, outlet: 'outlet2', data: { exgStock: ['TDWL', '1010'], chartOutletID: 'outlet3' } },
					{ path: 'chart', component: BaseC3ChartComponent, outlet: 'outlet3', data: { exgStock: ['CASE', 'OTMT'], chartOutletID: 'outlet4' } },
					{ path: 'chart', component: BaseC3ChartComponent, outlet: 'outlet4', data: { exgStock: ['DFM', 'EMAAR'], chartOutletID: 'outlet5' } },
					{ path: 'chart', component: BaseC3ChartComponent, outlet: 'outlet5', data: { exgStock: ['CASE', 'OTMT'], chartOutletID: 'outlet6' } },
				],
			},
			{ path: 'fd-layout', component: FdLayoutComponent, outlet: 'outlet2',
				children: [
					{ path: 'fd-detail-quote', component: FdDetailQuoteComponent, outlet: 'outlet1', data: { exgStock: ['TDWL', '1010'] } },
					{ path: 'chart', component: BaseC3ChartComponent, outlet: 'outlet2', data: { exgStock: ['TDWL', '1090'] } },
					{ path: 'chart', component: BaseC3ChartComponent, outlet: 'outlet3', data: { exgStock: ['TDWL', '1090'] } },
					{ path: 'chart', component: BaseC3ChartComponent, outlet: 'outlet4', data: { exgStock: ['TDWL', '1090'] } },
					{ path: 'chart', component: BaseC3ChartComponent, outlet: 'outlet5', data: { exgStock: ['TDWL', '1090'] } },
				],
			},
		],
	},
	{ path: 'login', component: LoginComponent },
	{ path: '', pathMatch: 'full', redirectTo: 'login' },
	{ path: 'detail-quote', component: DetailQuoteComponent, canActivate: [AuthGuardService], data: { exgStock: ['PFX', 'EURUSD'] } },
	{ path: 'time-and-sales', component: TimeAndSalesComponent, canActivate: [AuthGuardService], data: { exgStock: ['TDWL', '1010'] } },
	{ path: 'order-book', component: OrderBookComponent, canActivate: [AuthGuardService], data: { exgStock: ['TDWL', '1010'] } },
	{ path: 'fd-layout', component: FdLayoutComponent, canActivate: [AuthGuardService],
		children: [
			{ path: 'fd-detail-quote', component: FdDetailQuoteComponent, outlet: 'outlet1', data: { exgStock: ['TDWL', '1010'] } },
			{ path: 'chart', component: BaseC3ChartComponent, outlet: 'outlet2', data: { exgStock: ['TDWL', '1090'] } },
			{ path: 'chart', component: BaseC3ChartComponent, outlet: 'outlet3', data: { exgStock: ['TDWL', '1090'] } },
			{ path: 'chart', component: BaseC3ChartComponent, outlet: 'outlet4', data: { exgStock: ['TDWL', '1090'] } },
			{ path: 'chart', component: BaseC3ChartComponent, outlet: 'outlet5', data: { exgStock: ['TDWL', '1090'] } },
			{ path: 'chart', component: BaseC3ChartComponent, outlet: 'outlet6', data: { exgStock: ['TDWL', '1090'] } },
			{ path: 'chart', component: BaseC3ChartComponent, outlet: 'outlet7', data: { exgStock: ['TDWL', '1090'] } },
			{ path: 'chart', component: BaseC3ChartComponent, outlet: 'outlet8', data: { exgStock: ['TDWL', '1090'] } },
			{ path: 'chart', component: BaseC3ChartComponent, outlet: 'outlet9', data: { exgStock: ['TDWL', '1090'] } },
		],
	},
	{ path: 'two-by-two-layout', component: TwoByTwoLayoutComponent,
		children: [
			{ path: 'mutual-fund-performance', component: MutualFundPerformanceComponent, outlet: 'outlet1' },
			{ path: 'mutual-fund-category', component: MutualFundCategoryComponent, outlet: 'outlet2' },
			{ path: 'mutual-fund-category', component: MutualFundCategoryComponent, outlet: 'outlet3' },
			{ path: 'mutual-fund-category', component: MutualFundCategoryComponent, outlet: 'outlet4' },
		],
	},
];
