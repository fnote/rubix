import { RouterModule, Routes } from '@angular/router';
import { DetailQuoteComponent } from '../widgets/price-widgets/detail-quote/detail-quote.component';
import { NgModule } from '@angular/core';
import { RubixTestPageComponent } from '../widgets/test-widgets/rubix-test-page/rubix-test-page.component';

const routes: Routes = [
	{ path: '', redirectTo: 'test', pathMatch: 'full' },
	{ path: 'test', component: RubixTestPageComponent },
	{ path: 'detail-quote', component: DetailQuoteComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	declarations: [],
})
export class AppRoutingModule { }
