import { Injectable } from '@angular/core';

@Injectable()
export class ThemeService {

	private _selectedTheme: string;
	private _selectedThemeId: string;
	private supportedThemes = {
		DARK : { id : 'dark' },
		LIGHT : { id : 'light' },
	};

	public get selectedThemeId(): string {
		return this._selectedThemeId;
	}

	constructor() {
		this.setTheme('DARK');
	}

	public setTheme(themeCode: string): void {
		const selectedThemeObj = this.supportedThemes[themeCode];
		if (selectedThemeObj) {
			this._selectedTheme = themeCode;
			this.loadStyles(selectedThemeObj);
		}
	}

	private loadStyles(selectedThemeObj: {id: string}): void {
		this._selectedThemeId = selectedThemeObj.id;
	}
}
