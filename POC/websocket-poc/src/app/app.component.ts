import { Component } from '@angular/core';
import { RequestMethod } from '@angular/http';
import { DataService } from './communication/data.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [ DataService ]
})

export class AppComponent {

	private textValue : string;

	constructor(private dataService : DataService) { }

	private sendMsgToChatServer() : void {
		const sendMessage : any = {
			index: 1,
			data: this.textValue
		};
		this.dataService.sendToWs(sendMessage);
	}

	private unsubscribeChatServer() : void {
		this.dataService.unsubscribeWsConnection(1);
	}

	private sendMsgToEchoServer() : void {
		const sendMessage : any = {
			index: 0,
			data: this.textValue
		};
		this.dataService.sendToWs(sendMessage);
	}

	private unsubscribeEchoServer() : void {
		this.dataService.unsubscribeWsConnection(0);
	}

	private sendAjaxRequest() : void {
		const data : Object = {
				DAT: {
					EMAIL: 'aa@aa.aa',
					FIRST_NME: 'Chandana',
					LST_NME: 'BAndara'
				},
				HED: {
					CHNL_ID: 25,
					CL_IP: '',
					CL_REQ_ID: '\'\'',
					CL_VER: '1.0.2.08',
					LANG_ID: 'EN',
					MSG_GRP: 5,
					MSG_TYP: 9,
					SESN_ID: '',
					USR_ID: '',
					VER: 'DFN_JSON_1.0'
				}
		};
		const samplePostReq : any = {
			method: RequestMethod.Post,
			url: 'http://mtplusglobal-uat.mubashertrade.com/tmpassword',
			body: data
		};
		this.dataService.sendAjaxRequest(samplePostReq).then(response => {
			console.log(response);
		}).catch(error => {
			console.log('[AppComponent] Ajax post request error ' + error);
		});

		const sampleGetReq : any = {
			method: RequestMethod.Get,
			url: 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1'
		};

		this.dataService.sendAjaxRequest(sampleGetReq).then(response => {
			console.log(response);
		}).catch(error => {
			console.log('[AppComponent] Ajax get request error ' + error);
		});
	}
}
