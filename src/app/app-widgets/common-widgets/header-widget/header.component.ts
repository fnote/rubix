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
import {CdkTableModule} from '@angular/cdk';
import {MdInputModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UserState} from 'C:/Users/sithijat/rubix/src/app/app-backend/auth/user-state';
import {DataService} from 'C:/Users/sithijat/rubix/src/app/app-backend/communication/data.service';
import {AuthService} from '../../../app-backend/auth/auth.service';
import {Channels} from '../../../app-constants/enums/channels.enum';
import {Injectable} from '@angular/core';
import {Languages} from '../../../app-constants/enums/languages.enum';
import {LocalizationService} from '../../../app-utils/localization/localization.service';
import {LoggerService} from '../../../app-utils/logger.service';
import {MdButtonModule} from '@angular/material';
import {MdTableModule} from '@angular/material';
import {NumberValueAccessor} from '@angular/forms/src/directives/number_value_accessor';
import {ResponseStatus} from '../../../app-constants/enums/response-status.enum';
import {Router} from '@angular/router';
import {Subject} from 'rxjs/Rx';
import {WidgetLoaderService} from '../../widget-util/widget-loader.service';
import {logger} from 'codelyzer/util/logger';


@Component({
	selector: 'app-header',
	styleUrls: ['header.component.css'],
	templateUrl: 'header.component.html',
})

export class HeaderComponent implements OnInit {
	public displayedColumns = ['submarketCode', 'submarketExchange', 'isActive', 'isDefault', 'crossOrders', 'regularOrders' , 'TPlusNbuy' , 'TPlusNsell', 'minimumQuantity'];
	public INDEXs = [];


	public filter = 1085;
	public page = 'DFM';
	public session = '';
	public submarketlist = [];
	public submarkets;
	public Num;

	// public homeComponent = new HomeComponent();
	public dataSource: ExampleDataSource | null;

	public exampleDatabase;

	public ngOnInit(): any {
		this.fetch();
		// this.dataSource = new ExampleDataSource(this.exampleDatabase);
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

			this.exampleDatabase = new ExampleDatabase(this.INDEXs);
			this.dataSource = new ExampleDataSource(this.exampleDatabase);
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

		0

		// for (let x of this.INDEXs){
		// 	console.log(x.SUBMAR_CODE);
		// 	console.log(x.SUBMAR_EXCH);
		// }
	}

	public getArray(): any {
		return this.INDEXs;
	}

	// public exampleDatabase = new ExampleDatabase(this.INDEXs);

}


const submarketlist = this.submarketlist;

export interface UserData {
	submarketCode: string;
	submarketExchange: string;
	isActive: string;
	isDefault: string;
	crossOrders: string;
	regularOrders: string;
	TplusNsell: number;
	TplusNbuy: number;
	minimumQuantity: number;
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

	//behaviour subject holds a value and upon change broadcasts it to other parts of the app
	public dataChange: BehaviorSubject<UserData[]> = new BehaviorSubject<UserData[]>([]);

	public get data(): UserData[] {
		return this.dataChange.value;
	}


	constructor(index: Array<any>) {
		// Fill up the database with 100 users.
		console.log('gggggg');
		this.submarkets = index;

		const dummy = [
			{id: 0, name: "Available", progress: "good", submarketlist: "1"},
			{id: 1, name: "Ready", progress: "good", submarketlist: "1"},
			{id: 2, name: "Started", progress: "good", submarketlist: "1"},
		];

		for (const iron of index) {
			this.addUser(iron);
		}
	}


	/** Adds a new user to the database. */
	public addUser(y: any): any {
		console.log(y);
		const copiedData = this.data.slice(y);
		console.log('kill');
		console.log(copiedData);
		console.log('killed already');
		copiedData.push(this.createNewUser(y));
		console.log('jill');
		console.log(copiedData);
		this.dataChange.next(copiedData);
		console.log('jack');
	}

	/** Builds and returns a new User. */
	private createNewUser(z: any): any {

		console.log('bubahser');

		const name = z.SUBMAR_EXCH;

		return {

			submarketExchange: z.SUBMAR_EXCH,
			submarketCode: z.SUBMAR_CODE,
			minimumQuantity: z.MIN_QTY,
			isActive: z.IS_ACT,
			isDefault: z.IS_DEFAULT,
			crossOrders: z.CRS_ORDERS_DISPLAY,
			regularOrders: z.REG_ORDERS_DISPLAY,
			TplusNbuy: z.TPLUSN_BUY,
			TplusNsell: z.TPLUSN_SELL,
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

	public disconnect(): any {
	}
}
