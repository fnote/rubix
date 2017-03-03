import { Injectable } from '@angular/core';
import { TradeHelperService } from './trade-helper.service';

const MIN = 60000; // 1000 * 60
const HOUR = 3600000; // 1000 * 60 * 60
const HOURS_PER_MONTH = 720; // 30 * 24
@Injectable()
export class HelperService {
  tradeHelperManager: TradeHelperService;
  constructor() {}

  ////////////////////// Date Formatters //////////////////////

  getMonth(month: string): string {

    let month_num: string;

    switch (month) {
      case 'Jan':
        month_num = '01';
        break;
      case 'Feb':
        month_num = '02';
        break;
      case 'Mar':
        month_num = '03';
        break;
      case 'Apr':
        month_num = '04';
        break;
      case 'May':
        month_num = '05';
        break;
      case 'Jun':
        month_num = '06';
        break;
      case 'Jul':
        month_num = '07';
        break;
      case 'Aug':
        month_num = '08';
        break;
      case 'Sep':
        month_num = '09';
        break;
      case 'Oct':
        month_num = '10';
        break;
      case 'Nov':
        month_num = '11';
        break;
      case 'Dec':
        month_num = '12';
        break;
      default:
        // TODO: [Malindu] integrate with logger implementation
        // App.util.log("Error in Util getMonth - Invalid Month", App.LogLevel.ERROR);
        break;
    }

    return month_num;
  }

  getTimeOffsetString(lastUpdated: string , oldDate: string , oldTime: string): string {
    const tempDate = new Date(), currentDate = new Date(tempDate.getUTCFullYear(),
      tempDate.getUTCMonth(), tempDate.getUTCDate(), tempDate.getUTCHours(), tempDate.getUTCMinutes()),
      lastUpdatedDate = new Date(parseInt(lastUpdated.substring(0, 4), 10), (parseInt(lastUpdated.substring(4 , 6) , 10) - 1),
      parseInt(lastUpdated.substring(6, 8), 10), parseInt(lastUpdated.substring(8, 10), 10), parseInt(lastUpdated.substring(10, 12), 10)),
      minDiff = (currentDate.getTime() - lastUpdatedDate.getTime()) / MIN,
      hourDiff = minDiff / 60, monthDiff = hourDiff / HOURS_PER_MONTH;
    let  hrs, days, min, formattedValue = '';
    const App = { // TODO: [Malindu] Move localization to correct place
      language : {
        languageCode : 'AR',
        labels : {
          DT_AGO : 'DT_AGO',
          DT_DAYS : 'DT_DAYS',
          DT_DAY : 'DT_DAY',
          DT_HR : 'DT_HR',
          DT_MIN : 'DT_MIN',
          DT_NOW : 'DT_NOW',
          DT_HRS : 'DT_HRS',
          DT_MINS : 'DT_MINS'
        }
      }
    };
    if (monthDiff < 1) {// within a month
      hrs = Math.floor(hourDiff % 24);
      min = Math.floor(minDiff % 60);
      if (App.language.languageCode === 'AR') {
        if (hourDiff >= 24) { // more than a day
          days = Math.floor(hourDiff / 24);
          if (hrs > 0) {
            formattedValue = App.language.labels.DT_AGO + ' ' +  days + ' ' +
            ( days > 1 ? App.language.labels.DT_DAYS  : App.language.labels.DT_DAY);
          } else {
            formattedValue = App.language.labels.DT_AGO + ' ' +  days + ' ' +
            ( days > 1 ? App.language.labels.DT_DAYS  : App.language.labels.DT_DAY);
          }
        }else { // within a day
          if (minDiff > 60) {// more than a hour
            if (minDiff % 60 > 0) {
              formattedValue = App.language.labels.DT_AGO + ' ' +  hrs + ' ' +
              (hrs > 1 ?  App.language.labels.DT_HRS  : App.language.labels.DT_HR);
            } else {
              formattedValue =  App.language.labels.DT_AGO + ' ' +  hrs + ' ' +
              (hrs > 1 ?  App.language.labels.DT_HRS  : App.language.labels.DT_HR);
            }
          }else { // within a hour
            if (min >= 1) {// more than a minute
              formattedValue = App.language.labels.DT_AGO + ' ' +  min + ' ' +
              (min > 1 ? App.language.labels.DT_MINS : App.language.labels.DT_MIN);
            } else {// within a minute
              formattedValue = App.language.labels.DT_NOW;
            }
          }
        }

      }else {
        if (hourDiff >= 24) { // more than a day
          days = Math.floor(hourDiff / 24);
          if (hrs > 0) {
            formattedValue =  days + ' ' + ( days > 1 ? App.language.labels.DT_DAYS  : App.language.labels.DT_DAY) +
            ' ' + App.language.labels.DT_AGO;
          } else {
            formattedValue = days + ' ' + ( days > 1 ?  App.language.labels.DT_DAYS  : App.language.labels.DT_DAY)
            + ' ' + App.language.labels.DT_AGO;
          }
        }  else { // within a day
          if (minDiff > 60) {// more than a hour
            if (minDiff % 60 > 0) {
             formattedValue = hrs + ' ' + (hrs > 1 ? App.language.labels.DT_HRS  : App.language.labels.DT_HR) + ' '
             + App.language.labels.DT_AGO;
            } else {
              formattedValue =  hrs + ' ' + (hrs > 1 ? App.language.labels.DT_HRS  : App.language.labels.DT_HR) + ' '
              + App.language.labels.DT_AGO;
            }
          }else { // within a hour
            if (min >= 1) {// more than a minute
              formattedValue = min + ' ' + (min > 1 ? App.language.labels.DT_MINS : App.language.labels.DT_MIN) + ' '
              + App.language.labels.DT_AGO;
            } else {// within a minute
              formattedValue = App.language.labels.DT_NOW;
            }
          }
        }
      }
    }else { // more than a month
      formattedValue = oldDate + '\n' + oldTime;
    }
    return formattedValue + 1;
  }

