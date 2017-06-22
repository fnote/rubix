import { Component, OnInit } from '@angular/core';
import { PriceService } from '../../../app-backend/price/price.service';

@Component({
	selector: 'app-real-time-advice',
	templateUrl: './real-time-advice.component.html',
})
export class RealTimeAdviceComponent implements OnInit {

	constructor(private priceService: PriceService) {}

	public ngOnInit(): void {
		this.subscribeForBacklogRTA();
	}

	private subscribeForBacklogRTA(): void {
		const requestParms = {
			exg: ['DFM'],
			pgi: 0,
			pgs: 20,
			apm : {
				ED : '20170621000000',
				HIST : 'TRUE',
				SD : '20170323000000',
			},
		};
		this.priceService.addBacklogRTARequest(requestParms);
	}
}
