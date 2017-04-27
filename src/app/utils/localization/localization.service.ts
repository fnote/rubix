import { AR } from './ar';
import { EN } from './en';
import { Injectable } from '@angular/core';
import { Languages } from '../../app-constants/enums/languages.enum';
import { userSettings } from '../../app-config/user-settings';

@Injectable()
export class LocalizationService {

	private _language: any;
	private layout: string;
	private _activeLanguageCode: Languages = -1;
	private supportedLanguages = {
		0 : { shortCode : 'EN', langObj: EN, layout: 'ltr' , des : 'English' },
		1 : { shortCode : 'AR', langObj: AR, layout: 'rtl' , des : '\u0639\u0631\u0628\u0649' },
	};

	constructor() {
		// TODO: [Amila] dump this to local storage and load it from there
		this.activeLanguageCode = userSettings.presentation.defaultLanguage;
	}

	public set activeLanguageCode(value: Languages) {
		if (this._activeLanguageCode === value) {
			return;
		}

		this._activeLanguageCode = value;
		this.language = this.supportedLanguages[value].langObj;
		this.layout = this.supportedLanguages[value].layout;
		this.setOrientationClass();
	}

	public get activeLanguageCode(): Languages {
		return this._activeLanguageCode;
	}

	public set language(value: any) {
		this._language = value;
	}

	public get language(): any {
		return this._language;
	}

	public getLongDesc(value?: Languages): string  {
		let param = value;
		if (!param) {
			param = this._activeLanguageCode;
		}

		return this.supportedLanguages[param].des;
	}

	public getshortCode(value?: Languages): string  {
		let param = value;
		if (!param) {
			param = this._activeLanguageCode;
		}

		return this.supportedLanguages[param].shortCode;
	}

	private setOrientationClass (): void {
		const head = document.getElementsByTagName('head')[0];
		const body = document.getElementsByTagName('body')[0];

		// remove the old class if available
		if (this._activeLanguageCode === Languages.AR) {
			head.classList.add('ar');
			body.classList.add('ar');
		} else {
			head.classList.remove('ar');
			body.classList.remove('ar');
		}
	}

	public isRTL(): boolean {
		return this.layout === 'rtl';
	}
}
