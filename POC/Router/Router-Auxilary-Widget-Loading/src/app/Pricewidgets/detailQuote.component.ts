import { Component, Input, OnInit } from '@angular/core';
import { SymbolService, Symbol } from './pricewidgets.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {  HostBinding } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { slideInDownAnimation } from '../animations';


@Component({
  selector: 'price-detail-quote',
  template: `
  <button (click)="goBack()" >Back to List</button>
    <div *ngIf="symbol">
      <h2>{{symbol.description}} details!</h2>
      <div>
        <label>id: </label>{{symbol.id}}
      </div>
      <div>
        <label>name: </label>
        <input [(ngModel)]="symbol.description" placeholder="name"/>
      </div>
      <button (click)="nextDetail()" >Next</button>
    </div>
  `,
  animations: [ slideInDownAnimation ]
})
export class DetailQuoteComponent implements OnInit {
  @Input() symbol: Symbol;

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';

 constructor(
  private route: ActivatedRoute,
  private router: Router,
  private service: SymbolService
) {}


 ngOnInit() {
  this.route.params
    // (+) converts string 'id' to a number
    .switchMap((params: Params) => this.service.getSymbol(+params['id']))
        .subscribe(
            (symbol: Symbol) =>
                this.symbol = symbol );
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
    this.router.navigate(['/symbol', ( +this.symbol.id) + 1]);
}

goBack() {
  const symbolId = this.symbol ? this.symbol.id : null;
  this.router.navigate(['/watchlist', { id: symbolId }]);
}


}
