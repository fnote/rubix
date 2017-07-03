import { Component, Injector } from '@angular/core';
import { BaseWidgetComponent } from '../../widget-util/base-widget/base-widget.component';
import { LocalizationService } from '../../../app-utils/localization/localization.service';
import { MutualFundsDataStore } from '../../../app-backend/price/data-stores/mutual-funds-data-store';
import { StrategyTypes } from '../../../app-constants/enums/strategy-typs.enum';

@Component({
	selector: 'app-mutual-fund-category',
	templateUrl: './mutual-fund-category.component.html',
	styleUrls: ['./mutual-fund-category.component.scss'],
})

export class MutualFundCategoryComponent extends BaseWidgetComponent {

	public mutualFundCategoryObj: Object;
	private _strategy: {type: string};

	constructor(private injector: Injector, private mutualFundsDataStore: MutualFundsDataStore, public localizationService: LocalizationService) {
		super(injector);
	}

	public onInit(): void {
		let region: string;
		if (this.strategy && this.strategy.type) {
			region = this._strategy.type;
		}
		this.mutualFundsDataStore.dataLoadedObserver.subscribe(isDataLoaded => {
			this.mutualFundCategoryObj = this.mutualFundsDataStore.getItemsByRegion(region);
		});
	}

	public get strategy(): {type: string} {
		return this._strategy;
	}

	public set strategy(value: {type: string}) {
		this._strategy = value;
	}

	public loadDetailedView(category: string): void {
		const data = { strategy : this.strategy.type, category: category };
		const pathArray = [
			'/two-by-one-layout', { outlets: {
				outlet1 : ['mutual-fund-overview'],
				outlet2 : ['mutual-fund-benchmark'],
				outlet3 : ['mutual-fund-report'],
			}},
		];
		this.navigationService.goToChildView(pathArray , data);
	}

}
