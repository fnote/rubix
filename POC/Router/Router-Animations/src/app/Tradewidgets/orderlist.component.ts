import { MemberOrderingWalker } from 'tslint/lib/rules/memberOrderingRule';
import { Component, OnInit } from '@angular/core';

import { Order, OrdersService } from './tradewidgets.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Rx';

@Component({
  template: `
    <h2>Orders</h2>
    <ul class="symbols">
      <li *ngFor="let order of orders | async"
        [class.selected]="isSelected(order)"
        (click)="onSelect(order)">
        <span class="badge">{{ order.id }}</span> {{ order.symbol }}
      </li>
    </ul>
        <router-outlet></router-outlet>
  `,
  styles: [`
    .selected {
      background-color: #CFD8DC !important;
      color: white;
    }
    .symbols {
      margin: 0 0 2em 0;
      list-style-type: none;
      padding: 0;
      width: 15em;
    }
    .symbols li {
      cursor: pointer;
      position: relative;
      left: 0;
      background-color: #EEE;
      margin: .5em;
      padding: .3em 0;
      height: 1.6em;
      border-radius: 4px;
    }
    .symbols li.selected:hover {
      background-color: #BBD8DC !important;
      color: white;
    }
    .symbols li:hover {
      color: #607D8B;
      background-color: #DDD;
      left: .1em;
    }
    .symbols .text {
      position: relative;
      top: -3px;
    }
    .symbols .badge {
      display: inline-block;
      font-size: small;
      color: white;
      padding: 0.8em 0.7em 0 0.7em;
      background-color: #607D8B;
      line-height: 1em;
      position: relative;
      left: -1px;
      top: -4px;
      height: 1.8em;
      margin-right: .8em;
      border-radius: 4px 0 0 4px;
    }
  `],
  providers: [OrdersService]
})
export class OrderListComponent  implements OnInit {
  orders: Observable<Order[]>;

  private selectedId: number;

  constructor(
    private service: OrdersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.orders = this.route.params
      .switchMap((params: Params) => {
        this.selectedId = +params['id'];
        return this.service.getOrders();
      });
  }

  isSelected(order: Order) { return order.id === this.selectedId; }

  onSelect(order: Order) {
  this.router.navigate([order.id], { relativeTo: this.route });
  }
}
