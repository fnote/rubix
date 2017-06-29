import { Component, Injector } from '@angular/core';
import { BaseWidgetComponent } from '../../widget-util/base-widget/base-widget.component';

@Component({
	selector: 'app-mutual-fund-category',
	templateUrl: './mutual-fund-category.component.html',
	styleUrls: ['./mutual-fund-category.component.scss'],
})

export class MutualFundCategoryComponent extends BaseWidgetComponent {

	public contentData = [
		{ imageUrl: 'img/img_one.png', title: 'Growth Strategy', discription: 'For Aggressive investors who wish to Sharia Compliant mutual funds' },
		{ imageUrl: 'img/img_two.png', title: 'Growth Strategy', discription: 'For Aggressive investors who wish to Sharia Compliant mutual funds' },
		{ imageUrl: 'img/img_three.png', title: 'Growth Strategy', discription: 'For Aggressive investors who wish to Sharia Compliant mutual funds' },
		{ imageUrl: 'img/img_four.png', title: 'Growth Strategy', discription: 'For Aggressive investors who wish to Sharia Compliant mutual funds' },
		{ imageUrl: 'img/img_five.png', title: 'Growth Strategy', discription: 'For Aggressive investors who wish to Sharia Compliant mutual funds' },
	];

	private _strategy: Object;

	constructor(private injector: Injector) {
		super(injector);
	}

	public get strategy(): Object {
		return this._strategy;
	}

	public set strategy(value: Object) {
		this._strategy = value;
	}

	// ngOnInit() {
	// }

}
