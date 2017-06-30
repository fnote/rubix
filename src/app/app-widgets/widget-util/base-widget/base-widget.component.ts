import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { NavigationService } from '../navigation-service';

@Component({
	selector: 'app-base-widget',
	templateUrl: './base-widget.component.html',
})
export class BaseWidgetComponent implements OnInit, OnDestroy {

	private queryParameters: {};
	private _exgStock: [string, string];
	protected route;
	protected navigationService;

	constructor(injector: Injector) {
		this.route = injector.get(ActivatedRoute);
		this.navigationService = injector.get(NavigationService);
		this.route.data
			.subscribe((values: Object = {}) => {
				Object.assign(this, values);
			});

		this.route.queryParams.subscribe((params: Params) => {
			this.queryParameters = params;
		});
	}

	public ngOnInit(): void {
		this.onInit();
	}

	public ngOnDestroy(): void {
		this.onDestroy();
	}

	// tslint:disable:no-empty
	public onInit(): void {

	}

	public onDestroy(): void {

	}
	// tslint:enable:no-empty

	public get exgStock(): [string, string ]  {
		return this._exgStock;
	}

	public set exgStock(value: [string, string]) {
		this._exgStock = value;
	}

	public getQueryParam(key: string): string {
		if (this.queryParameters[key]) {
			return this.queryParameters[key];
		}

		return '';
	}
}
