import 'moment/locale/ar-ma';
import * as moment from 'moment';
import { Injectable } from '@angular/core';
import { TradeHelperService } from './trade-helper.service';
import { userSettings } from '../../config/user-settings';

const MIN = 60000; // 1000 * 60
const HOUR = 3600000; // 1000 * 60 * 60
const HOURS_PER_MONTH = 720; // 30 * 24

@Injectable()
export class CommonHelperService {

	private tradeHelperManager: TradeHelperService;

	////////////////////// Date Formatters //////////////////////

	/**
	* Return the time difference as a string
	* @param lastUpdated Last updated time
	* @param exchange Corresponding exchange data store
	* param factor Multiplication factor
	*/
	public getTimeOffsetString(lastUpdated: number , exchange: any , factor: number): string {
		// TODO: [Malindu] add correct type for exchange
		// moment.locale('ar-ma'); TODO: [Malindu] change language accordingly
		lastUpdated = lastUpdated * factor;
		const timeZoneOffSet: number = this.getTimeZoneOffSet(lastUpdated.toString() , exchange);
		return moment.utc(lastUpdated).utcOffset(timeZoneOffSet).fromNow();
	}

	/*
	* Format the data in the provided pattern
	* @param date Date to be formatted
	* @param pattern Format pattern
	* @param exchange Exchange
	* @param factor Multiplication factor
	*/
	public formatDate(date: number , pattern: string , exchange: any , factor: number): string {
		// TODO: [Malindu] add correct type for exchange
		const timeZoneOffSet: number = this.getTimeZoneOffSet(date.toString() , exchange) || 0;
		return moment.utc(date * factor).utcOffset(timeZoneOffSet).format(pattern);
	}

	// TODO: [Malindu] rewrite this
	/**
	* Return the timezone offset for the exchange compared to GMT
	* @param date Date to be formatted
	* @param exchange Corresponding Exchange
	*/
	public getTimeZoneOffSet(date: string , exchange: any): number { // TODO: [Malindu] Add correct type for exchange
		// TODO: [Malindu] Do the correct implementation
		// const timeZoneMap = {};
		// let timeZone, tzo , adjTzo , sd : number, ed : number , dateInteger : number , offSet : number;
		// if (!date) {
		// 	date = exchange.MDATE;
		// }
		// if (exchange && exchange.TZ_ID && exchange.TZ_ID !== '') {
		// 	timeZone = timeZoneMap[exchange.TZ_ID];
		// 	if (timeZone) {
		// 		tzo = timeZone.OFFSET;
		// 		sd =
		// ((timeZone.SD && timeZone.SD.length === 8) ? parseInt(timeZone.SD.substring(4, 8), 10) : undefined);
		// 		ed =
		// ((timeZone.ED && timeZone.ED.length === 8) ? parseInt(timeZone.ED.substring(4, 8), 10) : undefined);
		// 		adjTzo =  timeZone.ADJ_OFFSET;
		// 	} else {
		// 		tzo = exchange.TZO;
		// 	}
		// 	if (tzo) {
		// 		offSet += tzo.hour * 60 + tzo.min;
		// 	}
		// 	dateInteger = (date && date.length === 8 ? parseInt(date.substring(4, 8), 10) : undefined);
		// 	if (!isNaN(dateInteger) && adjTzo && adjTzo !== {} &&
		// !isNaN(sd) && !isNaN(ed) && (dateInteger >= sd) && (dateInteger <= ed)) {
		// 		offSet += adjTzo.hour * 60 + adjTzo.min;
		// 	}
		// }

		// return offSet;
		return 0;
	}

	////////////////////// Date Formatters END //////////////////////

	////////////////////// Number Formatters //////////////////////

	/**
	* Round number to given decimal places
	* @param num Number to be rounded
	* @param dec Number of decimal places
	*/
	public roundNumber(num: number , dec: number): string {
		if (dec < 0) {
			dec = userSettings.marketData.defaultDecimalPlaces;
		}

		let result = (this.toFixed((Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec)))).toString();
		if ((result.split('.')).length !== 1) {
			const floatNum: string = result.split('.')[1];
			if (floatNum.length < dec) {
				for (let i = 0; i < (dec - floatNum.length); i++) {
					result += '0';
				}
			}
		}

