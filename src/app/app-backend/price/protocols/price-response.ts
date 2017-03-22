import PriceResponseTypes from '../../../constants/enums/price-response-types';

export class PriceResponse {

	public processPriceResponse( response : any ) : Array<Object> {
		const processedRes = [];
		if ( response && response.length > 0) {
			for ( const res of response ){
				processedRes.push((this.buildResponse(res)));
			}
		}else {
				processedRes.push(this.buildResponse(response));
		}
		return processedRes;
	}

	private buildResponse(response : {HED : string, DAT : string }) : Object {
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
