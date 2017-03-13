import { Injectable } from '@angular/core';

export class Order {
  constructor(public id: number, public symbol: string,  public price: number,  public quantity: number) { }
}

const ORDERS = [
  new Order(1, 'Emaar~DFM', 100, 1000),
    new Order(2, 'JKH~LKR', 50, 20000)
];

const ordersPromise = Promise.resolve(ORDERS);

@Injectable()
export class OrdersService {
  getOrders(): Promise<Order[]> {
    return ordersPromise;
  }

getAllOrders(): Order[] {
    return ORDERS;
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

