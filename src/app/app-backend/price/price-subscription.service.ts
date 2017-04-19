import { Injectable } from '@angular/core';
import { LoggerService } from '../../utils/logger.service';
import { PriceRequestTypes } from '../../constants/enums/price-request-types.enum';

/**
 * Inner class to represent second level node of the subscription tree
 */
class NodeObject {

	private _exchange = '';
	private _isExchangeSubscribed = false;
	private _exchangeSubscriptionCount = 0;
	private _subscribedSymbolInfo: Map<string, SymbolNodeObject> = new Map();

	constructor(values: Object = {}) {
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
        // tslint:disable-next-line:no-console
				console.log(key + ' : ' + this[key]);
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

	constructor(values: Object = {}) {
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
        // tslint:disable-next-line:no-console
				console.log(key + ' : ' + this[key]);
			}
		}
	}

}

/**
 * This class is used to manage the realtime price subscriptions.
 */

@Injectable()
export class PriceSubscriptionService {

	private subscriptionMap: Map<PriceRequestTypes, Map<string, NodeObject>> = new Map();

	constructor(private loggerService: LoggerService) {
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

		// tslint:disable-next-line:no-console
		console.log('Subscription request received : Message Type - ' + messageType + ' Exchange - ' + exchange + ' Symbol - ' + symbol);

		// check message type already exists. if not create new map entry with default values
		if (!this.isKeyExistsInMap(messageType, this.subscriptionMap)) {
			const newExchangeMap: Map<string, NodeObject> = new Map();
			// tslint:disable-next-line:ter-max-len
			exchangeNodeObject = new NodeObject({ exchange: exchange, isExchangeSubscribed: false });
			newExchangeMap.set(exchange, exchangeNodeObject);
			this.subscriptionMap.set(messageType, newExchangeMap);
		} else {
			exchangeNodeObject = this.subscriptionMap.get(messageType).get(exchange);
		}

		if (symbol) {
			// if symbol subscription and symbol not exists, create new symbol entry with default values
			if (!this.isKeyExistsInMap(symbol, exchangeNodeObject.subscribedSymbolInfo)) {
				const newSymbolInfo: SymbolNodeObject = new SymbolNodeObject({ isSymbolSubscribed: false });
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

		// tslint:disable-next-line:no-console
		console.log('Unsubscription requierd received : Message Type - ' + messageType + ' Exchange - ' + exchange + ' Symbol - ' + symbol);
		if (!this.isKeyExistsInMap(messageType, this.subscriptionMap)) {
			// unsubscription for not subscribed message type
			return false;
		} else {
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
			symbolInfoObject.symbolSubscriptionCount = symbolInfoObject.symbolSubscriptionCount + 1;
			return false;
		} else {
			if (symbolInfoObject.isSymbolSubscribed) {
				symbolInfoObject.symbolSubscriptionCount = symbolInfoObject.symbolSubscriptionCount + 1;
				return false;
			} else {
				symbolInfoObject.isSymbolSubscribed = true;
				symbolInfoObject.symbolSubscriptionCount = symbolInfoObject.symbolSubscriptionCount + 1;
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
			exchangeNodeObject.exchangeSubscriptionCount = exchangeNodeObject.exchangeSubscriptionCount + 1;
			return false;
		} else {
			exchangeNodeObject.isExchangeSubscribed = true;
			exchangeNodeObject.exchangeSubscriptionCount = exchangeNodeObject.exchangeSubscriptionCount + 1;
			// unsubscribe symbols
			this.manageSymbolSubscriptions(exchange, exchangeNodeObject, false);
			return true;
		}
	}

	/**
	 * Manage symbol level unsubscriptions
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
					// initiate symbol subscription request
				});
			} else {
				exchangeNodeObject.subscribedSymbolInfo.forEach((value: SymbolNodeObject, key: string) => {
					value.isSymbolSubscribed = false;
					// initiate symbol unsubscription request
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
			symbolInfoObject.symbolSubscriptionCount = symbolInfoObject.symbolSubscriptionCount - 1;
			if (symbolInfoObject.symbolSubscriptionCount === 0) {
				exchangeNodeObject.subscribedSymbolInfo.delete(symbol);
			}
			return false;
		} else {
			if (symbolInfoObject.isSymbolSubscribed) {
				symbolInfoObject.symbolSubscriptionCount = symbolInfoObject.symbolSubscriptionCount - 1;
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
			// tslint:disable-next-line:no-console
			console.log('Level 1 Map key Request Type : ' + key);
			value.forEach((exchangeNode: NodeObject, exchangeCode: string) => {
				// tslint:disable-next-line:no-console
				console.log('Level 2 Map key exchange code : ' + exchangeCode);
				// tslint:disable-next-line:no-console
				console.log('Exchange Node Object Properties : ' + exchangeNode.printObj);
				exchangeNode.subscribedSymbolInfo.forEach((symbolNode: SymbolNodeObject, symbokCode: string) => {
						// tslint:disable-next-line:no-console
					console.log('Level 3 Map symbol code : ' + symbokCode);
						// tslint:disable-next-line:no-console
					console.log('Symbol Node Object Properties : ' +  symbolNode.printObj);
				});
			});
		});
	}
}
