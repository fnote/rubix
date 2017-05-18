import { BaseDataStore } from './base-data-store';
import { Injectable } from '@angular/core';

@Injectable()
export class GmsMapDataStore extends BaseDataStore {

	private allIndexList;

	public updateMapDataModel(response: Object): void {
		console.log("Response Recieved");
		// const isPrice =  response['MT'] === '25' ? true : false;
		// const splitTag =  isPrice ? '227' : '221';
		// const hedArray = response['HED'].split('|');
		// const datArray = response['DAT'].split('|');
		// const exgSym: [string, string] = [datArray[hedArray.indexOf('4')], datArray[hedArray.indexOf('3')]];
		// const idx = hedArray.indexOf(splitTag);
		// let noRecords = 0;
		// let arrBuild: string[] = [];
        //
		// hedArray.splice(0, idx);
		// datArray.splice(0, idx);
        //
		// for (let i = 0; i < hedArray.length; i++) {
		// 	if (splitTag === hedArray[i] || hedArray[i] === '') {
		// 		arrBuild.splice(-1, 1);
		// 		arrBuild.push('}');
		// 		if (noRecords !== 0) {
		// 			this.processMarketDepthRecord(JSON.parse(arrBuild.join('')), exgSym, isPrice);
		// 		}
		// 		noRecords++;
		// 		arrBuild = [];
		// 		arrBuild.push('{');
		// 	}
        //
		// 	if (priceResponseTags[hedArray[i]]) {
		// 		arrBuild.push('"' + priceResponseTags[hedArray[i]] + '"');
		// 		arrBuild.push(':');
		// 		arrBuild.push('"' + datArray[i].toString() + '"');
		// 		arrBuild.push(',');
		// 	}
		// }
        //
		// this.processMarketDepthReset(exgSym, isPrice);
	}


	public getAllIndexList(): any[] {
		this.allIndexList =	[
			{
				code: 'IN',
				value: 2000,
				name: 'Afghanistan General Index',
				last: 23.5,
				chg: 400,
			},
			{
				code: 'MA',
				value: 3000,
				name: 'Morocco MASI Float',
				last: 23.5,
				chg: 400,
			},
			{
				code: 'CH',
				value: 1000,
				name: 'Amman General Index',
				last: 23.5,
				chg: 400,
			},
			{
				code: 'BH',
				value: 200,
				name: 'Bahrain All Share Index',
				last: 23.5,
				chg: 400,
			},
			{
				code: 'AU',
				value: 22,
				name: 'SZSE COMPOSITE INDEX',
				last: 23.5,
				chg: 400,
			},
			{
				code: 'DZ',
				value: 15,
				name: 'Oman MSM30',
				last: 23.5,
				chg: 400,
			},
			{
				code: 'AS',
				value: 1,
				name: 'Bahrain All Share Index',
				last: 23.5,
				chg: 400,
			},
			{
				code: 'SA',
				value: 900,
				name: 'Abu Dhabi General Index',
				last: 23.5,
				chg: 400,
			}
			,
			{
				code: 'US',
				value: 900,
				name: 'DAX Dhabi-INDEX',
				last: 23.5,
				chg: 400,
			}
			,
			{
				code: 'US',
				value: 900,
				name: 'DAX General-INDEX',
				last: 23.5,
				chg: 400,
			}
			,
			{
				code: 'US',
				value: 900,
				name: 'DAX Share-INDEX',
				last: 23.5,
				chg: 400,
			}
			,
			{
				code: 'BD',
				value: 1900,
				name: '	Dhaka (DS 30) Index',
				last: 23.5,
				chg: 400,
			}];
		return this.allIndexList;
	}
}
