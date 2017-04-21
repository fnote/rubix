import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { WidgetLoaderService } from '../../widget-util/widget-loader.service';
import { appLayout } from '../../../app-config/app-layout';

@Component({
	selector: 'app-side-bar',
	templateUrl: './side-bar.component.html',
})
export class SideBarComponent {
	private tabs= [];
	public selectedTab= '';

	// If this is failing, add the initialisation to the main app component's constructor
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private widgetLoader: WidgetLoaderService,
	) {
		this.tabs = appLayout.model[1].model;
	}

	public loadTab(tab: any): void {
		this.selectedTab = tab.id;
		this.widgetLoader.loadTab(tab);

		this.sideBarCloseClicked();
	}

	public sideBarCloseClicked(): void {
		const body = document.getElementsByTagName('body')[0];
		body.classList.remove('nav-expanded');
	}
}
