import { Injectable } from '@angular/core';
import { DataManagers } from '../../utils/enums/data-managers.enum';
import { BaseDataStore } from './data-stores/base-data-store';
import { StockDataStore } from './data-stores/stock-data-store';

@Injectable()
export class PriceService {

	constructor() { }

	/**
     * Fetch data managers
     * @param dmID Data Manager ID number
     */
	public getDataManager (dmID : number) : BaseDataStore {
		let dtStore : BaseDataStore = null;

		switch (dmID) {
			case DataManagers.Stock:
				dtStore = StockDataStore.getInstance();
				break;
			case DataManagers.Exchange:
				dtStore = StockDataStore.getInstance();
				break;
		}

		return dtStore;
	}

	//
	// API to handle authentication
	//

	/**
     * Authenticate with username and password
     * @param authParams An object with following properties set
	 * 						channel		: Value Defined at Channels Enum. Mandatory
     *                      username    : Username. Mandatory.
     *                      password    : Password. Mandatory.
     *                      loginIP     : Machine IP
     *                      appVersion  : Application version
     *                      lan         : Current Language. Mandatory.
     */
	public authenticateWithUsernameAndPassword (authParams : Object = {}) {
        // let request = <Price Request Generator>.generateRetailAuthRequest(authParams);
        // talk to the communication service and send the auth request
	}

	/**
     * Authenticate with SSO token
     * @param authParams An object with following properties set
     *                      channel		: Value Defined at Channels Enum. Mandatory
     *                      sso token	: SSO token. Mandatory
     *                      loginIP     : Machine IP
     *                      appVersion  : Application version
     *                      lan         : Current Language. Mandatory.
     */
	public authenticateWithSSOToken (authParams : Object = {}) {
	}

	//
	// API to handle price related meta and streaming
	//

	/**
     * Subscribe and Un-subscribe from exchange updates
     * @param exchange Exchange code string
     */
	public addExchangeRequest (exchange) {
	}

	public removeExchangeRequest (exchange) {
	}

    /**
     * Subscribe and Un-subscribe from symbol updates
     * @param exchange Exchange Code string
     * @param symbol Symbol Code string
     */
	public addSymbolRequest (exchange, symbol) {
	}

	public removeSymbolRequest (exchange, symbol) {
	}

	//
	// API to handle trade related meta and streaming
	//
}
