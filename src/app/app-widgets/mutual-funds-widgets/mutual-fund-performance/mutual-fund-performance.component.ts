import * as c3 from 'c3';
import { Component, Injector } from '@angular/core';
import { BaseWidgetComponent } from '../../widget-util/base-widget/base-widget.component';
import { MutualFundsDataStore } from '../../../app-backend/price/data-stores/mutual-funds-data-store';
import { PriceService } from '../../../app-backend/price/price.service';
import { performanceChartDurations } from '../../../app-constants/const/performance-chart-durations';

@Component({
	selector: 'app-mutual-fund-performance',
	templateUrl: './mutual-fund-performance.component.html',
	styleUrls: ['./mutual-fund-performance.component.scss'],
})
export class MutualFundPerformanceComponent extends BaseWidgetComponent {

	private regionMetaMap;
	private riskTypeMetaMap;
	private dataLoaded = false;
	private chartData = [];
	private chartPeriod = performanceChartDurations.sixMonths;
	private dataLoadedSubscription;

	constructor(private priceService: PriceService, private injector: Injector, private mutualFundsDataStore: MutualFundsDataStore) {
		super(injector);
	}

	public onInit(): void {
		this.dataLoadedSubscription = this.mutualFundsDataStore.dataLoadedObserver.subscribe(dataLoaded => {
			if (dataLoaded) {
				this.dataLoaded = true;
				this.loadChartData();
				this.drawChart();
			}
		});
		this.regionMetaMap = this.mutualFundsDataStore.regionMetaMap;
		this.riskTypeMetaMap = this.mutualFundsDataStore.riskTypeMetaMap;
		this.subscribeForMutualFund();
	}

	public onDestroy(): void {
		this.dataLoadedSubscription.unsubscribe();
	}

	public onChartPeriodChange(period: string): void {
		this.chartPeriod = period;
		this.loadChartData();
		this.drawChart();
	}

	private loadChartData(): void {
		let chartDataRaw;

		for (const riskType in this.riskTypeMetaMap) {
			if (this.riskTypeMetaMap.hasOwnProperty(riskType)) {
				chartDataRaw = [this.riskTypeMetaMap[riskType]];
				for (const region in this.regionMetaMap) {
					if (this.regionMetaMap.hasOwnProperty(region)) {
						chartDataRaw.push(this.mutualFundsDataStore.getItemsByRegionAndRiskType(region, riskType).chartDataMap[this.chartPeriod] || 0);
					}
				}
				this.chartData.push(chartDataRaw);
			}
		}
	}

	private drawChart(): void {
		const areaChart = c3.generate({
			bindto: '#fundPerformanceC3Chart',
			legend: {
				show: false,
			},
			data: {
				columns: this.chartData,
				type: 'bar',
			},
			bar: {
				width: {
					ratio: 0.5,
				},
			},
		});
	}

	private subscribeForMutualFund(): void {
		const seg = ['MASTER', 'PERFORM', 'ANNUAL', 'CLASS', 'GEO'];
		this.priceService.addMutualFundRequest(seg);
	}

}
