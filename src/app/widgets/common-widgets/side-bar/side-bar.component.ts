import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { WidgetLoaderService } from '../../widget-util/widget-loader.service';

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
		private http: Http,
		private widgetLoader: WidgetLoaderService,
	) {
		this.http.get('src/app/app-config/app-layout.json').map((res) => res.json()).subscribe(data => {
			this.tabs = data.model[1].model;
		});
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
