import { Channels } from '../../app-constants/enums/channels.enum';
import { DataService } from '../communication/data.service';
import { Injectable } from '@angular/core';
import { LoggerService } from '../../app-utils/logger.service';
import { PriceRequest } from './protocols/price-request';
import { PriceRequestTypes } from '../../app-constants/enums/price-request-types.enum';
import { PriceStreamingRequestHandler } from './protocols/streaming/price-streaming-request-handler';

/**
 * This class is used to manage the realtime price subscriptions.
 */

@Injectable()
export class PriceSubscriptionService {

	private subscriptionMap: Map<PriceRequestTypes, Map<string, NodeObject>> = new Map();

	constructor(private dataService: DataService, private loggerService: LoggerService) {
		// Some Code
	}

	/**
 	* Method exposed to other modules to check whether subscription required or not
 	* @param {PriceRequestTypes} messageType - message type id
 	* @param {string} exchange - exchange code
 	* @param {string} symbol - symbol code
 	* @returns {boolean} true - send subscription / false - no subscription
 	*/
	public subscribeFor(messageType: PriceRequestTypes, exchange: string, symbol?: string): boolean {
		const isSubscribe = this.isSubscribeRequest(messageType, exchange, symbol);
		this.logSubscriptionTree();
		return isSubscribe;
	}

	/**
 	* Method exposed to other modules to check whether unsubscription required or not
 	* @param {PriceRequestTypes} messageType - message type id
 	* @param {string} exchange - exchange code
 	* @param {string} symbol - symbol code
 	* @returns {boolean} true - send unsubscription / false - no unsubscription
 	*/
	public unSubscribeFor(messageType: PriceRequestTypes, exchange: string, symbol?: string): boolean {
		const isUnsubscribe = this.isUnsubscribeRequest(messageType, exchange, symbol);
		this.logSubscriptionTree();
		return isUnsubscribe;
	}

	/**
	 * Class local method use to handle the subscription logic
 	* @param {PriceRequestTypes} messageType - message type id
 	* @param {string} exchange - exchange code
 	* @param {string} symbol - symbol code
	* @returns {boolean} true - send subscription / false - no subscription
	*/
	private isSubscribeRequest(messageType: PriceRequestTypes, exchange: string, symbol?: string): boolean {
		let exchangeNodeObject: NodeObject;
		this.loggerService.logInfo('Subscription request received : ' + messageType + ' - ' + exchange + ' - ' + symbol, 'Price-SubscriptionService');

		// check message type already exists. if not create new map entry with default values
		if (!this.isKeyExistsInMap(messageType, this.subscriptionMap)) {
			const newExchangeMap: Map<string, NodeObject> = new Map();
			exchangeNodeObject = new NodeObject({ exchange: exchange, isExchangeSubscribed: false }, this.loggerService);
			newExchangeMap.set(exchange, exchangeNodeObject);
			this.subscriptionMap.set(messageType, newExchangeMap);
		} else {
			if (!this.isKeyExistsInMap(exchange, this.subscriptionMap.get(messageType))) {
				exchangeNodeObject = new NodeObject({ exchange: exchange, isExchangeSubscribed: false }, this.loggerService);
				this.subscriptionMap.get(messageType).set(exchange, exchangeNodeObject);
			}else {
				exchangeNodeObject = this.subscriptionMap.get(messageType).get(exchange);
			}
		}

		if (symbol) {
			// if symbol subscription and symbol not exists, create new symbol entry with default values
			if (!this.isKeyExistsInMap(symbol, exchangeNodeObject.subscribedSymbolInfo)) {
				const newSymbolInfo: SymbolNodeObject = new SymbolNodeObject({ isSymbolSubscribed: false }, this.loggerService);
				exchangeNodeObject.subscribedSymbolInfo.set(symbol, newSymbolInfo);
			}
		}

		// handle symbol and exchange subscriptions
		if (symbol) {
			return this.isSymbolSubscription(exchange, symbol, exchangeNodeObject);
		} else {
			return this.isExchangeSubscription(exchange, exchangeNodeObject);
		}
	}

	/**
	 * Class local method use to handle the unsubscription logic
 	* @param {PriceRequestTypes} messageType - message type id
 	* @param {string} exchange - exchange code
 	* @param {string} symbol - symbol code
	* @returns {boolean} true - send unsubscription / false - no unsubscription
	*/
	private isUnsubscribeRequest(messageType: PriceRequestTypes, exchange: string, symbol?: string): boolean {
		let exchangeNodeObject: NodeObject;
		this.loggerService.logInfo('Unsubscription requierd received : ' + messageType + ' - ' + exchange + ' - ' + symbol, 'Price-SubscriptionService');
		if (!this.isKeyExistsInMap(messageType, this.subscriptionMap)) {
			// unsubscription for not subscribed message type
			return false;
		} else {
			if (!this.isKeyExistsInMap(exchange, this.subscriptionMap.get(messageType))) {
				// unsubscription for not subscribed exchange
				return false;
			}
			exchangeNodeObject = this.subscriptionMap.get(messageType).get(exchange);
		}

		if (symbol) {
			return this.isSymbolUnsubscription(exchange, symbol, exchangeNodeObject);
		} else {
			return this.isExchangeUnsubscription(exchange, exchangeNodeObject);
		}
	}

