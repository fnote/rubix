import { Injectable } from '@angular/core';

interface ConnectionConfig {
	index : number;
	channel : string;
	url : string;
	isSecure : boolean;
}

@Injectable()
export class ConfigService {
	private connectionConfig : Array<ConnectionConfig>;
	public ECHO_URL : string = 'wss://echo.websocket.org';
	public CHAT_URL : string = 'ws://10.1.20.136:1234';
	public PRICE_URL : string = 'wss://phoenix-eg-uat.mubashertrade.com/phoenix';
	constructor() {
		this.connectionConfig = [
			{ index: 0, channel: 'echo' , url: this.ECHO_URL, isSecure: true },
			{ index: 1, channel: 'chat' , url: this.CHAT_URL, isSecure: false },
			{ index: 2, channel: 'price' , url: this.PRICE_URL, isSecure: false }
		];
	}

	public getConnectionConfig() : Array<ConnectionConfig> {
		return this.connectionConfig;
	}

}
