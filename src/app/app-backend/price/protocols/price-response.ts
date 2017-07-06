import { Channels } from '../../../app-constants/enums/channels.enum';
import { PriceRequestTypes } from '../../../app-constants/enums/price-request-types.enum';
import { priceResponseTags } from '../../../app-constants/const/price-response-tags';
import { priceResponseTypes } from '../../../app-constants/const/price-response-tags';

export class PriceResponse {

	public processPriceResponse(response: any): Array<Object> {
		let processedRes = [];
		if (response.channel === Channels.Price) {
			if (response && response.data && response.data.length > 0) {
				for (const res of response.data) {
					processedRes.push((this.buildPriceResponse(res)));
				}
			} else {
				processedRes.push(this.buildPriceResponse(response.data));
			}
		} else if (response.channel === Channels.PriceMeta) {
			processedRes = this.buildPriceMetaResponse(response.data);
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
							const objKey = priceResponseTags[headerFieldsArr[k][key][p]];
							const objProp = dataFieldArr[k][key][m][p];
							responseOb[objKey.tag] = this.convertStringToValues(objProp, objKey.type);
						}
					}
					processedResponseOb[key].push(responseOb);
				}
			}
			processedResponseOb['MT'] =  this.convertStringToValues(response.MT);
			processedResponseOb['NOR'] = response.NOR;
			processedResponseOb['PGI'] = response.PGI;
			processedResponseOb['PGS'] = response.PGS;
			processedResponseOb['STC'] = response.STC;
			processedResponseOb['TKN'] = response.TKN;
			processedResponseOb['VER'] = response.VER;
			processedRes.push(processedResponseOb);
			return processedRes;
		} else {
			response['MT'] =  this.convertStringToValues(response.MT);
			processedRes.push(response);
			return processedRes;
		}
	}

	private buildPriceResponse(response: {HED: string, DAT: string, MT: any}): Object {
		const processedResponse = {};
		const arrBuild: string[] = [];
		if (parseInt(response.MT, 10) !== PriceRequestTypes.MarketDepthByPrice &&
			parseInt(response.MT, 10) !== PriceRequestTypes.MarketDepthByOrder) {
			if (response && response.HED && response.DAT) {
				arrBuild.push('{');
				const arrHed = response.HED.split('|');
				const arrDat = response.DAT.split('|');

				for (let i = 0; i < arrHed.length; i++) {
					if (priceResponseTags[arrHed[i]]) {
						processedResponse[priceResponseTags[arrHed[i]].tag] = this.convertStringToValues(arrDat[i], priceResponseTags[arrHed[i]].type);
					}
				}
				processedResponse['MT'] = this.convertStringToValues(response.MT , priceResponseTypes.number);
				return processedResponse;
			}
			response['MT'] = this.convertStringToValues(response.MT, priceResponseTypes.number);
		}
		return response;
	}

	private convertStringToValues(strVal: string, type?: number): string | number | boolean {
		let parsedVal;
		if (!type || type === priceResponseTypes.string) {
			parsedVal = strVal;
		} else {
			try {
				parsedVal = JSON.parse(strVal);
			} catch (e) {
				parsedVal = strVal;
			}
		}
		return parsedVal;
	}

}
