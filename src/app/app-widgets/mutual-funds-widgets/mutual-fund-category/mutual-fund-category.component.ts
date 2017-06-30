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
	public titleKey = 'REGION_TITLE_1';
	private _strategy: {type: string};

	constructor(private injector: Injector, private mutualFundsDataStore: MutualFundsDataStore, private localizationService: LocalizationService) {
		super(injector);
	}

	public onInit(): void {
		let region: string;
		if (this.strategy && this.strategy.type) {
			region = this._strategy.type;
			this.titleKey = 'REGION_TITLE_' + region.toString();
		}
		this.mutualFundsDataStore.dataLoadedObserver.subscribe(isDataLoaded => {
			const dataObj: any = this.mutualFundsDataStore.getItemsByRegion(region);
			for (const key in dataObj) {
				if (dataObj.hasOwnProperty(key)) {
					dataObj[key].title = this.localizationService.language['STRATEGY_' + dataObj[key].riskType];
					dataObj[key].headerClass = 'strat-' + dataObj[key].riskType;
					dataObj[key].imageUrl = '../../../../assets/assets/images/strat-' + dataObj[key].riskType + '.svg';
					dataObj[key].classLastLstOneM = (dataObj[key].percentageOneMonth >= 0) ? 'green-text' : 'red-text';
					dataObj[key].classLastLstThreeM = (dataObj[key].percentageThreeMonth >= 0) ? 'green-text' : 'red-text';
				}
			}
			this.mutualFundCategoryObj = dataObj;
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
