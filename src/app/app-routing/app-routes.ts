import { ChartComponent } from '../widgets/price-widgets/chart/chart.component';
import { DetailQuoteComponent } from '../widgets/price-widgets/detail-quote/detail-quote.component';
import { PrimaryLayoutOneComponent } from '../layouts/primary-layout-one/primary-layout-one.component';
import { Routes } from '@angular/router';
import { RubixTestPageComponent } from '../widgets/common-widgets/rubix-test-page/rubix-test-page.component';
import { SecondaryLayoutOneComponent } from '../layouts/secondary-layout-one/secondary-layout-one.component';
import { SideBarComponent } from '../widgets/common-widgets/side-bar/side-bar.component';

// tslint:disable
// endOfImports//

export const routes: Routes = [

	{path: "primary-layout-one", component:PrimaryLayoutOneComponent,
		children: [
			{path: "side-bar", component:SideBarComponent,outlet: "outlet1",},
			{path: "secondary-layout-one", component:SecondaryLayoutOneComponent,outlet: "outlet2",
				children: [
					{path: "detail-quote", component:DetailQuoteComponent,outlet: "outlet1",},
					{path: "detail-quote", component:DetailQuoteComponent,outlet: "outlet2",},
					{path: "chart", component:ChartComponent,outlet: "outlet3",},
					{path: "chart", component:ChartComponent,outlet: "outlet4",},
				]
			},
			{path: "secondary-layout-one", component:SecondaryLayoutOneComponent,outlet: "outlet2",
				children: [
					{path: "chart", component:ChartComponent,outlet: "outlet1",},
					{path: "chart", component:ChartComponent,outlet: "outlet2",},
					{path: "chart", component:ChartComponent,outlet: "outlet3",},
					{path: "chart", component:ChartComponent,outlet: "outlet4",},
				]
			},
		]
	},
];