import PriceResponseTypes from '../../../constants/enums/price-response-types';
import { Channels } from '../../../constants/enums/channels.enum';

export class PriceResponse {

	public processPriceResponse( response : any ) : Array<Object> {
		const processedRes = [];
		if ( response.channel === Channels.Price ) {
			if ( response && response.data && response.data.length > 0) {
				for ( const res of response.data ){
					processedRes.push((this.buildPriceResponse(res)));
				}
			}else {
				processedRes.push(this.buildPriceResponse(response.data));
			}
		}else if ( response.channel === Channels.PriceMeta ) {
			processedRes.push(this.buildPriceMetaResponse(response.data));
		}else {
		}
		return processedRes;
	}

	private buildPriceMetaResponse(response : {HED : any, DAT : any }) : Object {
		const processedResponse = new Object();
		if ( response && response.HED && response.DAT) {
			const keys = Object.keys(response.HED);
			const headerFieldsArr = [];
			const dataFieldArr = [];
			for ( let i = 0 ; i < keys.length ; i++ ) {
				const splitHeader = new Object();
				splitHeader[keys[i]] = response.HED[keys[i]].split('|');
				headerFieldsArr.push(splitHeader);
				const splitData = new Object();
				splitData[keys[i]] = [];
				for ( let j = 0 ; j < response.DAT[keys[i]].length ; j++ ) {
					splitData[keys[i]].push(response.DAT[keys[i]][j].split('|'));
				}
				dataFieldArr.push(splitData);
			}

			for ( let k = 0 ; k < headerFieldsArr.length ; k++) {
				const key = Object.keys(headerFieldsArr[k])[0];
				processedResponse[key] = [];
				for ( let m = 0; m < dataFieldArr[k][key].length ; m++ ) {
					const responseOb = new Object();
					for ( let p = 0 ;  p < dataFieldArr[k][key][m].length ; p++) {
						responseOb[headerFieldsArr[k][key][p]] = dataFieldArr[k][key][m][p];
					}
					processedResponse[key].push(responseOb);
				}
			}
			return processedResponse;
		} else {
			return response;
		}
	}

	private buildPriceResponse(response : {HED : string, DAT : string }) : Object {
		const arrBuild : string[] = [];
		if ( response && response.HED && response.DAT) {
			arrBuild.push('{');
			const arrHed = response.HED.split('|');
			const arrDat = response.DAT.split('|');
			for ( let i = 0 ; i < arrHed.length ; i++ ) {
				if ( PriceResponseTypes[arrHed[i]] ) {
					arrBuild.push('"' + PriceResponseTypes[arrHed[i]].id + '"');
					arrBuild.push(':');
					arrBuild.push('"' + arrDat[i].toString() + '"');
					arrBuild.push(',');
				}
			}
			arrBuild.splice( -1 , 1 );
			arrBuild.push('}');
			return JSON.parse(arrBuild.join(''));
		}
		return response;
	}

}
