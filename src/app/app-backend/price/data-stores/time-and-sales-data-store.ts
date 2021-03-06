import { BaseDataStore } from './base-data-store';
import { CommonHelperService } from '../../../app-utils/helper/common-helper.service';
import { ExchangeDataStore } from './exchange-data-store';
import { Injectable } from '@angular/core';
import { LocalizationService } from '../../../app-utils/localization/localization.service';
import { StockDataStore } from './stock-data-store';
import { TimeAndSalesEntity } from '../business-entities/time-and-sales-entity';

const MAX_TABLE_LENGTH = 20;

@Injectable()
export class TimeAndSalesDataStore extends BaseDataStore {

	private timeAndSalesDataArray: TimeAndSalesEntity[] = [];
	private exgSym: [string, string] = ['' ,  ''];
	private priceModificationFactor = 1;

	constructor(
		public commonHelperService: CommonHelperService,
		private stockDataStore: StockDataStore,
		private exchangeDataStore: ExchangeDataStore,
		private localizationService: LocalizationService,
	) {
		super();
	}

	public getTimeAndSalesDataArray(): TimeAndSalesEntity[] {
		return this.timeAndSalesDataArray;
	}

	public reset(exgSym: [string, string]): void {
		this.exgSym = exgSym;
		this.timeAndSalesDataArray = [];
	}

	public updateTick(values: {
		splits: number,
		time: string,
		sequence: string,
		lastTradePrice: number,
		totalQty: number,
		change: string,
		perChange: string,
		symbolCode: string,
		exchangeCode: string,
	}): void {
		// console.log('........ '+new Date().getTime());
		const previousEntity = this.timeAndSalesDataArray[0];
		const exchange = this.exchangeDataStore.getOrAddExchange(this.exgSym[0]);
		let displayTypeArray;
		const entity = new TimeAndSalesEntity();
		let symbolDate;

		entity.commonHelperService = this.commonHelperService;
		entity.symbolCode = values.symbolCode || previousEntity.symbolCode;
		entity.exchangeCode = values.exchangeCode || previousEntity.exchangeCode;
		entity.decimalPlaces =
			this.stockDataStore.getOrAddStock([entity.exchangeCode, entity.symbolCode]).decimalPlaces;
		entity.splits = values.splits || previousEntity.splits;
		entity.time = values.time || previousEntity.time;
		entity.sequence = values.sequence || previousEntity.sequence;
		entity.lastTradePrice = values.lastTradePrice || previousEntity.lastTradePrice;
		entity.totalQty = values.totalQty || previousEntity.totalQty;
		entity.change = values.change || previousEntity.change;
		entity.perChange = values.perChange || previousEntity.perChange;

		if (this.sequenceAlreadyReceived(entity.sequence)) {// this is to handle disconnections
			this.reset(this.exgSym);
		}

		entity.turnOver = this.getTurnOver(entity);
		entity.direction = this.getDirection(entity);
		displayTypeArray = this.getDisplayType(entity);
		entity.typeString = displayTypeArray[0];
		entity.typeClass = displayTypeArray[1];
		// TODO [Malindu] Implement this
		// var symbolDate = App.symbolManager.symbolMap.get(this.updateSymbol()).LTD.replace(/\//g,"");
		symbolDate = null;
		entity.displayTime =  this.commonHelperService.formatDate(entity.time, 'HH:mm:ss' , exchange, symbolDate);

		this.timeAndSalesDataArray.unshift(entity);
		this.timeAndSalesDataArray.sort(function(a: TimeAndSalesEntity, b: TimeAndSalesEntity): number {
			return parseInt(b.sequence, 10) - parseInt(a.sequence, 10);
		});

		if (this.timeAndSalesDataArray.length > MAX_TABLE_LENGTH) {
			this.timeAndSalesDataArray.pop();
		}
	}

	public getTurnOver(entity: TimeAndSalesEntity): string {
		return this.commonHelperService.roundNumber(
			entity.lastTradePrice * entity.totalQty / this.priceModificationFactor,
		);
	}

	public getDirection(entity: TimeAndSalesEntity): string {
		const previousEntity = this.timeAndSalesDataArray[0];
		if (previousEntity && entity.perChange) {
			if (entity.lastTradePrice > previousEntity.lastTradePrice) {
				return this.commonHelperService.getDirectionTickClasses(1);
			}else if (entity.lastTradePrice < previousEntity.lastTradePrice) {
				return this.commonHelperService.getDirectionTickClasses(-1);
			}else {
				return this.commonHelperService.getDirectionTickClasses(0);
			}

		}else {
			return this.commonHelperService.getDirectionTickClasses(0);
		}
	}

	public getDisplayType(entity: TimeAndSalesEntity): [string, string] {
		if (parseInt(entity.type, 10) === 1) {
			return [this.localizationService.language.BUY, 'buy_Green'];
		}else {
			return [this.localizationService.language.SELL, 'sell_Red'];
		}
	}

	public sequenceAlreadyReceived(sequence: string): boolean {
		for (const tick of this.timeAndSalesDataArray){
			if (parseInt(tick.sequence, 10) === parseInt(sequence, 10)) {
				return true;
			}
		}
		return false;
	}
}
