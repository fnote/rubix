import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/observable';
import { CommonHelperService } from './helper/common-helper.service';
import { TradeHelperService } from './helper/trade-helper.service';
import { LocalizationService } from './localization/localization.service';
import { StorageService } from './localStorage/storage.service';

@Injectable()
export class UtilsService {

	constructor(private commonHelperService : CommonHelperService,
				private tradeHelperService : TradeHelperService,
				private localizationService : LocalizationService,
				private storageService : StorageService) {}

	/////////////////////////////////////////////// Common Helpers - Date Formatters /////////////////////////////////////

	 /**
	 * Return the time difference as a string
	 * @param lastUpdated Last updated time
	 * @param exchange Corresponding exchange data store
	 * param factor Multiplication factor
	 */
	public getTimeOffsetString(lastUpdated : number , exchange : any , factor : number ) : string {

		return this.commonHelperService.getTimeOffsetString(lastUpdated , exchange , factor);
	}

	 /**
	 * Format the data in the provided pattern
	 * @param date Date to be formatted
	 * @param pattern Format pattern
	 * @param exchange Exchange
	 * @param factor Multiplication factor
	 */
	public formatDate(date : number , pattern : string , exchange : any , factor : number) : string {

		return this.commonHelperService.formatDate(date , pattern , exchange , factor);
	}

	 /**
	 * Return the timezone offset for the exchange compared to GMT
	 * @param date Date to be formatted
	 * @param exchange Corresponding Exchange
	 */
	public getTimeZoneOffSet(date : string , exchange : any) : number {

		return this.commonHelperService.getTimeZoneOffSet(date  , exchange);
	}

	///////////////////////////////////////////////  Date Formatters END /////////////////////////////////////////////////
	///////////////////////////////////////////////  Number Formatters ///////////////////////////////////////////////////

	 /**
	 * Round number to given decimal places
	 * @param num Number to be rounded
	 * @param dec Number of decimal places
	 */
	public roundNumber(num : number , dec : number) : number {

		return this.commonHelperService.roundNumber(num , dec);
	}

	 /**
	 * Convert a number to a fixed number
	 * @param num Input number
	 */
	public toFixed(num : number) : number {

		return this.commonHelperService.toFixed(num);
	}

	 /**
	 * Format a number in Millions
	 * @param num Number to be formatted
	 * @param dec Number of decimal places
	 */
	public formatNumberInMillions(num : number , dec : number) : string {

		return this.commonHelperService.formatNumberInMillions(num , dec);
	}

	///////////////////////////////////////////////  Number Formatters END ///////////////////////////////////////////////
	///////////////////////////////////////////////  Other Formatters ////////////////////////////////////////////////////

	 /**
	 * Returns wether a string is right to left
	 * @param str Input string
	 */
	public isRTLText(str : string) : boolean {

		return this.commonHelperService.isRTLText(str);
	}

	 /**
	 * Returns order value
	 * @param price Price
	 * @param qty Quantity
	 * @param curr Currency
	 * @param lotSize Lot size
	 */
	public getOrderValue(price : number , qty : number , curr : number , lotSize : number) : number {

		return this.commonHelperService.getOrderValue(price , qty , curr , lotSize);
	}

	 /**
	 * Returns number of pages
	 * @param pageSize Number of records per page
	 * @param totalRecords Total recordes
	 */
	public getPagesCount(pageSize : number , totalRecords : number) : number {

		return this.commonHelperService.getPagesCount(pageSize , totalRecords);
	}

	/**
	 * Returns current UTC time
	 */
	public getCurrentDate() : number {

		return this.commonHelperService.getCurrentDate();
	}

	///////////////////////////////////////////////  Other Formatters END Common Helpers END /////////////////////////////
	///////////////////////////////////////////////  Trade Helpers ///////////////////////////////////////////////////////

	 /**
	 * Return price ratio
	 * @param value Input value
	 * @param isExg Is exchange
	 */
	public getPriceRatios(value : number , isExg : boolean) : number {

		return this.tradeHelperService.getPriceRatios(value , isExg);
	}

	///////////////////////////////////////////////  Trade Helpers END ///////////////////////////////////////////////////
	///////////////////////////////////////////////  Localization ////////////////////////////////////////////////////////

	public setActiveLanguage(lanCode : string) : void {

		this.localizationService.setActiveLanguage(lanCode);
	}

	public getActiveLanguage() : string {

		return this.localizationService.getActiveLanguage();
	}

	public get getActiveLanguage1() : string {

		return this.localizationService.getActiveLanguage();
	}

	public getActiveLanguageObservable() : Observable<string> {

		return this.localizationService.getActiveLanguageObservable();
	}

	public getTranslationObject() : any {
		return this.localizationService.getTranslationObject();
	}

	public getTranslationObjectObservable() : any {
		return this.localizationService.getTranslationObjectObservable();
	}

	public isRTL() : boolean {

		return this.localizationService.isRTL();
	}

	public changeActiveLanguage(lanCode : string) : void {

		this.localizationService.changeActiveLanguage(lanCode);
	}

	///////////////////////////////////////////////  Localization END ////////////////////////////////////////////////////
	////////////////////////////////////////////////  Storage ////////////////////////////////////////////////////////////

	public saveData(key : string , dataObj : any) : void {

		this.storageService.saveData(key , dataObj);
	}

	public getData(key : string) : any {

		return this.storageService.getData(key);
	}

	public removeItem(key : string) : void {

		this.storageService.removeItem(key);
	}
}
