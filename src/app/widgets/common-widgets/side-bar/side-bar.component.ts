import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Languages } from '../../../constants/enums/languages.enum';
import { LocalizationService } from '../../../utils/localization/localization.service';
import { WidgetLoaderService } from '../../widget-util/widget-loader.service';

@Component({
	selector: 'app-side-bar',
	templateUrl: './side-bar.component.html',
})
export class SideBarComponent {
	public tabs: any = [];
	public selectedTab= '';
	public lanTitle = '';

	// If this is failing, add the initialisation to the main app component's constructor
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private widgetLoaderService: WidgetLoaderService,
		public localizationService: LocalizationService,
	) {
		widgetLoaderService.getTabs().then(layoutObj => {
			this.tabs = layoutObj.model[1].model;
		});

		if (this.localizationService.activeLanguageCode === Languages.EN) {
			this.lanTitle = this.localizationService.getLongDesc(Languages.AR);
		} else {
			this.lanTitle = this.localizationService.getLongDesc(Languages.EN);
		}
	}

	public loadTab(tab: any): void {
		this.selectedTab = tab.id;
		this.widgetLoaderService.loadTab(tab);

		this.hideSideBar();
	}

	public sideBarCloseClicked(event: any): void {
		event.preventDefault();
		this.hideSideBar();
	}

	private hideSideBar(): void {
		const body = document.getElementsByTagName('body')[0];
		body.classList.remove('nav-expanded');
	}

	public changeLanguage(): void {
		this.lanTitle = this.localizationService.getLongDesc();

		if (this.localizationService.activeLanguageCode === Languages.EN) {
			this.localizationService.activeLanguageCode = Languages.AR;
		} else {
			this.localizationService.activeLanguageCode = Languages.EN;
		}
	}
}
