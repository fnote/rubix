import 'rxjs/add/operator/map';
import { Channels } from '../constants/enums/channels.enum';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

	private configObj: any;

	constructor(private http: Http) { }

	private getConfigurationVal(key1: string, key2?: string, key3?: string): any {
		if (key3 && key2) {
			return this.configObj[key1][key2][key3];
		} else if (key2) {
			return this.configObj[key1][key2];
		} else {
			return this.configObj[key1];
		}
	}

	public getStringConfigVal(key1: string, key2?: string, key3?: string): Promise<any> {
		return new Promise((resolve, reject) => {
			if (!this.configObj) {
				this.http.get('./src/app/app-config/app-config.json').map((res) => res.json()).subscribe(data => {
					this.configObj = data;
					resolve(this.getConfigurationVal(key1, key2, key3));
				});
			} else {
				resolve(this.getConfigurationVal(key1, key2, key3));
			}
		});
	}

	public getNumberConfigVal(key1: string, key2?: string, key3?: string): Promise<number> {
		return new Promise((resolve, reject) => {
			this.getStringConfigVal(key1, key2, key3).then(configVal => {
				resolve(Number(configVal));
			});
		});
	}

	public getBoolConfigVal(key1: string, key2?: string, key3?: string): Promise<number> {
		return new Promise((resolve, reject) => {
			this.getStringConfigVal(key1, key2, key3).then(configVal => {
				resolve(configVal === 'true');
			});
		});
	}

	public getConnectionConfig(): Promise<Array<{channel: number, url: string, isSecure: boolean}>> {
		return new Promise((resolve => {
			this.getStringConfigVal('connectionConfig').then(conConfig => {
				const connections = [
					{ channel: Channels.Trade, url: conConfig.trade.url + '/appsocket', isSecure: false },
					{ channel: Channels.Price, url: conConfig.price.url  + '/websocket/price', isSecure: false },
					{ channel: Channels.PriceMeta, url: conConfig.price.url  + '/websocket/meta', isSecure: false },
				];
				resolve(connections);
			});
		}));
	}
}
