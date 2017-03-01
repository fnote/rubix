import { Component, OnInit, Injector} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  moduleId: module.id,
  templateUrl: 'order-ticket-component.html'
  // styles : [`
  //     .container_class {
  //       background-color: yellow!important;
  //     }
  //     `]
  //  styleUrls: ['order-ticket-component.css']
})

export class OrderTicketComponent implements OnInit {
  id = '2';
  order = 'buy';
  accounts: string[] = ['11', '22', '33' , '44', '66'];

  constructor (private route: ActivatedRoute) {
    // if (injector) {
    //   this.id = this.injector.get('id');
    //   this.order = this.injector.get('buy');
    // }
  }


  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (Object.keys(params).length !== 0) {
          this.id = params['id'];
          this.order = params['buy'];
      }
    });
    this.accounts.push('55');
  }

}
