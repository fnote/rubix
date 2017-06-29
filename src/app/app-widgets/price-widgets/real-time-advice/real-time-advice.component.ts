import { Component, OnInit } from '@angular/core';
import { ContentDisplayBoxComponent } from '../../widget-util/sub-components/content-display-box/content-display-box.component';
import { PriceService } from '../../../app-backend/price/price.service';

@Component({
	selector: 'app-real-time-advice',
	templateUrl: './real-time-advice.component.html',
	styleUrls: ['./real-time-advice.component.scss'],
})
export class RealTimeAdviceComponent implements OnInit {

	public contentData = [
		{ imageUrl: 'http://placehold.it/120x120&text=image4',
			title: 'Test Title1', description: 'sample description1', footerDes: '1 days ago', action1: 'BUY', action2: 'SELL' },
		{ imageUrl: '', title: 'Test Title2', description: 'this is a sample description2', footerDes: '2 days ago', action1: 'BUY' },
		{ imageUrl: '', title: 'Test Title3', description: 'this is a sample description3', footerDes: '3 days ago', action2: 'SELL' },
		{ imageUrl: '', title: 'Test Title4', description: 'this is a sample description4', action1: 'BUY', action2: 'SELL' },
		{ imageUrl: '', title: 'Test Title5', description: 'this is a sample description5', action1: 'BUY', action2: 'SELL' },
		{ imageUrl: '', title: 'Test Title6', description: 'this is a sample description6', footerDes: '4 days ago' },
		{ imageUrl: '', description: 'this is a sample description7', footerDes: '5 days ago' },
	];

	constructor(private priceService: PriceService) {}

	public ngOnInit(): void {
		this.subscribeForBacklogRTA();
		this.subscribeForRealTimeRTA();
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
}
