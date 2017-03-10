import { OrderListComponent } from './Tradewidgets/orderlist.component';
import { TradeWidgetsComponent } from './Tradewidgets/tradewidgets.component';
import { ComposeMessageComponent } from './compose-message.component';
import { NgModule }                from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './not-found.component';

const appRoutes: Routes = [

  {
  path: 'compose',
  component: ComposeMessageComponent,
  outlet: 'popup'
  },
  /* {
  path: 'tradewidgets',
  component: OrderListComponent,
  outlet: 'tradeWidgets-Aux'
  },*/
  { path: '',   redirectTo: '/watchlist', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
