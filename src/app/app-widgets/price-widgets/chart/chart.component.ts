import { Component, Injector, OnInit } from '@angular/core';
import { BaseWidgetComponent } from '../../widget-util/base-widget/base-widget.component';

@Component({
	selector: 'app-chart',
	templateUrl: './chart.component.html',
})
export class ChartComponent extends BaseWidgetComponent {

	constructor(injector: Injector) {
		super(injector);
	}
}
