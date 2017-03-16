import { Component , ChangeDetectionStrategy} from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {UtilsService} from '../utils/utils.service';
import {CommonHelperService} from '../utils/helper/common-helper.service';

@Component({
	selector: 'app-child',
	templateUrl: './child.component.html',
	styleUrls: ['./child.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent {

	private name = 'Chandana';
	private translationObjectObservable = this.utilsService.getTranslationObjectObservable();
	private combinedTranslation = Observable.combineLatest(this.utilsService.getTranslationObjectObservable() , (x : any) => {

	return x.labels.TOP_STOCKS + ' Combined with ' + x.labels.NEWS;
	});

	constructor(private utilsService : UtilsService) {
		this.utilsService.getActiveLanguageObservable().subscribe(res => {
			console.log('Language Changed: ' + res);
		});
	}

	public changeLang() : void {
		if (this.utilsService.getActiveLanguage() === 'EN') {
			this.utilsService.setActiveLanguage('AR');
		}else {
			this.utilsService.setActiveLanguage('EN');
		}
	}

	public testFun() : void {
		console.log('-----');
	}
}
