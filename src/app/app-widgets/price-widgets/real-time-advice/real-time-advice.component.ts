import { Component, OnInit } from '@angular/core';
import { ContentDisplayBoxComponent } from '../../widget-util/sub-components/content-display-box/content-display-box.component';
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
		const exg =  ['ADSM', 'DIFX', 'DFM'];
		const apm = {
			BKL: 0,
			GL2: '',
		};
		this.priceService.addRealTimeAdviceRequest(apm, exg);
	}

	private subscribeForBacklogRTA(): void {
		const trackRcrdRqstParms = {
			exg: ['DFM'],
			pgi: 0,
			pgs: 20,
			apm : {
				ED : '20170621000000',
				HIST : 'TRUE',
				SD : '20170323000000',
			},
		};
		const blRtaRqstParms = {
			exg: ['DFM'],
			pgi: 0,
			pgs: 20,
		};
		this.priceService.addBacklogRTARequest(trackRcrdRqstParms);
		this.priceService.addBacklogRTARequest(blRtaRqstParms);
	}

	public onDestroy(): void {
		const exg =  ['ADSM', 'DIFX', 'DFM'];
		const apm = {
			BKL: 0,
			GL2: '',
		};
		this.priceService.removeRealTimeAdviceRequest(apm, exg);
	}

	public onEventEmit(testString: string): void {
		alert(testString);
	}
}