  formatDate(date: string , pattern: string , offset): string {
    let dateMills: number;
    date = date.substring(0, 4) + '-' + date.substring(4, 6) + '-' + date.substring(6, 8) + ' ' + date.substring(8, 10) + ':'
    +  date.substring(10, 12)  + ':' + date.substring(12, 14);
    dateMills = Date.parse(date);
    if (offset.hour) {
      dateMills = dateMills + offset.hour * HOUR;
    }
    if (offset.min) {
      dateMills = dateMills + offset.min * MIN;
    }
    Date.prototype.format = function(format)
    {
      const o = {
        'M+' : this.getMonth() + 1, // month
        'd+' : this.getDate(),    // day
        'h+' : this.getHours(),   // hour
        'm+' : this.getMinutes(), // minute
        's+' : this.getSeconds(), // second
        'q+' : Math.floor((this.getMonth() + 3) / 3),  // quarter
        'S' : this.getMilliseconds() // millisecond
      };
      if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1,
          (this.getFullYear() + '').substr(4 - RegExp.$1.length));
      }
      for (const k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
          format = format.replace(RegExp.$1,
            RegExp.$1.length === 1 ? o[k] :
              ('00' + o[k]).substr(('' + o[k]).length));
        }
      }
      return format;
    };
    return new Date(dateMills).format(pattern);
  }

  // TODO: [Malindu] refer the correct timeZoneMap
  getTimeZoneOffSet(date: number , exchange): Object {
    const offSet = {hour : 0, min : 0} , timeZoneMap = {};
    let timeZone, tzo, adjTzo, sd, ed;
    if (!date) {
      date = exchange.MDATE;
    }
    if (exchange && exchange.TZ_ID && exchange.TZ_ID !== '') {
      timeZone = timeZoneMap[exchange.TZ_ID];
      if (timeZone) {
        tzo = timeZone.OFFSET;
        sd =  ((timeZone.SD && timeZone.SD.length === 8) ? parseInt(timeZone.SD.substring(4, 8), 10) : undefined);
        ed =  ((timeZone.ED && timeZone.ED.length === 8) ? parseInt(timeZone.ED.substring(4, 8), 10) : undefined);
        adjTzo =  timeZone.ADJ_OFFSET;
      } else {
        tzo = exchange.TZO;
      }
      if (tzo) {
        offSet.hour += tzo.hour;
        offSet.min += tzo.min;
      }
      date = (date && date.toString().length === 8 ? parseInt(date.toString().substring(4, 8), 10) : undefined);
      if (!isNaN(date) && adjTzo && adjTzo !== {} && !isNaN(sd) && !isNaN(ed) && (date >= sd) && (date <= ed)) {
        offSet.hour += adjTzo.hour;
        offSet.min += adjTzo.min;
      }
    }
    return offSet;
  }

  ////////////////////// Date Formatters END //////////////////////

  ////////////////////// Number Formatters //////////////////////

  roundNumber(num: number , dec: number): number {
    let result;
    if (dec < 0) {
      dec = 1;
    }
    result = (this.toFixed((Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec)))).toString();
    if ((result.split('.')).length !== 1) {
      const floatNum = result.split('.')[1];
      if (floatNum.length < dec) {
        for (let i = 0; i < (dec - floatNum.length); i++) {
          result += '0';
        }
      }
    }
    return parseFloat(result);
  }

  toFixed(x: number): number {
    let e;
    if (Math.abs(x) < 1.0) {
      e = parseInt(x.toString().split('e-')[1], 10);
      if (e) {
        x *= Math.pow(10, e - 1);
        x = parseFloat('0.' + (new Array(e)).join('0') + x.toString().substring(2));
      }
    } else {
      e = parseInt(x.toString().split('+')[1], 10);
      if (e > 20) {
        e -= 20;
        x /= Math.pow(10, e);
        x += parseInt((new Array(e + 1)).join('0'), 10);
      }
    }
    return x;
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

  formatNumberInMillions(num: number , dec: number): string {
    const formattedValue = '0';
    if (num) {
      const x = Math.abs(num);
      if (x <= 999999) {
        return this.roundNumber(num, dec).toString();
      }
      if (x > 999999) {
        return this.roundNumber(num / 1000000, 2) + ' M';
      }
    }else {
      return formattedValue;
    }
  }

  ////////////////////// Number Formatters END //////////////////////

  upsFormatter(val: string): string {
    if (!isNaN(parseInt(val, 10))) {
      return '<span class=\'green_text\'>' + val + '</span>';
    }
    return '--';
  }

  downsFormatter(val: string): string {
    if (!isNaN(parseInt(val, 10))) {
      return '<span class=\'red_text\'>' + val + '</span>';
    }
    return '--';
  }

  isRTL(str: string): boolean {
    const ltrChars    = '\u0000-\u0040\u005B-\u0060\u007B-\u00BF\u00D7\u00F7\u02B9-\u02FF\u2000-\u2BFF\u2010-\u2029\u202C\u202F-\u2BFF',
      rtlChars    = '\u0591-\u07FF\u200F\u202B\u202E\uFB1D-\uFDFD\uFE70-\uFEFC',
      rtlDirCheck = new RegExp('^[' + ltrChars + ']*[' + rtlChars + ']');
    return rtlDirCheck.test(str);
  }

  getOrderValue(price: number , qty: number , curr: number , lotSize: number): number {
    lotSize = lotSize > 0 ? lotSize : 1;
    if (price > 0 && qty > 0) {
      return price * qty * this.tradeHelperManager.getPriceRatios(curr , false) * lotSize;
    } else {
      return 0;
    }
  }

  getPagesCount(pageSize: number , totalRecords: number): number {
    let pages = Math.floor(totalRecords / pageSize);
    const remain = totalRecords % pageSize;
    if (remain !== 0) {
      pages++;
    }
    return pages;
  }
}
