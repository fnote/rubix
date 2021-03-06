import * as c3 from 'c3';
import { Component, Injector } from '@angular/core';
import { BaseWidgetComponent } from '../../widget-util/base-widget/base-widget.component';
import { LocalizationService } from '../../../app-utils/localization/localization.service';
import { MutualFundsDataStore } from '../../../app-backend/price/data-stores/mutual-funds-data-store';
import { PriceService } from '../../../app-backend/price/price.service';
import { performanceChartDurations } from '../../../app-constants/const/performance-chart-durations';

@Component({
	selector: 'app-mutual-fund-performance',
	templateUrl: './mutual-fund-performance.component.html',
})
export class MutualFundPerformanceComponent extends BaseWidgetComponent {

	public regionsArray = [];
	public riskTypesArray = [];
	public chartData = [];
	public chartXAxisLables = [];
	public chartPeriod = performanceChartDurations.sixMonths;
	private dataLoaded = false;
	private dataLoadedSubscription;

	constructor(private priceService: PriceService,
		private injector: Injector,
		private mutualFundsDataStore: MutualFundsDataStore,
		public localizationService: LocalizationService) {
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

		this.chartData = [];
		this.chartXAxisLables = [];

		for (const riskType of this.riskTypesArray) {
			chartDataRaw = [riskType.description];

			for (const region of this.regionsArray) {
				chartDataRaw.push(this.mutualFundsDataStore.getItemsByRegionAndRiskType(region.id, riskType.id).chartDataMap[this.chartPeriod] || 0);
				this.chartXAxisLables.push(region.description);
			}

			this.chartData.push(chartDataRaw);
		}
	}

	private drawChart(): void {
		// TODO: [Amila] Discuss withe Dinushka and refactor below bar coloring algorithm. It must be picked from the theme files.
		const anuualizedChart = c3.generate({
			bindto: '#fundPerformanceC3Chart',
			data: {
				columns: this.chartData,
				type: 'bar',
				/*color: function (color, d) {
				if (d === 'Growth') {
					return '#81b6e3';
				} else if (d === 'Balanced') {
					return '#6aa76e';
				} else if (d === 'Prudent') {
					return '#ecb127';
				}
			},*/
			},
			color: {
				// TODO: [Amila] find a way to load below form CSS
				pattern: ['#81b6e3', '#6aa76e', '#ecb127', '#a35dba'],
			},
			bar: {
				width: {
					ratio: 0.75,
				},
			},
			axis: {
				x: {
					type: 'category',
					categories: this.chartXAxisLables,
				},
				y: {
					label: {
						text: this.localizationService.language.ANNUALIZED_PCNT,
						position: 'outer-middle',
					},
				},
			},
			legend: {
				show: false,
			},
			grid: {
				y: {
					show: true,
				},
			},
		});
	}

	private subscribeForMutualFund(): void {
		const segment = ['MASTER', 'PERFORM', 'ANNUAL', 'CLASS', 'GEO'];
		const exchanges = ['MFS_FS`TKUD'];
		const providers = ['TAKAUD'];

		this.priceService.addMutualFundRequest(segment, exchanges, providers);
	}

}
