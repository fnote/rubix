import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { WidgetLoaderService } from '../../widget-util/widget-loader.service';

@Component({
	selector: 'app-side-bar',
	templateUrl: './side-bar.component.html',
})
export class SideBarComponent {
	public tabs: any = [];
	public selectedTab= '';

	// If this is failing, add the initialisation to the main app component's constructor
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private widgetLoaderService: WidgetLoaderService,
	) {
		widgetLoaderService.getTabs().then(layoutObj => {
			this.tabs = layoutObj.model[1].model;
		});
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
}
