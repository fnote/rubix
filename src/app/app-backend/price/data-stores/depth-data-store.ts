import { BaseDataStore } from './base-data-store';
import { CommonHelperService } from '../../../app-utils/helper/common-helper.service';
import { DepthDisplayEntity } from '../business-entities/depth-entity';
import { DepthEntity } from '../business-entities/depth-entity';
import { Injectable } from '@angular/core';
import { priceResponseTags } from '../../../app-constants/const/price-response-tags';

@Injectable()
export class DepthDataStore extends BaseDataStore {
	private depthPriceStore = {};
	private depthOrderStore = {};

	constructor(private commonHelperService: CommonHelperService) {
		super();
	}

	public getDepthByPriceSymbol (exgSym: [string, string]): DepthDisplayEntity {
		const key = this.commonHelperService.generateKey(exgSym[0], exgSym[1]);
		let depthObj = this.depthPriceStore[key];

		if (!depthObj) {
			depthObj = this.createDepthDisplayEntity(exgSym, 'P');
			this.depthPriceStore[key] = depthObj;
		}
		return depthObj;
	}

	public getDepthByOrderSymbol (exgSym: [string, string]): DepthDisplayEntity {
		const key = this.commonHelperService.generateKey(exgSym[0], exgSym[1]);
		let depthObj = this.depthOrderStore[key];

		if (!depthObj) {
			depthObj = this.createDepthDisplayEntity(exgSym, 'D');
			this.depthOrderStore[key] = depthObj;
		}
		return depthObj;
	}

	public updateDepthPriceModel(response: Object): void {
		const isPrice =  response['MT'] === '25' ? true : false;
		const splitTag =  isPrice ? '227' : '221';
		const hedArray = response['HED'].split('|');
		const datArray = response['DAT'].split('|');
		const exgSym: [string, string] = [datArray[hedArray.indexOf('4')], datArray[hedArray.indexOf('3')]];
		const idx = hedArray.indexOf(splitTag);
		let noRecords = 0;
		let arrBuild: string[] = [];

		hedArray.splice(0, idx);
		datArray.splice(0, idx);

		for (let i = 0; i < hedArray.length; i++) {
			if (splitTag === hedArray[i] || hedArray[i] === '') {
				arrBuild.splice(-1, 1);
				arrBuild.push('}');
				if (noRecords !== 0) {
					this.processMarketDepthRecord(JSON.parse(arrBuild.join('')), exgSym, isPrice);
				}
				noRecords++;
				arrBuild = [];
				arrBuild.push('{');
			}

			if (priceResponseTags[hedArray[i]]) {
				arrBuild.push('"' + priceResponseTags[hedArray[i]] + '"');
				arrBuild.push(':');
				arrBuild.push('"' + datArray[i].toString() + '"');
				arrBuild.push(',');
			}
		}

		this.processMarketDepthReset(exgSym, isPrice);
	}

	private createDepthDisplayEntity (exgSym: [string, string], type: string): DepthDisplayEntity {
		const bidLevels = [];
		const offerLevels = [];
		const depthPriceCount = 5;
		const depthOrderCount = 10;
		const entryCount = type === 'P' ? depthPriceCount : depthOrderCount;
		const depthDisplayEntity = new DepthDisplayEntity();

		for (let i = 0; i < entryCount; i++) {
			bidLevels[i] = new DepthEntity();
			bidLevels[i].commonHelperService = this.commonHelperService;
			bidLevels[i].setValues({ ACT_depthID: i + 1 });

			offerLevels[i] = new DepthEntity();
			offerLevels[i].commonHelperService = this.commonHelperService;
			offerLevels[i].setValues({ ACT_depthID: i + 1 });
		}

		depthDisplayEntity.commonHelperService = this.commonHelperService;
		depthDisplayEntity.setValues({
			exchangeCode: exgSym[0],
			symbolCode: exgSym[1],
			bidQtyArray: [],
			offerQtyArray: [],
			bidDisplayPoints: bidLevels,
			offerDisplayPoints : offerLevels,
		});

		return depthDisplayEntity;
	}

