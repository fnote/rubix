import { Component, OnInit } from '@angular/core';
import { PriceService } from '../../../app-backend/price/price.service';

@Component({
	selector: 'app-real-time-advice',
	templateUrl: './real-time-advice.component.html',
})
export class RealTimeAdviceComponent implements OnInit {

	constructor(private priceService: PriceService) {
		// code here
	}

	public ngOnInit(): void {
		// code here
	}
}
