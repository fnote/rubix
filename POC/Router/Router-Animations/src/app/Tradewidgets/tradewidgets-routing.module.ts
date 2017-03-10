import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TradeWidgetsComponent } from './tradewidgets.component';
import { OrderListComponent } from './orderlist.component';
import { OrderDetailComponent } from './orderdetail.component';
import { TradeWidgetsHomeComponent } from './tradewidgets-home.component';



const tradeWidgetsRoutes: Routes = [
  {
    path: 'tradewidgets',
    component: TradeWidgetsComponent,
    children: [
      {
        path: '',
        component: OrderListComponent,
        children: [
          {
            path: ':id',
            component: OrderDetailComponent
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
  ]
})
export class TradeWidgetsRoutingModule { }
