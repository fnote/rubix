import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DataSource} from '@angular/cdk';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { CdkTableModule } from '@angular/cdk';
import { MdInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserState } from 'C:/Users/sithijat/rubix/src/app/app-backend/auth/user-state';
import { DataService } from 'C:/Users/sithijat/rubix/src/app/app-backend/communication/data.service';
import { AuthService } from '../../../app-backend/auth/auth.service';
import { Channels } from '../../../app-constants/enums/channels.enum';
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
import { WidgetLoaderService } from '../../widget-util/widget-loader.service';
import { logger } from 'codelyzer/util/logger';


@Component({
	selector: 'app-header',
	styleUrls: ['header.component.css'],
	templateUrl: 'header.component.html',
})

export class HeaderComponent implements OnInit {
	public displayedColumns = ['userId', 'userName', 'progress', 'color' , 'submarketlist'];
	public  INDEXs = [];


	public filter = 1085;
	public page = 'DFM';
	public session = '';
	public submarketlist = [];
	public submarkets;
	public Num;

	// public homeComponent = new HomeComponent();
	public dataSource: ExampleDataSource | null;


	public ngOnInit(): any {
		this.fetch();
		this.dataSource = new ExampleDataSource(this.exampleDatabase);
	}
// export class HomeComponent implements OnInit {
	constructor(public router: Router, public dataService: DataService) {
	}

	public getValues(x: any): any {
		return Object.keys(x);
	}

	// public ngOnInit(): void {
	// 	// console.log('dddgdfg');
	// 	// this.fetch();
	// }

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
			console.log('takes');
			response = JSON.parse(response._body);
			console.log(response);
			this.submarketlist = response.DAT.SUBMAR_LIST;
			console.log(this.submarketlist);
			this.myfun();

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
			SESSION: UserState.getInstance().getATDetails()['SES'],
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

	private myfun(): any {
		console.log("ffffff");

		const len = 7;
		let num: any;
		for (num = 1; num <= len; num++) {
			this.INDEXs.push(this.submarketlist[num]);
		}
		console.log('index');
		console.log(this.INDEXs);
		for (let x of this.INDEXs){
			console.log(x.SUBMAR_CODE);
			console.log(x.SUBMAR_EXCH);
		}
	}

	public getArray(): any{
		return this.INDEXs;
	}

	public exampleDatabase = new ExampleDatabase(this.getArray());

}


/** Constants used to fill up our data base. */
const COLORS = [];
const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
	'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
	'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

const submarketlist = this.submarketlist;

export interface UserData {
	id: string;
	name: string;
	progress: string;
	color: string;
	submarketlist: string;
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleDatabase {
	/** Stream that emits whenever the data has been modified. */
	// public submarketlist_length= NAMES.length;
 	// public  foo: HomeComponent = new HomeComponent();
	// public arr1: any[] = this.foo.submarketlist;
	//  console.log(arr1);
		public submarket_code = [];
  public submarkets = [];
	public dataChange: BehaviorSubject<UserData[]> = new BehaviorSubject<UserData[]>([]);
	public get data(): UserData[] { return this.dataChange.value; }




	constructor(index: Array<any>) {
		// Fill up the database with 100 users.
		this.submarkets = index;
		for (let i = 0; i < 100; i++) { this.addUser(); }
	}


	/** Adds a new user to the database. */
	public addUser(): any {
		const copiedData = this.data.slice();
		copiedData.push(this.createNewUser());
		this.dataChange.next(copiedData);
	}

	/** Builds and returns a new User. */
	private createNewUser(): any {

		console.log('bubahser');



		const name =
			NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
			NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

		return {


			id: (this.data.length + 1).toString(),
			name: this.submarket_code[0],
			progress: Math.round(Math.random() * 100).toString(),
			color: COLORS[Math.round(Math.random() * (COLORS.length - 1))],
			submarketlist: 0,
		};
	}
}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class ExampleDataSource extends DataSource<any> {
	constructor(private _exampleDatabase: ExampleDatabase) {
		super();
	}

	/** Connect function called by the table to retrieve one stream containing the data to render. */
	public connect(): Observable<UserData[]> {
		return this._exampleDatabase.dataChange;
	}

	public disconnect(): any {}
}
