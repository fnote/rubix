import { ComposeMessageComponent } from './compose-message.component';
import { NgModule }                from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './not-found.component';

const appRoutes: Routes = [
  {
    path: 'tradewidgets',
    loadChildren: 'app/Tradewidgets/tradewidgets.module#TradeWidgetsModule'
  },
  {
  path: 'compose',
  component: ComposeMessageComponent,
  outlet: 'popup'
  },
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
