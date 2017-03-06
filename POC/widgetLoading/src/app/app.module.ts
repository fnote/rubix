import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { routing, appRoutingProviders } from './app.routing';

import { WatchlistComponent } from './Components/WatchlistComponent/watchlist-component';
import { OrderTicketComponent } from './Components/OrderTicketComponent/order-ticket-component';
import { NewsComponent } from './Components/NewsComponent/news-component';
import { HomeComponent} from './Components/HomeComponent/home-component';
import { TradeComponent } from './Components/TradeComponent/trade-component';
import { DynamicComponent } from './Core/dynamic-component';

@NgModule({
  imports: [
    BrowserModule,
    routing
  ],
  declarations: [
    AppComponent,
    WatchlistComponent,
    OrderTicketComponent,
    NewsComponent,
    HomeComponent,
    TradeComponent,
    DynamicComponent
  ],
  providers : [
    appRoutingProviders
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
