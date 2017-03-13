
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Order, OrdersService } from './tradewidgets.service';

@Injectable()
export class OrderDetailResolver implements Resolve<Order> {
    constructor(private orderService: OrdersService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Order> {
        let id = +route.params['id'];
        return this.orderService.getOrder(id).then(order => {
            if (order) {
                return order;
            } else { // id not found
                this.router.navigate(['/dashboard']);
                return false;
            }
        });
    }
}