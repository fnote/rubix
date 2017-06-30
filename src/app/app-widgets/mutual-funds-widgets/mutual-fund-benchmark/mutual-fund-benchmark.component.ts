import { Component, Injector } from '@angular/core';
import { BaseWidgetComponent } from '../../widget-util/base-widget/base-widget.component';

@Component({
	selector: 'app-mutual-fund-benchmark',
	templateUrl: './mutual-fund-benchmark.component.html',
	styleUrls: ['./mutual-fund-benchmark.component.scss'],
})
export class MutualFundBenchmarkComponent extends BaseWidgetComponent {
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
