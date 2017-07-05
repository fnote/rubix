import * as c3 from 'c3';
import { Component, Injector, OnInit } from '@angular/core';
import { Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { BaseWidgetComponent } from '../../../widget-util/base-widget/base-widget.component';
import { ChartDataStore } from '../../../../app-backend/price/data-stores/chart-data-store';
import { PriceService } from '../../../../app-backend/price/price.service';
import { ProcessedChartDataStore } from '../../../../app-backend/price/data-stores/processed-chart-data-store';
import { StockDataStore } from '../../../../app-backend/price/data-stores/stock-data-store';
import { widgetQueryParams } from '../../../../app-constants/const/widget-query-params';

@Component({
	selector: 'app-chart',
	templateUrl: './base-c3-chart.component.html',
	providers: [ProcessedChartDataStore],
})
export class BaseC3ChartComponent extends BaseWidgetComponent /*implements OnChanges*/{
	@Input() public data;

	public stockObj;
	public chartData;
	public chartOptions = {
		legend: {
			show: false,
		},
		data: {
			color: null,
		},
		axis: {
			x: { show: false },
			y: { show: false },
		},
	};

	private period = '1m'; // TODO [Malindu]:put these in constants
	private isOHLC = true;
	private subscription$;

	constructor(
		private priceService: PriceService,
		private chartDataStore: ChartDataStore,
		private processedChartDataStore: ProcessedChartDataStore,
		private stockDataStore: StockDataStore, injector: Injector,
	) {
		super(injector);
	}

	public onInit(): void {
		const paramSymbol = this.getQueryParam(widgetQueryParams.SYMBOL);
		const paramExg = this.getQueryParam(widgetQueryParams.EXCHANGE);
		const chartData = [];

		if (paramSymbol && paramExg) {
			this.exgStock = [paramExg.toUpperCase(), paramSymbol.toUpperCase()];
		}

		this.stockObj = this.stockDataStore.getOrAddStock(this.exgStock);
		this.priceService.addSymbolRequest(this.exgStock);

		this.getDataAndDrawChart(this.exgStock, this.period);
	}

	public getDataAndDrawChart(exgStock: [string, string], period: string): void {
		this.exgStock = exgStock;
		let chartData = [];
		chartData.push('chartData');
		if (this.isOHLC) {
			if (this.subscription$) {
				this.subscription$.unsubscribe();
			}

			this.subscription$ = this.processedChartDataStore.getOHLC(exgStock, period).subscribe(data => {
				chartData = [];
				chartData.push('chartData');
				if (data.length !== 0) {
					for (const item of data) {
						chartData.push(item.rawClosePrice);
					}
					this.drawChart(chartData);
				}
			});

		} else {
			this.subscription$ = this.processedChartDataStore.getHistory(exgStock, period).subscribe(history => {
				if (history.length !== 0) {
					for (const item of history) {
						chartData.push(item.rawClosePrice);
					}
					this.drawChart(chartData);
				}
			});
		}
	}

	public onDestroy(): void {
		if (this.subscription$) {
			this.subscription$.unsubscribe();
		}
		this.processedChartDataStore.removeSubscriptions(this.exgStock); // this should be OHLC subscribed symbol
	}

	private drawChart(data: Array<number>): void {
		this.chartData = data;
	}

}
