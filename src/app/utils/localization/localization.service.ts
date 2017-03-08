import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { EN } from './en';
import { AR } from './ar';

@Injectable()
export class LocalizationService {
	private language;
	private translationObject;
	private layout;
	private AR = AR;
	private EN = EN;
	private supportedLanguages = {
	EN: {des: 'English' , layout: 'ltr'},
	AR: {des: 'Arabic' , layout: 'rtl'}
	};

	constructor() {
		this.setActiveLanguage('AR');
	}

	public setActiveLanguage(lanCode : string) : void {
		const activeLanguage = this.supportedLanguages[lanCode];
		if (activeLanguage) {
			this.language = lanCode;
			this.layout = activeLanguage.layout;
			this.updateTranslationObject(lanCode);
		}
	}

	public getActiveLanguage() : string {
		return this.language;
	}

	public getLayout() : string {
		return this.layout;
	}

	public changeActiveLanguage(lanCode : string) : void {
		this.setActiveLanguage(lanCode);
	}

	private updateTranslationObject(selectedLanguage) : void {
		const selectedLanguageObject = this[selectedLanguage];
		this.translationObject = {
			labels : {
				TOP_STOCKS : selectedLanguageObject.TOP_STOCKS,
				NEWS : selectedLanguageObject.NEWS
			},

			tradeLabels : {
				HIGH_TO_LOW : selectedLanguageObject.HIGH_TO_LOW,
				LOW_TO_HIGH : selectedLanguageObject.LOW_TO_HIGH
			},

			tradeText : {
				ORD_SIDE : {
					1 : selectedLanguageObject.BUY,
					2 : selectedLanguageObject.SELL
				}
			}
		};
	}
}
