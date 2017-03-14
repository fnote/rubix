import { NgModule } from '@angular/core';
import { OrderDetailResolver } from './order-detail-resolver.service';
import { RouterModule, Routes } from '@angular/router';
import { TradeWidgetsComponent } from './tradewidgets.component';
import { OrderListComponent } from './orderlist.component';
import { OrderDetailComponent } from './orderdetail.component';
import { TradeWidgetsHomeComponent } from './tradewidgets-home.component';
import { AuthGuard }  from '../auth-guard-service';


const tradeWidgetsRoutes: Routes = [

  {
    path: 'tradewidgets',
  //  path: '',
    component: TradeWidgetsComponent,
    canActivate: [AuthGuard],

    children: [
      {
        path: '',
        component: OrderListComponent,
        children: [
          {
            path: ':id',
            component: OrderDetailComponent,
            resolve: {
              order: OrderDetailResolver
            }
          },
          {
            path: 'll',
            component: TradeWidgetsHomeComponent
          }
        ]
      }
    ]
  },
  {
    path: 'trade',
    //  path: '',
    component: TradeWidgetsComponent,
    canActivate: [AuthGuard],
    outlet: 'trade',
    children: [
      {
        path: '',
        component: OrderListComponent,
        children: [
          {
            path: ':id',
            component: OrderDetailComponent,
            resolve: {
              order: OrderDetailResolver
            }
          },
          {
            path: 'll',
            component: TradeWidgetsHomeComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(tradeWidgetsRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    OrderDetailResolver
  ]
})
export class TradeWidgetsRoutingModule { }
