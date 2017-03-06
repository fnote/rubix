import { Injectable } from '@angular/core';

interface ConnectionConfig {
	index: number;
	channel: string;
	url: string;
	isSecure: boolean;
}

const ECHO_URL = 'wss://echo.websocket.org';
const CHAT_URL = 'ws://10.1.20.136:1234';
const PHICE_URL = 'wss://phoenix-eg-uat.mubashertrade.com/phoenix';

@Injectable()
export class ConfigService {
	private connectionConfig: Array<ConnectionConfig>;
	constructor() { 
		this.connectionConfig = [
			{ index: 0, channel: 'echo' , url: ECHO_URL, isSecure: true },
			{ index: 1, channel: 'chat' , url: CHAT_URL, isSecure: false },
			{ index: 2, channel: 'price' , url: PHICE_URL, isSecure: false }
		];
	}

	public getConnectionConfig(): Array<ConnectionConfig> {
		return this.connectionConfig;
	}

}