	/**
	 * Generic method used to check key exists in map or not
	 * @param {any} key - map key
	 * @param {Map<any, any>} dataMap - map object
	* @returns {boolean} true - key exists/ false - not exists
	 */
	private isKeyExistsInMap(key: any, dataMap: Map<any, any>): boolean {
		if (dataMap.has(key)) {
			return true;
		}
		return false;
	}

	/**
	 * Checking symbol subscription required or not
	 * @param {string} exchange - exchange code
	 * @param {string} symbol - symbol code
	 * @param {NodeObject} exchangeNodeObject - Exchange level node object
	 * @returns {boolean} true - symbol need to subscribe/ false - exchange or symbol already subscribed
	 */
	private isSymbolSubscription(exchange: string, symbol: string, exchangeNodeObject: NodeObject): boolean {
		const symbolInfoObject = exchangeNodeObject.subscribedSymbolInfo.get(symbol);
		if  (exchangeNodeObject.isExchangeSubscribed) {
			symbolInfoObject.isSymbolSubscribed = false;
			symbolInfoObject.symbolSubscriptionCount++;
			return false;
		} else {
			if (symbolInfoObject.isSymbolSubscribed) {
				symbolInfoObject.symbolSubscriptionCount++;
				return false;
			} else {
				symbolInfoObject.isSymbolSubscribed = true;
				symbolInfoObject.symbolSubscriptionCount++;
				return true;
			}
		}
	}

	/**
	 * Checking exchange subscription required or not
	 * @param {string} exchange - exchange code
	 * @param {NodeObject} exchangeNodeObject - Exchange level node object
	 * @returns {boolean} true - need to subscribe to exchange/ false - exchange already subscribed
	 */
	private isExchangeSubscription(exchange: string, exchangeNodeObject: NodeObject): boolean {
		if (exchangeNodeObject.isExchangeSubscribed) {
			exchangeNodeObject.exchangeSubscriptionCount++;
			return false;
		} else {
			exchangeNodeObject.isExchangeSubscribed = true;
			exchangeNodeObject.exchangeSubscriptionCount++;
			// unsubscribe symbols
			this.manageSymbolSubscriptions(exchange, exchangeNodeObject, false);
			return true;
		}
	}

	/**
	 * Manage symbol level subscriptions/un subscriptions
	 * @param {string} exchange - exchange code
	 * @param {NodeObject} exchangeNodeObject - exchange Node object
	 * @param {boolean} isSubscription - true if subscription, false for unsubscription
	 */
	// tslint:disable-next-line:ter-max-len
	private manageSymbolSubscriptions(exchange: string, exchangeNodeObject: NodeObject, isSubscription: boolean): void {
		if (exchangeNodeObject.subscribedSymbolInfo.size > 0) {
			if (isSubscription) {
				exchangeNodeObject.subscribedSymbolInfo.forEach((value: SymbolNodeObject, key: string) => {
					value.isSymbolSubscribed = true;
					this.addSymbolRequest([exchange, key]);
				});
			} else {
				exchangeNodeObject.subscribedSymbolInfo.forEach((value: SymbolNodeObject, key: string) => {
					value.isSymbolSubscribed = false;
					this.removeSymbolRequest([exchange, key]);
				});
			}
		}
	}

	/**
	 * Checking symbol unsubscription required or not
	 * @param {string} exchange - exchange code
	 * @param {string} symbol - symbol code
	 * @param {NodeObject} exchangeNodeObject  - exchange level node object
	 * @returns {boolean} - true for symbol unsubscription/ false for no need of unsubscription
	 */
	private isSymbolUnsubscription(exchange: string, symbol: string, exchangeNodeObject: NodeObject): boolean {
		const symbolInfoObject = exchangeNodeObject.subscribedSymbolInfo.get(symbol);
		if  (exchangeNodeObject.isExchangeSubscribed) {
			symbolInfoObject.isSymbolSubscribed = false;
			symbolInfoObject.symbolSubscriptionCount--;
			if (symbolInfoObject.symbolSubscriptionCount === 0) {
				exchangeNodeObject.subscribedSymbolInfo.delete(symbol);
			}
			return false;
		} else {
			if (symbolInfoObject.isSymbolSubscribed) {
				symbolInfoObject.symbolSubscriptionCount--;
				if (symbolInfoObject.symbolSubscriptionCount === 0) {
					symbolInfoObject.isSymbolSubscribed = false;
					exchangeNodeObject.subscribedSymbolInfo.delete(symbol);
					return true;
				}
				return false;
			} else {
				// unsubscription for already unsubscribed symbol
				return false;
			}
		}
	}

