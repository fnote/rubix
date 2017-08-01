import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../app-backend/auth/auth.service';
import { CdkTableModule } from '@angular/cdk';
import { Channels } from '../../../app-constants/enums/channels.enum';
import { DataService } from 'C:/Users/sithijat/rubix/src/app/app-backend/communication/data.service';
import { HeaderComponent } from 'C:/Users/sithijat/rubix/src/app/app-widgets/common-widgets/header-widget/header.component';
import { Injectable } from '@angular/core';
import { Languages } from '../../../app-constants/enums/languages.enum';
import { LocalizationService } from '../../../app-utils/localization/localization.service';
import { LoggerService } from '../../../app-utils/logger.service';
import { MdButtonModule } from '@angular/material';
import { MdTableModule } from '@angular/material';
import { NumberValueAccessor } from '@angular/forms/src/directives/number_value_accessor';
import { ResponseStatus } from '../../../app-constants/enums/response-status.enum';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Rx';
import { UserState } from 'C:/Users/sithijat/rubix/src/app/app-backend/auth/user-state';
import { WidgetLoaderService } from '../../widget-util/widget-loader.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
	selector: 'app-home',
	templateUrl:  './home.component.html',
	styleUrls: ['home.component.css'],
})
export class HomeComponent implements OnInit {
	public filter = 1085;
	public page = 'DFM';
	public session = '';
	public submarketlist = [];
	public submarkets;

	constructor(private authService: AuthService, public router: Router,
							private widgetLoaderService: WidgetLoaderService, public localizationService: LocalizationService, public dataService: DataService,
							private loggerService: LoggerService) { }

	public getValues(x: any): any {
		return Object.keys(x);
	}

	public ngOnInit(): void {
		// this.fetch();
	}
	// public addToArray(submarkets: Object) {
	// 	this.submarketlist.push(submarkets);
	// }
	public myfunc(): void {
		console.log("seyx");
	}

	public fetch(): void {
		console.log('crazyyyyy');
		//make data_request build request
		const dataRequest = this.buildDataRequest(this.filter, this.page);
		console.log('gindara');
		this.dataService.sendAjaxRequest(dataRequest).then((response) => {
			response = JSON.parse(response._body);
			this.submarketlist = response.DAT.SUBMAR_LIST;
			console.log(this.submarketlist);
		});
	}
	public buildDataRequest(filter: number, page: string): any {

		const dataRequest = {
			DAT: this.getDataBody(filter, page),
			HED: this.getDataHeader(),
		};
		const request = {
			method: 'POST',
			url: 'http://127.0.0.1:8080/mfg-back-office/services/omsServices/ ',
			body: dataRequest,
		};
		return request;
	}

	///upon a button click various requests has to be sent need to have a common place for buttons

	private getDataHeader(): any {
		const atAuthHeder = {
			MSG_GRP: 7,                 //get this from somewhere else
			MSG_TYP: 10,                  //upon clicking a button this should happen view sub market list
			CL_VER: 'WEBAT_1.0',
			CHANNEL: 7,
			SESSION:  UserState.getInstance().getATDetails()['SES'],
			CL_IP: '192.168.20.183',
		// CL_REQ_ID: '',
			VER: 'MUBASHER_JSON_1.0',
		// USR_ID: '',
		// LANG_ID: 'EN',
			RES_STS: 1,
		};
		return atAuthHeder;
	}

	private getDataBody(filter: number, page: string): any {
		const atAuthBody = {
			SUBMAR_CODE: filter,
			SUBMAR_EXCH: page,
		};
		return atAuthBody;
	}
}

// <div *ngFor="let x of submarketlist">
// <li *ngFor="let y of getValues(x)">{{x[y]}}</li>
// </div>
