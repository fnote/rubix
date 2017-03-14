import { TradeWidgetsHomeComponent } from './tradewidgets-home.component';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderListComponent } from './orderlist.component';
import { OrderDetailComponent } from './orderdetail.component';
import { OrdersService } from './tradewidgets.service';
import { TradeWidgetsRoutingModule } from './tradewidgets-routing.module';
import { TradeWidgetsComponent } from './tradewidgets.component';
import { RouterModule } from '@angular/router';
import { AuthGuard }  from '../auth-guard-service';
import { AuthService } from 'app/auth.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TradeWidgetsRoutingModule
  ],
  declarations: [
      TradeWidgetsComponent,
      OrderListComponent,
      TradeWidgetsHomeComponent,
      OrderDetailComponent
  ],
  providers: [
    OrdersService,
    AuthGuard,
    AuthService
  ]
})
export class TradeWidgetsModule {}
