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

	public mutualFundCategoryObj: Object;
	private _strategy: {type: number};

	constructor(private injector: Injector, private mutualFundsDataStore: MutualFundsDataStore) {
		super(injector);
	}

	public onInit(): void {
		let region: number;
		if (this.strategy && this.strategy.type) {
			region = this._strategy.type;
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
