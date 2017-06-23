import { ReplaySubject, Subject } from 'rxjs/Rx';
import { BaseDataStore } from './base-data-store';
import { ChartDataEntity } from '../business-entities/chart-data-entity';
import { CommonHelperService } from '../../../app-utils/helper/common-helper.service';
import { Injectable } from '@angular/core';
import { StockDataStore } from './stock-data-store';

@Injectable()
export class ChartDataStore extends BaseDataStore {

	private historyStore = {};
	private ohlcStore = {};
	public id;

	constructor(private stockDataStore : StockDataStore) {
		super();
	}

	public getHistory(exgSym: [string, string]): ReplaySubject<ChartDataEntity[]> {

		const key: string = exgSym[0] + '~' + exgSym[1];
		let historyArray$ = this.historyStore[key];

		if (!historyArray$) {
			historyArray$ = new ReplaySubject(1);
			this.historyStore[key] = historyArray$;
			historyArray$.next([]);
		}
		return historyArray$;
	}

	public getOHLC(exgSym: [string, string]): ReplaySubject<ChartDataEntity[]> {

		const key: string = exgSym[0] + '~' + exgSym[1];
		let historyArray$ = this.ohlcStore[key];

		if (!historyArray$) {
			historyArray$ = new ReplaySubject(1);
			this.ohlcStore[key] = historyArray$;
		}

		return historyArray$;
	}

	public updateHistory(values: {
		HIST: {
			highPrice: number,
			lowPrice: number,
			closePrice: number,
			openPrice: number,
			volume: number,
			date: number,
		}[],
		TKN: string,
	}): void {
		const key = values.TKN;
		const exgSym = key.split(',');
		const historyArray$ = this.historyStore[key];
		const historyArray = [];
		let dataEntity;

		for (const item of values.HIST){
			dataEntity = new ChartDataEntity(item);
			dataEntity.decimalPlaces = this.stockDataStore.getOrAddStock([exgSym[0], exgSym[1]]).decimalPlaces;
			historyArray.push(dataEntity);
		}
		historyArray$.next(historyArray);
	}

	public updateOHLCHistory(values: {
		HIST: {
			highPrice: number,
			lowPrice: number,
			closePrice: number,
			openPrice: number,
			volume: number,
			date: number,
		}[],
		TKN: string,
	}): void {
		const key = values.TKN;
		const exgSym = key.split(',');
		const historyArray$ = this.ohlcStore[key];
		const historyArray = [];
		let dataEntity;

		for (const item of values.HIST){
			dataEntity = new ChartDataEntity(item);
			dataEntity.isHistory = false;
			dataEntity.decimalPlaces = this.stockDataStore.getOrAddStock([exgSym[0], exgSym[1]]).decimalPlaces;
			historyArray.push(dataEntity);
		}
		historyArray$.next(historyArray);
	}

	public updateOHLC(values: {
		highPrice: number,
		lowPrice: number,
		exchangeCode: string,
		closePrice: number,
		openPrice: number,
		volume: number,
		date: number,
		TKN: string,
		symbolCode: string,
		turnOver: string,
		vwap: string,
	}): void {
		const key = values.exchangeCode + '~' + values.symbolCode;
		const exgSym = [values.exchangeCode, values.symbolCode];
		const ohlcArray$ = this.ohlcStore[key];
		const dataEntity = new ChartDataEntity(values);

		dataEntity.isHistory = false;
		dataEntity.decimalPlaces = this.stockDataStore.getOrAddStock([exgSym[0], exgSym[1]]).decimalPlaces;

		ohlcArray$.next([dataEntity]);
	}
}
