import { Component, OnInit } from '@angular/core';
import { PriceService } from '../../../app-backend/price/price.service';

@Component({
	selector: 'app-real-time-advice',
	templateUrl: './real-time-advice.component.html',
	styleUrls: ['./real-time-advice.component.scss'],
})
export class RealTimeAdviceComponent implements OnInit {

	constructor(private priceService: PriceService) {}

	public ngOnInit(): void {
		this.subscribeForBacklogRTA();
		this.subscribeForRealTimeRTA();
	}

	private subscribeForRealTimeRTA(): void {
		const prm =  ['ADSM', 'DIFX', 'DFM'];
		const apm = {
			BKL: 0,
			GL2: '',
		};
		this.priceService.addRealTimeAdviceRequest(apm, prm);
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
