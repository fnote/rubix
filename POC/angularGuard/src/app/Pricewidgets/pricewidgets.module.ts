import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WatchListComponent } from './watchlist.component';
import { DetailQuoteComponent } from './detailQuote.component';
import { SymbolService } from './pricewidgets.service';
import { PriceWidgetsRoutingModule } from './pricewidgets-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PriceWidgetsRoutingModule
  ],
  declarations: [
    WatchListComponent,
    DetailQuoteComponent
  ],
  providers: [ SymbolService ]
})
export class PriceWidgetsModule {}
