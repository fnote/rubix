import { Component , ChangeDetectionStrategy} from '@angular/core';
import { UtilsService } from './utils/utils.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

	private title = 'Rubix test page';
	private result : string;
	private inputValues : string;

	constructor(private utilsService : UtilsService) {}

	public convert() : void {
		console.log(this.utilsService.formatDate(24826369496 , 'YYYY-MM-DD hh:mm:ss' , {} , 60));
	}

	public changeLang() : void {
		if (this.utilsService.getActiveLanguage() === 'EN') {
			this.utilsService.setActiveLanguage('AR');
		}else {
			this.utilsService.setActiveLanguage('EN');
		}
	}
}

