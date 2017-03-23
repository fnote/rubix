import PriceResponseTypes from '../../../constants/enums/price-response-types';
import { Channels } from '../../../constants/enums/channels.enum';

export class PriceResponse {

	public processPriceResponse( response : any ) : Array<Object> {
		const processedRes = [];
		if ( response.channel === Channels.Price ) {
			if ( response && response.data && response.data.length > 0) {
				for ( const res of response.data ){
					processedRes.push((this.buildRealTimeResponse(res)));
				}
			}else {
				processedRes.push(this.buildRealTimeResponse(response.data));
			}
		}else if ( response.channel === Channels.PriceMeta ) {
			processedRes.push(this.buildBackLogResponse(response.data));
		}else {
		}
		return processedRes;
	}

	private buildBackLogResponse(response : {HED : string, DAT : string }) : Object {
		return response;
	}

	private buildRealTimeResponse(response : {HED : string, DAT : string }) : Object {
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
