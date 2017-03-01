import {Component, ViewChild, Injector, Inject} from '@angular/core';

import { WatchlistComponent } from 'app/Components/WatchlistComponent/watchlist-component';
import { OrderTicketComponent } from '../OrderTicketComponent/order-ticket-component';
import { NewsComponent } from '../NewsComponent/news-component';
import {DynamicComponent} from 'app/Core/dynamic-component';

@Component({
  moduleId: module.id,
  templateUrl: 'trade-component.html'
  // styles : [`
  //     .container_class {
  //       background-color: green;
  //     }
  //     `]
  //  styleUrls: ['trade-component.css']
})


export class TradeComponent {
  componentData = null;


  loadComponent(path: string): void {
    switch (path) {
      case 'ot':
        this.componentData = {component: OrderTicketComponent, input: {id: 7, buy: 'sell'}};
        break;
      case 'wl':
        this.componentData = {component: WatchlistComponent, input: {}};
        break;
      case 'nws':
        this.componentData = {component: NewsComponent, input: {}};
        break;
    }
  }
}
