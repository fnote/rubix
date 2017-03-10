import { Component, OnInit } from '@angular/core';

import { SymbolService, Symbol } from './pricewidgets.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Rx';

@Component({
  template: `
    <h2>Symbols</h2>
    <ul class="symbols">
      <li *ngFor="let symbol of symbols | async"
        [class.selected]="isSelected(symbol)"
        (click)="onSelect(symbol)">
        <span class="badge">{{ symbol.id }}</span> {{ symbol.code }}
      </li>
    </ul>
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
  providers: [SymbolService]
})
export class WatchListComponent  implements OnInit {
  symbols: Observable<Symbol[]>;

  private selectedId: number;

  constructor(
    private service: SymbolService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.symbols = this.route.params
      .switchMap((params: Params) => {
        this.selectedId = +params['id'];
        return this.service.getSymbols();
      });
  }

  isSelected(symbol: Symbol) { return symbol.id === this.selectedId; }

  onSelect(symbol: Symbol) {
    this.router.navigate(['/symbol', symbol.id]);
  }
}
