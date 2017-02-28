import { Component, OnInit } from '@angular/core';
import { QueueMannagerService } from './websocket/queue-mannager.service';
import { DataService } from './data.service';

const ECHO_URL = 'wss://echo.websocket.org';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [DataService ]
})

export class AppComponent implements OnInit {
	private connections = [
		{channel: 'chat_server', url: ECHO_URL}
	];
	// private priceMsg = {
	// 	advice: {timeout: 0},
	// 	channel: '/meta/connect',
	// 	clientId: '3u7m4kyt7s8x811k6hndwc5k1sz',
	// 	connectionType: 'websocket',
	// 	id: '4'
	// };
	private textValue;
	private connectedPool: any;
	public response;

	constructor(private dataService: DataService) { }

	ngOnInit() {
		this.dataService.subscribeConnections(this.connections);
	}

	// sendMsgToPhoenix() {
	// 	const sendMessage = {
	// 		channel: 'price_server',
	// 		message: this.priceMsg
	// 	};
	// 	this.dataService.sendMessage(sendMessage, this.connections[1]);
	// }

	sendMsgToChatServer() {
		const sendMessage = {
			channel: 'chat_server',
			message: this.textValue
		};
		this.dataService.sendMessage(sendMessage, this.connections[0]);
	}
}
