import  { LoginComponent } from './login-component';
import { ComposeMessageComponent } from './compose-message.component';
import { NgModule } from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { FormsModule }          from '@angular/forms';
import { Router, Routes } from '@angular/router';
import { AppComponent }          from './app.component';
import { PageNotFoundComponent } from './not-found.component';
import { PriceWidgetsModule }     from './PriceWidgets/pricewidgets.module';
import { TradeWidgetsModule }     from './TradeWidgets/tradewidgets.module';
import { AppRoutingModule }          from './app-routing.module';
import { AuthGuard }  from './auth-guard-service';



@NgModule({
  declarations: [
    AppComponent,
    ComposeMessageComponent,
    PageNotFoundComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    PriceWidgetsModule,
    TradeWidgetsModule,
    AppRoutingModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}
