import { Injectable } from '@angular/core';

@Injectable()
export class ThemeService {

	private _selectedTheme: string;
	private _selectedThemeId: string;
	private supportedThemes = {
		LIGHT : { id : 'theme1' },
		DARK : { id : 'theme2' },
	};

	public get selectedThemeId(): string {
		return this._selectedThemeId;
	}

	constructor() {
		this.setTheme('LIGHT');
	}

	public setTheme(themeCode: string): void {
		const selectedThemeObj = this.supportedThemes[themeCode];
		if (selectedThemeObj) {
			this._selectedTheme = themeCode;
			this.loadStyles(selectedThemeObj);
		}
	}

	private loadStyles(newThemeObj: {id: string}): void {
		const head = document.getElementsByTagName('head')[0];
		const body = document.getElementsByTagName('body')[0];

		head.classList.remove(this._selectedThemeId);
		body.classList.remove(this._selectedThemeId);

		this._selectedThemeId = newThemeObj.id;

		head.classList.add(this._selectedThemeId);
		body.classList.add(this._selectedThemeId);
	}
}
