import { Component , OnInit} from '@angular/core';
import * as _ from 'lodash';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'my-app',
  template: `
   <h1>{{title}}</h1>
   <nav>
    <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
    <a routerLink="/heroes">Heroes</a>
   </nav>
  <button>test</button>
  <router-outlet></router-outlet>
 `
})
export class AppComponent implements OnInit {
  abstract;
  title = 'Tour of Heroes';

  constructor() {}

  ngOnInit() {}
}
