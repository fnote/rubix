import { Component, Injector } from '@angular/core';
import { BaseWidgetComponent } from '../../widget-util/base-widget/base-widget.component';
import { MutualFundsDataStore } from '../../../app-backend/price/data-stores/mutual-funds-data-store';
import { StrategyTypes } from '../../../app-constants/enums/strategy-typs.enum';

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
	public mutualFundCategoryObj: Object;
	private _strategy: {type: number};

	constructor(private injector: Injector, private mutualFundsDataStore: MutualFundsDataStore) {
		super(injector);
	}

	public onInit(): void {
		let region: string;
		switch (this._strategy.type) {
			case StrategyTypes.Global:
				region = 'Global';
				break;
			case StrategyTypes.Regional:
				region = 'Regional';
				break;
			case StrategyTypes.ShariaCompliant:
				region = 'Sharia';
				break;
			default:
				region = '';
		}
		this.mutualFundCategoryObj = this.mutualFundsDataStore.getItemsByRegion(region);
	}

	public get strategy(): {type: number} {
		return this._strategy;
	}

	public set strategy(value: {type: number}) {
		this._strategy = value;
	}
}
