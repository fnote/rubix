import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { WidgetLoaderService } from '../../widget-util/widget-loader.service';

@Component({
	selector: 'app-side-bar',
	templateUrl: './side-bar.component.html',
})
export class SideBarComponent {
	private tabs = [];
	public selectedTab= '';

	// If this is failing, add the initialisation to the main app component's constructor
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private widgetLoaderService: WidgetLoaderService,
	) {
		this.tabs = widgetLoaderService.getTabs();
	}

	public loadTab(tab: any): void {
		this.selectedTab = tab.id;
		this.widgetLoaderService.loadTab(tab);

		this.sideBarCloseClicked();
	}

	public sideBarCloseClicked(): void {
		const body = document.getElementsByTagName('body')[0];
		body.classList.remove('nav-expanded');
	}
}
