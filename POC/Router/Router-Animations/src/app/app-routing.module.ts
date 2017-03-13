import { ComposeMessageComponent } from './compose-message.component';
import { NgModule }                from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './not-found.component';

const appRoutes: Routes = [
  { path: '',   redirectTo: '/watchlist', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
  {
  path: 'compose',
  component: ComposeMessageComponent,
  outlet: 'popup'
  }
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
