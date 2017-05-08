import { BaseDataStore } from './base-data-store';
import { DepthDisplayEntity } from '../business-entities/depth-entity';
import { DepthEntity } from '../business-entities/depth-entity';
import { Injectable } from '@angular/core';
import { priceResponseTags } from '../../../app-constants/const/price-response-tags';

@Injectable()
export class DepthDataStore extends BaseDataStore {
	private depthPriceStore = {};
	private depthOrderStore = {};

	public getDepthByPriceSymbol (exgSym: [string, string]): DepthDisplayEntity {
		// TODO: [Chaamini] Get a common "keyGenerator" in utils package
		const key: string = exgSym[0] + '~' + exgSym[1]; // utils.keyGenerator.getKey(exchange, stockCode);
		let depthObj = this.depthPriceStore[key];

		if (!depthObj) {
			depthObj = this.createDepthPriceDisplayEntity(exgSym);
			this.depthPriceStore[key] = depthObj;
		}
		return depthObj;
	}

	public getDepthByOrderSymbol (exgSym: [string, string]): DepthDisplayEntity {
		// TODO: [Chaamini] Get a common "keyGenerator" in utils package
		const key: string = exgSym[0] + '~' + exgSym[1]; // utils.keyGenerator.getKey(exchange, stockCode);
		let depthObj = this.depthOrderStore[key];

		if (!depthObj) {
			depthObj = this.createDepthOrderDisplayEntity(exgSym);
			this.depthOrderStore[key] = depthObj;
		}
		return depthObj;
	}

	private createDepthPriceDisplayEntity (exgSym: [string, string]): DepthDisplayEntity {
		const bidLevels = [];
		const offerLevels = [];
		const depthPriceCount = 5;
		for (let i = 0; i < depthPriceCount; i++) {
			bidLevels[i] = new DepthEntity({ ACT_depthID: i + 1 });
			offerLevels[i] = new DepthEntity({ ACT_depthID: i + 1 });
		}

		return new DepthDisplayEntity({
			exchangeCode: exgSym[0],
			symbolCode: exgSym[1],
			bidDisplayPoints: bidLevels,
			offerDisplayPoints : offerLevels,
		});
	}

	private createDepthOrderDisplayEntity (exgSym: [string, string]): DepthDisplayEntity {
		const bidLevels = [];
		const offerLevels = [];
		for (let i = 0; i < 10; i++) {
			bidLevels[i] = new DepthEntity({ ACT_depthID: i + 1 });
			offerLevels[i] = new DepthEntity({ ACT_depthID: i + 1 });
		}

		return new DepthDisplayEntity({
			exchangeCode: exgSym[0],
			symbolCode: exgSym[1],
			bidDisplayPoints: bidLevels,
			offerDisplayPoints : offerLevels,
		});
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

	private  processMarketDepthRecord (depObject: DepthEntity, exgSym: [string, string], type: boolean): void {
		// TODO: [Chaamini] Implement a key generation function at the common helper and use it here.
		const key: string = exgSym[0] + '~' + exgSym[1];
		const depthDisplayObj = type ? this.depthPriceStore[key] : this.depthOrderStore[key];
		const bidArray = depthDisplayObj.bidDisplayPoints;
		const offerArray = depthDisplayObj.offerDisplayPoints;
		const isBid = parseInt(depObject.depthType, 10) === 0 ? true : false;
		const updateArray = isBid ? bidArray : offerArray;
		const id = depObject.depthID;
		let depObj: DepthEntity;

		if (id) {
			if (!updateArray[id]) {
				depObj = new DepthEntity({ ACT_depthID: id + 1 });
				updateArray.push(depObj);
			}

			depObj = updateArray[id];
			depObj.setValues(depObject);
		}
	}

	private processMarketDepthReset(exgSym: [string, string], type: boolean): void {
		const key: string = exgSym[0] + '~' + exgSym[1];
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
				offerArray : offerArray,
				bidArray: bidArray,
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
		offerArray: Array<DepthEntity> , bidArray: Array<DepthEntity>}): void {
		let row: DepthEntity;
		if (params.bidStatus) {
			for (let i = 0; i < params.bidArray.length; i++) {
				if (i >= params.bidSeqN) {
					row = params.bidArray[i];
					row.depthID = '--';
					row.depthValue = '--';
					row.depthQty = '0';
					row.depthSplit = '--';
				}
			}
		}
		if (params.offerStatus) {
			for (let i = 0; i < params.offerArray.length; i++) {
				if (i >= params.offerSeqN) {
					row = params.offerArray[i];
					row.depthID = '--';
					row.depthValue = '--';
					row.depthQty = '0';
					row.depthSplit = '--';
				}
			}
		}
	}
}
