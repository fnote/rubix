import { OrderDetailResolver } from './order-detail-resolver.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TradeWidgetsComponent } from './tradewidgets.component';
import { OrderListComponent } from './orderlist.component';
import { OrderDetailComponent } from './orderdetail.component';
import { TradeWidgetsHomeComponent } from './tradewidgets-home.component';



const tradeWidgetsRoutes: Routes = [
  {
    path: '',
    redirectTo: '/tradewidgets',
    pathMatch: 'full'
  },

  {
    path: 'tradewidgets',
  //  path: '',
    component: TradeWidgetsComponent,
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
