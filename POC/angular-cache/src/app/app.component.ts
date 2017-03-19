import { Component } from '@angular/core';
import { TradeService } from './trade/trade.service';

@Component({
	selector : 'app-root',
	templateUrl : './app.component.html',
	styleUrls : ['./app.component.css']
})
export class AppComponent {

	public title = 'This is the Trade Module which connects to trade';

	constructor(private trade : TradeService) {

	}

	ngOnInit(){
		this.demo();
	}

	public demo() : void{
		this.trade.insertCashAccount();
	}
}
