import { Component , ChangeDetectionStrategy} from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CommonHelperService } from '../utils/helper/common-helper.service';
import { ThemeService } from '../utils/theme/theme.service';
import { LocalizationService } from '../utils/localization/localization.service';

@Component({
	selector: 'app-child',
	templateUrl: './child.component.html',
	styleUrls: ['./child.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent {

	private name = 'Chandana';
	private translationObjectObservable = this.localizationService.getTranslationObjectObservable();
	private combinedTranslation = Observable.combineLatest(this.localizationService.getTranslationObjectObservable() , (x : any) => {

	return x.labels.TOP_STOCKS + ' Combined with ' + x.labels.NEWS;
	});

	constructor(private localizationService : LocalizationService , private themeService : ThemeService) {
		this.localizationService.getActiveLanguageObservable().subscribe(res => {
			console.log('Language Changed: ' + res);
		});
	}

	public changeLang() : void {
		if (this.localizationService.getActiveLanguage() === 'EN') {
			this.localizationService.setActiveLanguage('AR');
		}else {
			this.localizationService.setActiveLanguage('EN');
		}
	}

	public changeTheme(themeCode : string) : void {
		this.themeService.setTheme(themeCode);
	}

	public testFun() : void {
		console.log('-----');
	}
}
