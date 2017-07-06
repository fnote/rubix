import { Observable, ReplaySubject, Subject } from 'rxjs/Rx';
import { BaseDataStore } from './base-data-store';
import { ChartDataEntity } from '../business-entities/chart-data-entity';
import { ChartDataStore } from './chart-data-store';
import { Injectable } from '@angular/core';
import { PriceService } from '../price.service';
import { chartDurations } from '../../../app-constants/enums/chart-durations';

const TIME_RATIO = 86400000; // 24 * 60 * 60 * 1000
const OHLC_TIME_RATIO = 60000; // 60 * 1000
const MILLS_PER_DAY = 86400000; // 24 * 3600 * 1000
const DAYS_PER_WEEK = 7;
const DAYS_PER_MONTH = 30;

@Injectable()
export class ProcessedChartDataStore extends BaseDataStore {

	private history$: ReplaySubject<any> ;
	private ohlc$: ReplaySubject<any> ;
	private subscription$;
	private ohlcCache = [];
	private exgSym: [string, string];

	constructor(private chartDataStore: ChartDataStore, private priceService: PriceService) {
		super();
		this.history$ = new ReplaySubject(1);
		this.ohlc$ = new ReplaySubject(1);
	}

	public removeSubscriptions(exgSym: [string, string]): void {
		if (this.subscription$) {
			this.subscription$.unsubscribe();
		}
		this.priceService.removeChartOHLCRequest(exgSym);
	}

	public getHistory(exgSym: [string, string], period: number): ReplaySubject<ChartDataEntity[]> {
		this.priceService.requestSymbolMeta(exgSym);
		this.priceService.addChartHistoryRequest(exgSym);
		if (this.subscription$) {
			this.subscription$.unsubscribe();
		}

		this.subscription$ = this.chartDataStore.getHistory(exgSym).subscribe(historydata => {
			if (historydata.length !== 0) {
				this.history$.next(this.filterChartData(historydata, period, TIME_RATIO));
			}

		});

		return this.history$;
	}

	public getOHLC(exgSym: [string, string], period: number): ReplaySubject<ChartDataEntity[]> {

		if (this.subscription$) {
			this.subscription$.unsubscribe();
		}

		if (this.exgSym) {
			if (exgSym[0] !== this.exgSym[0] || exgSym[1] !== this.exgSym[1]) {// new symbol
				this.priceService.removeChartOHLCRequest(this.exgSym);
				this.ohlcCache = [];
				this.priceService.requestSymbolMeta(exgSym);
				this.priceService.addChartOHLCRequest(exgSym);
				this.priceService.addChartOHLCBacklogRequest(exgSym);
				this.exgSym = exgSym;
				this.ohlc$ = new ReplaySubject(1);
			}
		} else {
			this.priceService.requestSymbolMeta(exgSym);
			this.priceService.addChartOHLCRequest(exgSym);
			this.priceService.addChartOHLCBacklogRequest(exgSym);
			this.exgSym = exgSym;
		}

		this.subscription$ = this.chartDataStore.getOHLC(exgSym).subscribe(historydata => {
			if (historydata.length !== 0) {
				this.ohlcCache = this.ohlcCache.concat(historydata);
				this.ohlcCache = this.removeDuplicates(this.ohlcCache);
				this.ohlc$.next(this.filterChartData(this.ohlcCache, period, OHLC_TIME_RATIO));
			}
		});

		return this.ohlc$;
	}

	private removeDuplicates(ohlcCache: ChartDataEntity[]): ChartDataEntity[] {
		const tempArray = [];
		ohlcCache.sort(function(a: ChartDataEntity, b: ChartDataEntity): number{ return a.rawDate - b.rawDate; });
		let previousValue = ohlcCache[0];
		tempArray.push(previousValue);
		let newItem;

		for (let i = 1; i < ohlcCache.length; i++) {
			newItem = ohlcCache[i];
			if (newItem.rawDate !== previousValue.rawDate) {
				previousValue = ohlcCache[i];
				tempArray.push(previousValue);
			}
		}
		return tempArray;
	}

	private filterChartData(dataArray: ChartDataEntity[], period: number, factor: number): ChartDataEntity[] {
		// Data comes in date ascending order
		let periodMills = 0;
		let fromDate = 0;
		let toDate = 0;
		let fromIndex = 0;

		switch (period) {
			case chartDurations.oneDay:
				periodMills = 1;
				break;
			case chartDurations.oneWeek:
				periodMills = DAYS_PER_WEEK;
				break;
			case chartDurations.oneMonth:
				periodMills = DAYS_PER_MONTH;
				break;
			case chartDurations.threeMonths:
				periodMills = 3 * DAYS_PER_MONTH;
				break;
		}

		dataArray.sort(function(a: ChartDataEntity, b: ChartDataEntity): number{ return a.rawDate - b.rawDate; });

		periodMills = periodMills * MILLS_PER_DAY;
		toDate = dataArray[dataArray.length - 1].rawDate;
		fromDate = toDate * factor - periodMills;
		fromDate = fromDate / factor;

		let ind = 0;

		for (const item of dataArray) {
			if (item.rawDate >= fromDate) {
				fromIndex = ind;
				break;
			}
			ind++;
		}

		return dataArray.slice(fromIndex, dataArray.length);
	}
}