	private  processMarketDepthRecord (depObject: DepthEntity, exgSym: [string, string], type: boolean): void {
		// TODO: [Chaamini] Implement a key generation function at the common helper and use it here.
		const key = this.commonHelperService.generateKey(exgSym[0], exgSym[1]);
		const depthDisplayObj = type ? this.depthPriceStore[key] : this.depthOrderStore[key];
		const bidArray = depthDisplayObj.bidDisplayPoints;
		const offerArray = depthDisplayObj.offerDisplayPoints;
		const bidQtyArray = depthDisplayObj.bidQtyArray;
		const offerQtyArray = depthDisplayObj.offerQtyArray;
		const isBid = parseInt(depObject.depthType, 10) === 0 ? true : false;
		const updateArray = isBid ? bidArray : offerArray;
		const updateQtyArray = isBid ? bidQtyArray : offerQtyArray;
		const id = depObject.depthID;
		let depObj: DepthEntity;

		if (id) {
			if (!updateArray[id]) {
				depObj = new DepthEntity();
				depObj.commonHelperService = this.commonHelperService;
				depObj.setValues({ ACT_depthID: id + 1 });
				updateArray.push(depObj);
			}

			depObj = updateArray[id];
			depObj.setValues(depObject);
			updateQtyArray[id] = parseFloat(depObject.depthQty);
		}
	}

	private processMarketDepthReset(exgSym: [string, string], type: boolean): void {
		const key = this.commonHelperService.generateKey(exgSym[0], exgSym[1]);
		const depthDisplayObj = type ? this.depthPriceStore[key] : this.depthOrderStore[key];
		const bidArray = depthDisplayObj.bidDisplayPoints;
		const offerArray = depthDisplayObj.offerDisplayPoints;
		const resetStatus = { bidStatus: false, offerStatus: false, bidSeqN: 200, offerSeqN: 200 };
		let totalBidQty = 0;
		let totalOfferQty = 0;
		for (let i = 0 ; i < bidArray.length; i++) {
			const bidQty = bidArray[i].depthQty > 0 ? bidArray[i].depthQty : 0;
			const offerQty = offerArray[i].depthQty > 0 ? offerArray[i].depthQty : 0;
			totalBidQty = parseInt(bidQty, 10) + totalBidQty;
			totalOfferQty = parseInt(offerQty, 10) + totalOfferQty;
			const bidStatus = this.getResetStatus(bidArray[i]);
			const offerStatus = this.getResetStatus(offerArray[i]);
			if (bidStatus === true && (i < resetStatus.bidSeqN)) {
				resetStatus.bidStatus = true;
				resetStatus.bidSeqN = i;
			}
			if (offerStatus === true && (i < resetStatus.offerSeqN)) {
				resetStatus.offerStatus = true;
				resetStatus.offerSeqN = i;
			}
		}
		depthDisplayObj.totalBidQty = totalBidQty;
		depthDisplayObj.totalOfferQty = totalOfferQty;

		if (resetStatus.bidStatus || resetStatus.offerStatus) {
			this.resetMarketDepth({
				offerSeqN: resetStatus.offerSeqN,
				bidSeqN: resetStatus.bidSeqN,
				bidStatus: resetStatus.bidStatus,
				offerStatus: resetStatus.offerStatus,
				depthObj: depthDisplayObj,
			});
		}
	}

	private  getResetStatus(depthObj: DepthEntity): boolean {
		let resetStatus = false;
		if (parseInt(depthObj.depthQty, 10) === 0 && parseInt(depthObj.depthValue, 10) === 0) {
			resetStatus = true;
			depthObj.depthID = '--';
		} else {
			depthObj.depthID = depthObj['ACT_depthID'];
		}
		return resetStatus;
	}

	private resetMarketDepth(params: {offerSeqN: number, bidSeqN: number, bidStatus: boolean, offerStatus: boolean,
		depthObj: DepthDisplayEntity}): void {
		let row: DepthEntity;
		if (params.bidStatus) {
			const bidArray = params.depthObj.bidDisplayPoints;
			const bidQtyArray = params.depthObj.bidQtyArray;
			for (let i = 0; i < bidArray.length; i++) {
				if (i >= params.bidSeqN) {
					row = bidArray[i];
					row.depthID = '--';
					row.depthValue = '--';
					row.depthQty = '0';
					row.depthSplit = '--';
					bidQtyArray[i] = 0;
				}
			}
		}

		if (params.offerStatus) {
			const offerArray = params.depthObj.offerDisplayPoints;
			const offerQtyArray = params.depthObj.offerQtyArray;
			for (let i = 0; i < offerArray.length; i++) {
				if (i >= params.offerSeqN) {
					row = offerArray[i];
					row.depthID = '--';
					row.depthValue = '--';
					row.depthQty = '0';
					row.depthSplit = '--';
					offerQtyArray[i] = 0;
				}
			}
		}
	}
}
