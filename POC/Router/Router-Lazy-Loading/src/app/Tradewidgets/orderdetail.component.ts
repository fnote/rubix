import { Component, Input, OnInit } from '@angular/core';
import { Order, OrdersService } from './tradewidgets.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {  HostBinding } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { slideInDownAnimation } from '../animations';


@Component({
  selector: 'trade-order-ticket',
  template: `
  <button (click)="goBack()" >Back to List</button>
    <div *ngIf="order">
      <h2>{{order.symbol}} details!</h2>
      <div>
        <label>id: </label>{{order.id}}
      </div>
      <div>
        <label>price: </label>{{order.price}}
      </div>
       <div>
        <label>Qty: </label>{{order.quantity}}
      </div>
      <button (click)="nextDetail()" >Next</button>
    </div>
  `,
  animations: [ slideInDownAnimation ]
})
export class OrderDetailComponent implements OnInit {
  @Input() order: Order;

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';

 constructor(
  private route: ActivatedRoute,
  private router: Router,
  private service: OrdersService
) {}


 ngOnInit() {
  this.route.params
    // (+) converts string 'id' to a number
    .switchMap((params: Params) => this.service.getOrder(+params['id']))
        .subscribe(
            (order: Order) =>
                this.order = order );
}

/*
ngOnInit() {
  // (+) converts string 'id' to a number
  let id = +this.route.snapshot.params['id'];

  this.service.getHero(id)
    .then((hero: Hero) => this.hero = hero);
}

*/


nextDetail() {
    this.router.navigate(['/order', ( +this.order.id) + 1]);
}

goBack() {
  const orderId = this.order ? this.order.id : null;
 // this.router.navigate(['/orderlist', { id: orderId }]);

  // Relative navigation back to the crises
this.router.navigate(['../', { id: orderId }], { relativeTo: this.route });

}


}
