import { Component, Injector } from '@angular/core';
import { BaseWidgetComponent } from '../../widget-util/base-widget/base-widget.component';

@Component({
	selector: 'app-mutual-fund-overview',
	templateUrl: './mutual-fund-overview.component.html',
	styleUrls: ['./mutual-fund-overview.component.scss'],
})
export class MutualFundOverviewComponent extends BaseWidgetComponent {
	public category;
	public strategy;

	constructor(injector: Injector) {
		super(injector);
	}

	public onInit(): void {
		this.category = this.route.snapshot.queryParams['category'];
		this.strategy = this.route.snapshot.queryParams['strategy'];
	}
}
