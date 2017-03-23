import { Component , ChangeDetectionStrategy } from '@angular/core';

import { ThemeService } from './utils/theme.service';
import { PriceService } from './app-backend/price/price.service';
import { LoggerService } from './utils/logger.service';
import { CommonHelperService } from './utils/helper/common-helper.service';
import { TradeHelperService } from './utils/helper/trade-helper.service';
import { LocalizationService } from './utils/localization/localization.service';
import { StorageService } from './utils/storage.service';
import { DataService } from './app-backend/communication/data.service';
import { Channels } from './constants/enums/channels.enum';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent {

	private title = 'Rubix test page';
	private result : string;
	private response : Array<any> = [] ;
	private inputValues : string;
	private userName = '';
	private password = '';
	private session = '';

	constructor(
		private commonHelperService : CommonHelperService,
		private themeService : ThemeService,
		private priceService : PriceService,
		private loggerService : LoggerService,
		private dataService : DataService,
		private localizationService : LocalizationService ) {
			this.updatePriceResponse();
		}

	private updatePriceResponse() : void {
		this.priceService.getPriceResponseStream().subscribe( response => {
			this.response.push(response);
			if ( response && response[0] && response[0].MT === '-1' ) {
				this.session = response[0].SESSION;
			}
		});
	}

	public convert() : void {
		// console.log(this.commonHelperService.getMonth('Jan'));
		// this.result = this.utilsService.formatDate('20170218142324' , 'YYYY-MM-DD hh:mm:ss' , {});
		// this.inputValues = this.commonHelperService.getMonth('Jan');
	}

	public changeLang() : void {
		if (this.localizationService.getActiveLanguage() === 'EN') {
			this.localizationService.setActiveLanguage('AR');
		}else {
			this.localizationService.setActiveLanguage('EN');
		}
	}

	private getPrice() : void {
		this.loggerService.logInfo(this.inputValues);
		this.priceService.addSymbolRequest(['TDWL', '1010']);
		// this.priceService.addExchangeRequest('TDWL');
		// this.priceService.addSymbolListRequest([['TDWL', '1010'], ['TDWL', '1020'], ['DFM', 'EMAAR']]);
		// this.priceService.addExchangeListRequest(['TDWL', 'DFM', 'LKCSE']);
	}

	public authenticateRealTimePath() : void {
		const authParams : Object = {
			priceVerion : '1',
			userName : this.userName,
			password : this.password,
			userType : '30',
			subType : '1',
			omsId : 10,
			brokerCode : 'MFS_UAT'
		};
		this.priceService.authenticateWithUsernameAndPassword( authParams , Channels.Price );
	}

	public authenticateBackLogPath() : void {
		const authParams : Object = {
			priceVerion : '1',
			userName : this.userName,
			password : this.password,
			userType : '30',
			subType : '1',
			omsId : 10,
			session : this.session,
			brokerCode : 'MFS_UAT'
		};
		this.priceService.authenticateWithSecondaryAuthToken( authParams , 3 );
	}

	public sendSymbolSnapshotRequest() : void {
		const sampleRequest = '{"MT":10,"PRM":["DFM~DFMGI","BSE~BSEX","ADSM~ADI","CASE~OTMT","CHIX~DLGD","DFM~AMAN","DFM~DFM","NYSE~A","NYSE~G","NYSE~WSO","TDWL~1010","TDWL~1150","TDWL~8100","DFM~GFH","DFM~EMAAR","ADSM~ALDAR","NSDQ~GOOG","NSDQ~AAPL"],"RT":1}';
				const request = {
					index : Channels.Price,
					data : sampleRequest
				};
				this.dataService.sendToWs( request );
	}

		public sendNewsRequest() : void {
				const sampleRequest = '{ "RT": "1", "MT": 30, "LAN": "EN", "PRM": [ "N/WER", "N/FNVW", "MUBASHER.AE" ] }';
				const request = {
					index : Channels.Price,
					data : sampleRequest
				};
				this.dataService.sendToWs( request );
		}

		public sendMarketMetaRequest() : void {
			const sampleRequest = ' { "MT": 80, "TKN": 1, "LAN": "EN", "SEG": [ "EXG", "EXGFE", "SUBM", "SECT", "TD", "ID", "WLD", "WLTD", "TZD", "GMS", "NPD" ], "EXG": [ "TDWL", "CASE", "ISE", "DFM" ] }';
			//const sampleRequest = '{ "MT": 46, "TKN": 1, "LAN": "EN", "PRM": [ "TDWL~1150", "NSDQ~QQQ" ] }';
			//const sampleRequest = '{ "MT": 44, "SYM": [ "TDWL~TASI", "LKCSE~JKH.N0000`N", "ISE~TARAF", "CSE~SAM", "CSE~MASI" ], "PRD": "1d", "TYP": "1" }';
			const request = {
				index : Channels.PriceMeta,
				data : sampleRequest
			};
			this.dataService.sendToWs( request );
		}
}

