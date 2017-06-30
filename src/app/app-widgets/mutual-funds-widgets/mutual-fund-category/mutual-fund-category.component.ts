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
		this.mutualFundsDataStore.dataLoadedObserver.subscribe(isDataLoaded => {
			const dataObj: any = this.mutualFundsDataStore.getItemsByRegion(region);
			for (const key in dataObj) {
				if (dataObj.hasOwnProperty(key)) {
					dataObj[key].title = 'Growth Strategy'; // [todo] get the title according to the risk type from localization service
					dataObj[key].headerClass = 'strat-' + dataObj[key].riskType;
					dataObj[key].imageUrl = '../../../../assets/assets/images/strat-' + dataObj[key].riskType + '.svg';
					dataObj[key].classLastLstOneM = (dataObj[key].percentageOneMonth >= 0) ? 'green-text' : 'red-text';
					dataObj[key].classLastLstThreeM = (dataObj[key].percentageThreeMonth >= 0) ? 'green-text' : 'red-text';
				}
			}
			this.mutualFundCategoryObj = dataObj;
		});
	}

	public get strategy(): {type: number} {
		return this._strategy;
	}

	public set strategy(value: {type: number}) {
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