	/**
	 * Checking exchange unsubscription required or not
	 * @param {string} exchange - exchange code
	 * @param {NodeObject} exchangeNodeObject - exchange level node object
	 * @returns {boolean} true if exchange unsubscription, false if exchange unsubscription not needed
	 */
	private isExchangeUnsubscription(exchange: string, exchangeNodeObject: NodeObject): boolean {
		if (exchangeNodeObject.isExchangeSubscribed) {
			exchangeNodeObject.exchangeSubscriptionCount = exchangeNodeObject.exchangeSubscriptionCount - 1;
			if (exchangeNodeObject.exchangeSubscriptionCount === 0) {
				exchangeNodeObject.isExchangeSubscribed = false;
				this.manageSymbolSubscriptions(exchange, exchangeNodeObject, true);
				return true;
			}
			return false;
		} else {
			// exchange already unsubscribed.
			return false;
		}
	}

// testing only
	private logSubscriptionTree(): void {
		this.subscriptionMap.forEach((value: Map<string, NodeObject>, key: PriceRequestTypes) => {
			this.loggerService.logInfo('================ Price Subscription Service Start ================', 'Price-SubscriptionService');
			this.loggerService.logInfo('Level 1 Map key :  Request Type : ' + key, 'Price-SubscriptionService');
			value.forEach((exchangeNode: NodeObject, exchangeCode: string) => {
				this.loggerService.logInfo('Level 2 Map key : exchange code : ' + exchangeCode, 'Price-SubscriptionService');
				exchangeNode.printObj();
				exchangeNode.subscribedSymbolInfo.forEach((symbolNode: SymbolNodeObject, symbolCode: string) => {
					this.loggerService.logInfo('Level 3 Map key : symbol code : ' + symbolCode, 'Price-SubscriptionService');
					symbolNode.printObj();
				});
			});
			this.loggerService.logInfo('================ Price Subscription Service End ================', 'Price-SubscriptionService');
		});
	}

	/**
	 * Subscribe and Un-subscribe for a symbol updates
	 * @param {[string, string]} exgSym - A tupple with Exchange Code and Symbol Code
	 */
	private addSymbolRequest (exgSym: [string, string]): void {
		const req = new PriceRequest();
		req.MT = PriceRequestTypes.SnapshotSymbol;
		req.addParam(exgSym[0], exgSym[1]);

		const request = {
			channel : Channels.Price,
			data : PriceStreamingRequestHandler.getInstance().generateAddRequest(req),
		};
		this.dataService.sendToWs(request);
	}

	private removeSymbolRequest (exgSym: [string, string]): void {
		const req = new PriceRequest();
		req.MT = PriceRequestTypes.SnapshotSymbol;
		req.addParam(exgSym[0], exgSym[1]);

		const request = {
			channel : Channels.Price,
			data : PriceStreamingRequestHandler.getInstance().generateRemoveRequest(req),
		};
		this.dataService.sendToWs(request);
	}
}

/**
 * Inner class to represent second level node of the subscription tree
 */
class NodeObject {

	private _exchange = '';
	private _isExchangeSubscribed = false;
	private _exchangeSubscriptionCount = 0;
	private _subscribedSymbolInfo: Map<string, SymbolNodeObject> = new Map();

	constructor(values: Object = {}, private loggerService: LoggerService) {
		this.setValues(values);
	}

	public setValues(values: Object = {}): void {
		Object.assign(this, values);
	}

	public get exchange(): string  {
		return this._exchange;
	}

	public set exchange(value: string) {
		this._exchange = value;
	}

	public get isExchangeSubscribed(): boolean {
		return this._isExchangeSubscribed;
	}

	public set isExchangeSubscribed(value: boolean) {
		this._isExchangeSubscribed = value;
	}

	public get subscribedSymbolInfo(): Map<string, SymbolNodeObject> {
		return this._subscribedSymbolInfo;
	}

	public set subscribedSymbolInfo(value: Map<string, SymbolNodeObject>) {
		this._subscribedSymbolInfo = value;
	}

	public get exchangeSubscriptionCount(): number {
		return this._exchangeSubscriptionCount;
	}

	public set exchangeSubscriptionCount(value: number) {
		this._exchangeSubscriptionCount = value;
	}

	public printObj(): void {
		for (const key in this) {
			if (this.hasOwnProperty(key)) {
				this.loggerService.logInfo(key + ' : ' + this[key], 'Price-SubscriptionService');
			}
		}
	}
}

/**
 * Inner class used to represent the third level of the subscription tree
 */
class SymbolNodeObject {

	private _isSymbolSubscribed = false;
	private _symbolSubscriptionCount = 0;

	constructor(values: Object = {}, private loggerService: LoggerService) {
		this.setValues(values);
	}

	public setValues(values: Object = {}): void {
		Object.assign(this, values);
	}

	public get isSymbolSubscribed(): boolean {
		return this._isSymbolSubscribed;
	}

	public set isSymbolSubscribed(value: boolean) {
		this._isSymbolSubscribed = value;
	}

	public get symbolSubscriptionCount(): number {
		return this._symbolSubscriptionCount;
	}

	public set symbolSubscriptionCount(value: number) {
		this._symbolSubscriptionCount = value;
	}

	public printObj(): void {
		for (const key in this) {
			if (this.hasOwnProperty(key)) {
				this.loggerService.logInfo(key + ' : ' + this[key], 'Price-SubscriptionService');
			}
		}
	}

}
