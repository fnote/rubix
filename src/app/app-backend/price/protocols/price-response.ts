import { Channels } from '../../../constants/enums/channels.enum';
import { priceResponseTags } from '../../../constants/const/price-response-tags';

export class PriceResponse {

	public processPriceResponse(response: any): Array<Object> {
		const processedRes = [];
		if (response.channel === Channels.Price) {
			if (response && response.data && response.data.length > 0) {
				for (const res of response.data) {
					processedRes.push((this.buildPriceResponse(res)));
				}
			} else {
				processedRes.push(this.buildPriceResponse(response.data));
			}
		} else if (response.channel === Channels.PriceMeta) {
			processedRes.push(this.buildPriceMetaResponse(response.data));
		}

		return processedRes;
	}

	private buildPriceMetaResponse(response: any): Array<Object> {
		const processedResponseOb = {};
		const processedRes = [];
		if (response && response.HED && response.DAT) {
			const keys = Object.keys(response.HED);
			const headerFieldsArr = [];
			const dataFieldArr = [];

			for (let i = 0 ; i < keys.length ; i++) {
				const splitHeader = {};
				splitHeader[keys[i]] = response.HED[keys[i]].split('|');
				headerFieldsArr.push(splitHeader);
				const splitData = {};
				splitData[keys[i]] = [];
				for (let j = 0 ; j < response.DAT[keys[i]].length ; j++) {
					splitData[keys[i]].push(response.DAT[keys[i]][j].split('|'));
				}
				dataFieldArr.push(splitData);
			}

			for (let k = 0 ; k < headerFieldsArr.length ; k++) {
				const key = Object.keys(headerFieldsArr[k])[0];
				processedResponseOb[key] = [];
				for (let m = 0; m < dataFieldArr[k][key].length ; m++) {
					const responseOb = {};
					for (let p = 0 ;  p < dataFieldArr[k][key][m].length ; p++) {
						if (priceResponseTags[headerFieldsArr[k][key][p]]) {
							responseOb[priceResponseTags[headerFieldsArr[k][key][p]]] = dataFieldArr[k][key][m][p];
						} else {
							responseOb[headerFieldsArr[k][key][p]] = dataFieldArr[k][key][m][p];
						}
					}
					processedResponseOb[key].push(responseOb);
				}
			}
			processedResponseOb['MT'] =  parseInt(response.MT, 10);
			processedResponseOb['NOR'] = response.NOR;
			processedResponseOb['PGI'] = response.PGI;
			processedResponseOb['PGS'] = response.PGS;
			processedResponseOb['STC'] = response.STC;
			processedResponseOb['TKN'] = response.TKN;
			processedResponseOb['VER'] = response.VER;
			processedRes.push(processedResponseOb);
			return processedRes;
		} else {
			processedRes.push(response);
			return processedRes;
		}
	}

	private buildPriceResponse(response: {HED: string, DAT: string, MT: string}): Object {
		let processedResponse = {};
		const arrBuild: string[] = [];
		if (response && response.HED && response.DAT) {
			arrBuild.push('{');
			const arrHed = response.HED.split('|');
			const arrDat = response.DAT.split('|');

			for (let i = 0 ; i < arrHed.length ; i++) {
				if (priceResponseTags[arrHed[i]]) {
					arrBuild.push('"' + priceResponseTags[arrHed[i]] + '"');
					arrBuild.push(':');
					arrBuild.push('"' + arrDat[i].toString() + '"');
					arrBuild.push(',');
				}
			}

			arrBuild.splice(-1 , 1);
			arrBuild.push('}');
			processedResponse =  JSON.parse(arrBuild.join(''));
			processedResponse['MT'] = parseInt(response.MT, 10);
			return processedResponse;
		}
		return response;
	}

}