		return result;
	}

	/*
	* Convert a number to a fixed number
	* @param num Input number
	*/
	public toFixed(num: number): number {
		let e: number;
		if (Math.abs(num) < 1.0) {
			e = parseInt(num.toString().split('e-')[1], 10);
			if (e) {
				num *= Math.pow(10, e - 1);
				num = parseFloat('0.' + (new Array(e)).join('0') + num.toString().substring(2));
			}
		} else {
			e = parseInt(num.toString().split('+')[1], 10);
			if (e > 20) {
				e -= 20;
				num /= Math.pow(10, e);
				num += parseInt((new Array(e + 1)).join('0'), 10);
			}
		}

		return num;
	}

	// TODO: [Malindu] Uncomment if this is required
	// formatNumber(num: number , dec: number): string {
	//   const roundedNum = this.roundNumber(num, dec);
	//   const wholeNum = (roundedNum.toString().split('.')[0]).toString();
	//   let wholeNumWthtMinus;
	//   if (wholeNum.charAt(0) === '-') {
	//     wholeNumWthtMinus = wholeNum.substring(1, wholeNum.length);
	//   } else {
	//     wholeNumWthtMinus = wholeNum;
	//   }
	//   let formWholeNum = '', formNum;
	//   for (let i = wholeNumWthtMinus.length; i > 0; i -= 3) {
	//     formWholeNum = ',' + wholeNumWthtMinus.substring(i - 3, i) + formWholeNum;
	//   }
	//   if ((roundedNum.toString().split('.')).length !== 1) {
	//     formNum = formWholeNum.substring(1, formWholeNum.length) + '.' + roundedNum.toString().split('.')[1];
	//   } else {
	//     formNum = formWholeNum.substring(1, formWholeNum.length);
	//     if (dec > 0) {
	//       formNum += '.';
	//       while (dec > 0) {
	//         formNum += '0';
	//         dec--;
	//       }
	//     }
	//   }
	//   if (wholeNum.charAt(0) === '-') {
	//     formNum = '-' + formNum;
	//   }
	//   if (formNum === 'NaN' || formNum.indexOf('NaN') >= 0) {
	//     formNum = '--';
	//   }
	//   return formNum;
	// }

	/**
	* Format a number in Millions
	* @param num Number to be formatted
	* @param dec Number of decimal places
	*/
	public formatNumberInMillions(num: number , dec: number): string {
		const x: number = Math.abs(num);
		if (x <= 999999) {
			return this.roundNumber(num, dec).toString();
		}
		if (x > 999999) {
			return this.roundNumber(num / 1000000, 2) + ' M';
		}
	}

	////////////////////// Number Formatters END //////////////////////

	/**
	* Returns wether a string is right to left
	* @param str Input string
	*/
	public isRTLText(str: string): boolean {
		const ltrChars = '\u0000-\u0040\u005B-\u0060\u007B-\u00BF\u00D7\u00F7\u02B9-\u02FF\u2000-\u2BFF\u2010-\u2029\u202C\u202F-\u2BFF';
		const rtlChars = '\u0591-\u07FF\u200F\u202B\u202E\uFB1D-\uFDFD\uFE70-\uFEFC';
		const rtlDirCheck = new RegExp('^[' + ltrChars + ']*[' + rtlChars + ']');

		return rtlDirCheck.test(str);
	}

	/*
	* Returns order value
	* @param price Price
	* @param qty Quantity
	* @param curr Currency
	* @param lotSize Lot size
	*/
	public getOrderValue(price: number , qty: number , curr: number , lotSize: number): number {
		lotSize = lotSize > 0 ? lotSize : 1;
		if (price > 0 && qty > 0) {
			return price * qty * this.tradeHelperManager.getPriceRatios(curr , false) * lotSize;
		} else {
			return 0;
		}
	}

	/*
	* Returns number of pages
	* @param pageSize Number of records per page
	* @param totalRecords Total recordes
	*/
	public getPagesCount(pageSize: number , totalRecords: number): number {
		let pages: number = Math.floor(totalRecords / pageSize);
		const remain: number = totalRecords % pageSize;
		if (remain !== 0) {
			pages++;
		}

		return pages;
	}

	/*
	* Returns current UTC time
	*/
	public getCurrentDate(): number {
		return new Date().getTime();
	}
}
