import { Component, Injector } from '@angular/core';
import { BaseWidgetComponent } from '../../app-widgets/widget-util/base-widget/base-widget.component';

@Component({
	selector: 'app-two-by-one-layout',
	templateUrl: './two-by-one-layout.component.html',
	styleUrls: ['./two-by-one-layout.component.scss'],
})
export class TwoByOneLayoutComponent extends BaseWidgetComponent {
	constructor(injector: Injector) {
		super(injector);
	}

	public BackToParent(): void {
		this.navigationService.backToParent();
	}

}
