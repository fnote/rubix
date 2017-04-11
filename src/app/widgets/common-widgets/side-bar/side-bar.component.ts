import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { WidgetLoaderService } from '../../../widgets/widget-loader/widget-loader.service';

@Component({
	selector: 'app-side-bar',
	templateUrl: './side-bar.component.html',
})
export class SideBarComponent {
	private tabs= [];
	private selectedTab= '';

	// If this is failing, add the initialisation to the main app component's constructor
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private http: Http,
		private widgetLoader: WidgetLoaderService,
	) {
		this.http.get('src/app/config/profileLayout.json').map((res) => res.json()).subscribe(data => {
			this.tabs = data.model[1].model;
		});
	}

	public loadTab(tab: any): void {
		this.selectedTab = tab.id;
		this.widgetLoader.loadTab(tab);
	}
}
