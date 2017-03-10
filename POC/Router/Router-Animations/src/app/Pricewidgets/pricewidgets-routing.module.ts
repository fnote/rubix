import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WatchListComponent } from './watchlist.component';
import { DetailQuoteComponent } from './detailQuote.component';

const priceWidgetsRoutes: Routes = [
  { path: 'watchlist',  component: WatchListComponent },
  { path: 'symbol/:id', component: DetailQuoteComponent }
];
@NgModule({
  imports: [
    RouterModule.forChild(priceWidgetsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PriceWidgetsRoutingModule { }
