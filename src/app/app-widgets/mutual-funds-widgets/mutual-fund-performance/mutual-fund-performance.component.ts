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

	private regionsArray = [];
	private riskTypesArray = [];
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
		this.regionsArray = this.mutualFundsDataStore.regionArray;
		this.riskTypesArray = this.mutualFundsDataStore.riskTypeArray;
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

		for (const riskType of this.riskTypesArray) {
			chartDataRaw = [riskType.description];

			for (const region of this.regionsArray) {
				chartDataRaw.push(this.mutualFundsDataStore.getItemsByRegionAndRiskType(region.id, riskType.id).chartDataMap[this.chartPeriod] || 0);
			}
			this.chartData.push(chartDataRaw);

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
