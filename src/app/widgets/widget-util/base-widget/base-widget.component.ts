import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReflectiveInjector } from '@angular/core';

@Component({
	selector: 'app-base-widget',
	templateUrl: './base-widget.component.html',
})
export class BaseWidgetComponent implements OnInit, OnDestroy {

	private route;
	private _exgStock: [string, string];

	constructor(injector: Injector) {
		this.route = injector.get(ActivatedRoute);
		this.route.data
			.subscribe((values: Object = {}) => {
				Object.assign(this, values);
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
}
