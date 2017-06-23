import { BaseDataStore } from './base-data-store';
import { CommonHelperService } from '../../../app-utils/helper/common-helper.service';
import { ConfigService } from '../../../app-config/config.service';
import { Injectable } from '@angular/core';
import { StockDataStore } from './stock-data-store';
import { TrackRecordEntity } from '../business-entities/track-record-entity';
import { TradingAdviceEntity } from '../business-entities/trading-advice-entity';
import { UserState } from '../../../app-backend/auth/user-state';

@Injectable()
export class AdviceDataStore extends BaseDataStore {

	private rtaDataArray: TradingAdviceEntity[] = [];
	private rtaTrackRecordDataArray: TradingAdviceEntity[] = [];
	private trackRecordEntity: TrackRecordEntity;
	private exgSym: [string, string] = ['' ,  ''];

	constructor(
		private stockDataStore: StockDataStore,
		private configService: ConfigService,
		private commonHelperService: CommonHelperService,
	) {
		super();
		this.trackRecordEntity = new TrackRecordEntity();
		this.trackRecordEntity.commonHelperService = commonHelperService;
	}

	public getRTADataArray(): TradingAdviceEntity[] {
		return this.rtaDataArray;
	}

	public getRTATrackRecordDataArray(): TradingAdviceEntity[] {
		return this.rtaTrackRecordDataArray;
	}

	public getRTATrackRecordData(): TrackRecordEntity {
		return this.trackRecordEntity;
	}

	public reset(exgSym: [string, string]): void {
		this.exgSym = exgSym;
		this.rtaDataArray.length = 0;
	}

	public updateTradingAdvices(values: any): void {
		if (values.RTATR) {// Track Record response
			this.resetTrackRecordData();
			if (values.RTA) {
				for (const rta of values.RTA){
					this.addRTA(rta, true);
				}
			}
			// this.addTrackRecordData(values.RTATR[0], values.NOR);

		}else {
			if (values.RTA) {
				for (const rta of values.RTA){
					this.addRTA(rta, false);
				}
			}else {
				this.addRTA(values, false); // Realtime
			}
		}
	}

	public resetTrackRecordData(): void {
		this.rtaTrackRecordDataArray.length = 0;
	}

	public addTrackRecordData(values: {
		symbolCode: string,
		exchangeCode: string,
		bestSymbolRate: string,
		successRate: string,
		averageReturn: string,
		marketIndex: string,
		startDate: string,
		endDate: string,
	},
		numberOfRecords: number): void {
		const trackRecordEntity = this.trackRecordEntity;

		trackRecordEntity.setValues(values);
		trackRecordEntity.successRate = (Math.round(100 * parseFloat(values.successRate) / numberOfRecords)).toString() + '%';
		trackRecordEntity.displaySymbol = trackRecordEntity.symbolCode + '.' + trackRecordEntity.exchangeCode;
		// TODO :[Malindu] correctly implement the above.
	}

	public addRTA(values: {
		symbolCode: string,
		exchangeCode: string,
		title: string,
		date: string,
		startDate: string,
		endDate: string,
		unrealizedReturn: string,
		remainingPotential: string,
		entryPrice: string,
		stopLoss: string,
		takeProfit: string,
		exitPrice: string,
		indexPercentageChange: string,
		realizedProfit: string,
		report: string,
		action: string,
		gicsL4: string,
		companyId: string,

	},
		isTrackRecordResponse: boolean): void {

		const rtaDataArray = isTrackRecordResponse ? this.rtaTrackRecordDataArray : this.rtaDataArray;
		const rtaDataEntity = new TradingAdviceEntity();
		const exgSym: [string, string] = [values.symbolCode, values.exchangeCode];
		const stockObject = this.stockDataStore.getOrAddStock(exgSym);

		rtaDataEntity.commonHelperService = this.commonHelperService;
		rtaDataEntity.decimalPlaces = this.stockDataStore.getOrAddStock(exgSym).decimalPlaces;
		rtaDataEntity.setValues(values);
		rtaDataEntity.isTradable = true;

		this.configService.getStringConfigVal('companyLogo').then(companyLogoUrl => {
			rtaDataEntity.imageURL = companyLogoUrl + values.companyId + '&22=' + UserState.getInstance().getPriceDetails().SESSION;
			rtaDataArray.push(rtaDataEntity);
			rtaDataArray.sort(
				function(a: TradingAdviceEntity, b: TradingAdviceEntity): number{
					return a.rawDate - b.rawDate;
				});
		});
	}
}
