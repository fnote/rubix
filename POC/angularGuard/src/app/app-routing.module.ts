import { ComposeMessageComponent } from './compose-message.component';
import { NgModule }                from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import  { LoginComponent } from './login-component';

import { PageNotFoundComponent } from './not-found.component';

const appRoutes: Routes = [

  {
  path: 'compose',
  component: ComposeMessageComponent,
  outlet: 'popup'
  },
  {
    path: 'login',
    component: LoginComponent
  },
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
