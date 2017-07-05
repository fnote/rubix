import { BaseDataStore } from './base-data-store';
import { CommonHelperService } from '../../../app-utils/helper/common-helper.service';
import { Injectable } from '@angular/core';
import { MutualFundEntity } from '../business-entities/mutual-fund-entity';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class MutualFundsDataStore extends BaseDataStore {

	private fundByRegionStore = {};
	private fundByRiskTypeStore = {};
	private fundBySymbolStore = {};
	private  _regionArray = [];
	private  _riskTypeArray = [];
	private $dataLoaded = new Subject();
	private $detaildataLoaded = new Subject();

	constructor(private commonHelperService: CommonHelperService) {
		super();
	}

	public get dataLoadedObserver(): Subject<boolean> {
		return this.$dataLoaded;
	}

	public get detailDataLoadedObserver(): Subject<boolean> {
		return this.$detaildataLoaded;
	}

	public get regionArray(): Array<{id: string, description: string}> {
		return this._regionArray;
	}

	public get riskTypeArray(): Array<{id: string, description: string}> {
		return this._riskTypeArray;
	}

	public getItemsByRegion(region: string): any {

		let data = this.fundByRegionStore[region];

		if (!data) {
			data = {};
			this.fundByRegionStore[region] = data;

		}

		return data;
	}

	public getItemsByRiskType(riskType: string): any {

		let data = this.fundByRiskTypeStore[riskType];

		if (!data) {
			data = {};
			this.fundByRiskTypeStore[riskType] = data;

		}

		return data;
	}

	public getMutualFundSymbol(symbolCode: string): MutualFundEntity {

		return this.fundBySymbolStore[symbolCode];

	}

	public getItemsByRegionAndRiskType(region: string, riskType: string): MutualFundEntity {
		if (this.fundByRegionStore[region] && this.fundByRegionStore[region][riskType]) {
			return this.fundByRegionStore[region][riskType];
		} else {
			return null;
		}
	}

	public updateMutualFunds(response: any): void {
		this.updateRegionData(response.GEO);
		this.updateRiskTypeData(response.CLASS);
		this.updateMasterData(response.MASTER);
		this.addChartData(response.ANNUAL);
		this.addPerformanceData(response.PERFORM);
		this.$dataLoaded.next(true);
	}

	public updateMutualFundsDetails(response: any): void {
		const symbolCode = response.MASTER[0].symbolCode;
		this.updateSymbolStaticsData(response.MONTHLY, symbolCode);
		this.setReportData(response.FACTS, symbolCode);
		this.setBenchMarkData(response.PERFORM, symbolCode);
		this.$detaildataLoaded.next(true);
	}

	public updateRegionData(values: {id: string, description: string}[]): void {
		this._regionArray.length = 0;

		for (const item of values){
			this._regionArray.push(item);
		}
	}

	public updateRiskTypeData(values: {id: string, description: string}[]): void {
		this._riskTypeArray.length = 0;

		for (const item of values){
			this._riskTypeArray.push(item);
		}
	}

	public updateMasterData(values: {
		exchangeCode: string,
		symbolCode: string,
		region: string,
		riskType: string,
		description: string,
		fullDescription: string,
		shortDescription: string,
		currency: string,
		decimalPlaces: number,
		benchMark: string}[]): void {

		let description;

		for (const masterDataItem of values){
			const itemsByRegion = this.getItemsByRegion(masterDataItem.region);
			const itemsByRiskType = this.getItemsByRiskType(masterDataItem.riskType);
			let mutualFundDataEntity = itemsByRegion[masterDataItem.riskType];

			if (!mutualFundDataEntity) {
				mutualFundDataEntity = new MutualFundEntity();
				mutualFundDataEntity.commonHelperService = this.commonHelperService;
				itemsByRegion[masterDataItem.riskType] = mutualFundDataEntity;
				itemsByRiskType[masterDataItem.region] = mutualFundDataEntity;
				this.fundBySymbolStore[masterDataItem.symbolCode] = mutualFundDataEntity;
			}
			mutualFundDataEntity.decimalPlaces = masterDataItem.decimalPlaces;
			mutualFundDataEntity.setValues(masterDataItem);
			description = this.riskTypeArray.filter(function(item: {id: string, description: string}): boolean{
				return item.id === masterDataItem.riskType;
			});
			mutualFundDataEntity.riskTypeDescription = description[0].description;

			description = this.regionArray.filter(function(item: {id: string, description: string}): boolean{
				return item.id === masterDataItem.region;
			});
			mutualFundDataEntity.regionDescription = description[0].description;

		}

	}

	public addChartData(values: {
		exchangeCode: string,
		symbolCode: string,
		M6: number,
		Y1: number,
		Y3: number,
		Y5: number,
	}[]): void {
		for (const item of values){

			const mutualFundDataEntity = this.fundBySymbolStore[item.symbolCode];
			mutualFundDataEntity.addchartData('6M', item.M6);
			mutualFundDataEntity.addchartData('1Y', item.Y1);
			mutualFundDataEntity.addchartData('3Y', item.Y3);
			mutualFundDataEntity.addchartData('5Y', item.Y5);
		}
	}

	public addPerformanceData(values: {
		exchangeCode: string,
		symbolCode: string,
		percentageOneMonth: string,
		percentageThreeMonth: number,
	}[]): void {
		for (const item of values){

			const mutualFundDataEntity = this.fundBySymbolStore[item.symbolCode];
			mutualFundDataEntity.setValues(item);
		}
	}

	public updateSymbolStaticsData(values: {
		averageMarketCap: number,
		bond: number,
		cash: number,
		excessReturn: number,
		expenseRatio: number,
	}[], symbolCode: string): void {
		for (const item of values){
			const mutualFundDataEntity = this.fundBySymbolStore[symbolCode];
			mutualFundDataEntity.setValues(item);
		}

	}

	public setReportData(values: {
		file: string,
		month: string,
		year: number,
	}[], symbolCode: string): void {
		const mutualFundDataEntity = this.fundBySymbolStore[symbolCode];
		mutualFundDataEntity.reportData = values;
	}

	public setBenchMarkData(values: {
		benchMark: number,
		date: number,
		value: number,
	}[], symbolCode: string): void {
		const mutualFundDataEntity = this.fundBySymbolStore[symbolCode];
		mutualFundDataEntity.benchmarkData = values;
	}

	public getMutualFundReportData(symbolCode: string): [number, { file: string, month: string}[]][] {
		const files: [number, { file: string, month: string}[]][] = [];
		const reportData: { file: string, month: string, year: number}[] = this.fundBySymbolStore[symbolCode].reportData;

		reportData.forEach((item) => {
			const filesForYear = files.find((entry) => { return entry[0] === item.year; });
			if (filesForYear === undefined) {
				files.push([item.year, [{ month: item.month, file: item.file }] ]);
			} else {
				filesForYear[1].push({ month: item.month, file: item.file });
			}
			// files.find((entry)=>{ return entry[0] === item.year})[1].push({month : '08', file: 'efefefe'});
		});
		// files.push([2018, [{month : '08', file: 'fgfrgrgr'}]]);
		return files;
	}
}
