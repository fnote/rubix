import { Component, Injector } from '@angular/core';
import { BaseWidgetComponent } from '../../widget-util/base-widget/base-widget.component';

@Component({
	selector: 'app-mutual-fund-detail-layout',
	templateUrl: './mutual-fund-detail-layout.component.html',
})
export class MutualFundDetailLayoutComponent extends BaseWidgetComponent {
	constructor(injector: Injector) {
		super(injector);
	}

	public BackToParent(): void {
		this.navigationService.backToParent();
	}
}
