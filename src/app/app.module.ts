import { NgModule } from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { FormsModule }          from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent }          from './app.component';
import { PageNotFoundComponent } from './not-found.component';
import { PriceWidgetsModule }     from './PriceWidgets/pricewidgets.module';

const appRoutes: Routes = [
  { path: '',   redirectTo: '/watchlist', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    PriceWidgetsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
