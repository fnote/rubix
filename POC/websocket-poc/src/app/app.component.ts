import { Component, OnInit } from '@angular/core';
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
		this.dataService.send(sendMessage);
	}

	unsubscribeChatServer() {
		this.dataService.unsubscribeConnection(1);
	}

	sendMsgToEchoServer() {
		const sendMessage = {
			index: 0,
			data: this.textValue
		};
		this.dataService.send(sendMessage);
	}

	unsubscribeEchoServer() {
		this.dataService.unsubscribeConnection(0);
	}
}
