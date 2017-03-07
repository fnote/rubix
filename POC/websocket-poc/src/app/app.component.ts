import { Component, OnInit } from '@angular/core';
import { RequestMethod } from '@angular/http';
import { DataService } from './communication/data.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [ DataService ]
})

export class AppComponent implements OnInit {

	private textValue;
	private connectedPool: any;
	public response;

	constructor(private dataService: DataService) { }

	ngOnInit() { }

	sendMsgToChatServer() {
		const sendMessage = {
			index: 1,
			data: this.textValue
		};
		this.dataService.sendToWs(sendMessage);
	}

	unsubscribeChatServer() {
		this.dataService.unsubscribeWsConnection(1);
	}

	sendMsgToEchoServer() {
		const sendMessage = {
			index: 0,
			data: this.textValue
		};
		this.dataService.sendToWs(sendMessage);
	}

	unsubscribeEchoServer() {
		this.dataService.unsubscribeWsConnection(0);
	}

	sendAjaxRequest() {
		const data = {
				DAT: {
					EMAIL: 'aa@aa.aa',
					FIRST_NME : 'Chandana',
					LST_NME : 'BAndara'
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
		const samplePostReq = {
			method : RequestMethod.Post,
			url : 'http://mtplusglobal-uat.mubashertrade.com/tmpassword',
			data : data
		};
		this.dataService.sendAjaxRequest(samplePostReq).then(response => {
			console.log(response);
		});

		const sampleGetReq = {
			method : RequestMethod.Get,
			url : 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1'
		};

		this.dataService.sendAjaxRequest(sampleGetReq).then(response => {
			console.log(response);
		});
	}
}
