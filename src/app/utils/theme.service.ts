import { Injectable } from '@angular/core';
import { Themes } from '../constants/enums/themes.enum';

@Injectable()
export class ThemeService {

	private _selectedTheme: Themes = -1;
	private supportedThemes = {
		0 : { code : 'theme1', displayName: 'Light' },
		1 : { code : 'theme2', displayName: 'Dark' },
	};

	constructor() {
		this.setSelectedTheme(Themes.Light);
	}

	public setSelectedTheme(value: Themes): void {
		if (this._selectedTheme === value) {
			return;
		}

		const selectedThemeObj = this.supportedThemes[value];
		if (selectedThemeObj) {
			const head = document.getElementsByTagName('head')[0];
			const body = document.getElementsByTagName('body')[0];

			if (this._selectedTheme !== -1) {
				head.classList.remove(this.getThemeCode(this._selectedTheme));
				body.classList.remove(this.getThemeCode(this._selectedTheme));
			}

			this._selectedTheme = value;

			head.classList.add(this.getThemeCode(value));
			body.classList.add(this.getThemeCode(value));
		}
	}

	public getSelectedTheme(): Themes {
		return this._selectedTheme;
	}

	private getThemeCode(value: Themes): string {
		const selectedThemeObj = this.supportedThemes[value];
		return selectedThemeObj.code;
	}
}
