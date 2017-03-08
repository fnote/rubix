import { Component } from '@angular/core';
import {UtilsService} from './utils/utils.service';
import {CommonHelperService} from './utils/helper/common-helper.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	private title = 'Rubix test page';
	private result : string;
	private inputValues : string;

	constructor( private commonHelperService : CommonHelperService , private utilsService : UtilsService) {}

	public convert() : void {
		console.log(this.commonHelperService.getMonth('Jan'));
		console.log(this.commonHelperService.formatDate('20170218142324' , 'yyyy-MM-dd h:mm:ss' , {hour : 1 , min : 1}));
	}

	public changeLang() : void {
		if (this.utilsService.geLocalizationManager().getActiveLanguage() === 'EN') {
			this.utilsService.geLocalizationManager().setActiveLanguage('AR');
		}else {
			this.utilsService.geLocalizationManager().setActiveLanguage('EN');
		}
	}
}

