import 'rxjs/add/operator/map';
import { Channels } from '../constants/enums/channels.enum';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

interface ConnectionConfig {
	channel: number;
	url: string;
	isSecure: boolean;
}

@Injectable()
export class ConfigService {
	private connectionConfig: Array<ConnectionConfig>;
	public ECHO_URL  = 'wss://echo.websocket.org';
	public CHAT_URL  = 'ws://10.1.20.136:1234';
	public PRICE  = 'ws://mfg-uat-phoenix.mubashertrade.com:9090/websocket/price';
	public PRICE_META  = 'ws://mfg-uat-phoenix.mubashertrade.com:9090/websocket/meta';
	private TRADE_UAT = 'ws://mtplusglobal-uat.mubashertrade.com:8800/appsocket';
	private TRADE_LOCAL = 'ws://10.1.200.61:8800/appsocket';

	public configObj: any;

	constructor(private http: Http) {
		this.connectionConfig = [
			{ channel: Channels.Trade , url: this.TRADE_UAT, isSecure: false },
			{ channel: Channels.TradeMeta , url: this.CHAT_URL, isSecure: false },
			{ channel: Channels.Price , url: this.PRICE, isSecure: false },
			{ channel: Channels.PriceMeta  , url: this.PRICE_META, isSecure: false },
		];
	}

	public getConnectionConfig(): Array<ConnectionConfig> {
		return this.connectionConfig;
	}

	// Below will be invoked from the main component's constructor. This will pre initialise the service.
	public init(): void {
		this.http.get('./src/app/config/app-config.json').map((res) => res.json()).subscribe(data => {
			this.configObj = data;
		}, (rej) => {
			console.error('Could not load local data' , rej);
		});
	}

	public getStringConfigVal(key1: string, key2?: string, key3?: string): string {
		if (key3 && key2) {
			return this.configObj[key1][key2][key3];
		} else if (key2) {
			return this.configObj[key1][key2];
		} else {
			return this.configObj[key1];
		}
	}

	public getNumberConfigVal(key1: string, key2?: string, key3?: string): number {
		return Number(this.getStringConfigVal(key1, key2, key3));
	}

	public getBoolConfigVal(key1: string, key2?: string, key3?: string): boolean {
		return this.getStringConfigVal(key1, key2, key3) === 'true';
	}
}
