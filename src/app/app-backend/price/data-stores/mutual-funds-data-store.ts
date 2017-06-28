import { BaseDataStore } from './base-data-store';
import { CommonHelperService } from '../../../app-utils/helper/common-helper.service';
import { Injectable } from '@angular/core';
import { MutualFundEntity } from '../business-entities/mutual-fund-entity';

@Injectable()
export class MutualFundsDataStore extends BaseDataStore {

	private fundByRegionStore = {};
	private fundByRiskTypeStore = {};
	private fundBySymbolStore = {};
	private _regionArray = [];
	private _riskTypeArray = [];

	constructor(private commonHelperService: CommonHelperService) {
		super();
	}

	public get regionArray(): Array<string> {
		return this._regionArray;
	}

	public get riskTypeArray(): Array<string> {
		return this._riskTypeArray;
	}

	public getItemsByRegion(region: string): Array<MutualFundEntity> {

		let dataArray = this.fundByRegionStore[region];

		if (!dataArray) {
			dataArray = {};
			this.fundByRegionStore[region] = dataArray;

		}

		return dataArray;
	}

	public getItemsByRiskType(riskType: string): Array<MutualFundEntity> {

		let dataArray = this.fundByRiskTypeStore[riskType];

		if (!dataArray) {
			dataArray = {};
			this.fundByRiskTypeStore[riskType] = dataArray;

		}

		return dataArray;
	}

	public updateMutualFunds(response: any): void {

		this.updateMasterData(response.MASTER);
		this.addChartData(response.ANNUAL);
		this.addPerformanceData(response.PERFORM);
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
		benchMark: string}[]): void {

		for (const masterDataItem of values){
			const itemsByRegion = this.getItemsByRegion(masterDataItem.region);
			const itemsByRiskType = this.getItemsByRiskType(masterDataItem.riskType);
			let mutualFundDataEntity = itemsByRegion[masterDataItem.riskType];

			if (!mutualFundDataEntity) {
				if (this._regionArray.indexOf(masterDataItem.region) < 0) {
					this._regionArray.push(masterDataItem.region);
				}
				if (this._riskTypeArray.indexOf(masterDataItem.riskType) < 0) {
					this._riskTypeArray.push(masterDataItem.riskType);
				}
				mutualFundDataEntity = new MutualFundEntity();
				mutualFundDataEntity.commonHelperService = this.commonHelperService;
				itemsByRegion[masterDataItem.riskType] = mutualFundDataEntity;
				itemsByRiskType[masterDataItem.region] = mutualFundDataEntity;
				this.fundBySymbolStore[masterDataItem.symbolCode] = mutualFundDataEntity;
			}

			mutualFundDataEntity.setValues(masterDataItem);

		}

	}

	public addChartData(values: {
		exchangeCode: string,
		symbolCode: string,
		duration: string,
		value: number,
	}[]): void {
		for (const item of values){

			const mutualFundDataEntity = this.fundBySymbolStore[item.symbolCode];
			mutualFundDataEntity.addchartData(item.duration, item.value);
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
}
