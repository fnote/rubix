import { Injectable } from '@angular/core';

export class Order {
  constructor(public id: number, public symbol: string,  public price: number,  public quantity: number) { }
}


@Injectable()
export class OrdersService {

  getOrders(): Promise <Order[]> {
    let orders = [];
    const num = 10000;
    let i: number;
       for (i = 1;i <= num; i++) {
         orders.push(new Order(i, 'symbol', 10, 1000));
      }

    return Promise.resolve(orders);
  }

  getOrder(id: number): Promise<Order> {
    return this.getOrders().then(orders => orders.find(order => order.id === id) );
  }

  // See the "Take it slow" appendix
 getOrdersSlowly(): Promise<Order[]> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(this.getOrders()), 2000);
    });
  }
}

