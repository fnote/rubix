import { AR } from './ar';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { EN } from './en';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LocalizationService {

	private language: string;
	private languageObservable = new BehaviorSubject('AR');
	public translationObject;
	public translationObjectObservable =  new BehaviorSubject('');
	private layout: string;
	private AR = AR;
	private EN = EN;

	constructor() {
		this.setActiveLanguage('AR');
	}

	public setActiveLanguage(lanCode: string): void {
		const activeLanguage = this[lanCode];
		if (activeLanguage) {
			this.language = lanCode;
			this.languageObservable.next(lanCode);
			this.layout = activeLanguage.layout;
			this.updateTranslationObject(activeLanguage);
		}
	}

	public getActiveLanguage(): string {
		return this.language;
	}

	public getActiveLanguageObservable(): Observable<string> {
		return this.languageObservable;
	}

	public getTranslationObject(): any {
		return this.translationObject;
	}

	public getTranslationObjectObservable(): any {
		return this.translationObjectObservable;
	}

	public isRTL(): boolean {
		return this.layout === 'rtl';
	}

	public changeActiveLanguage(lanCode: string): void {
		this.setActiveLanguage(lanCode);
	}

	private updateTranslationObject(selectedLanguageObject: any): void {
		this.translationObject = {
			labels : {
				TOP_STOCKS : selectedLanguageObject.TOP_STOCKS,
				NEWS : selectedLanguageObject.NEWS,
			},

			tradeLabels : {
				HIGH_TO_LOW : selectedLanguageObject.HIGH_TO_LOW,
				LOW_TO_HIGH : selectedLanguageObject.LOW_TO_HIGH,
			},

			tradeText : {
				ORD_SIDE : {
					1 : selectedLanguageObject.BUY,
					2 : selectedLanguageObject.SELL,
				},
			},
		};

		this.translationObjectObservable.next(this.translationObject);
	}
}
