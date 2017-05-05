import { DataService } from '../communication/data.service';
import { Injectable } from '@angular/core';
import { LoggerService } from '../../app-utils/logger.service';
import { PriceRequestTypes } from '../../app-constants/enums/price-request-types.enum';
import { PriceSubscriptionService } from './price-subscription.service';
import { TestBed } from '@angular/core/testing';

describe('Price Subscription Service Test ', () => {
	let dataService: DataService;
	let loggerService: LoggerService;
	let priceSubscriptionService: PriceSubscriptionService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [{ provide: DataService, useClass: MockDataService }],
		});

		dataService = TestBed.get(DataService);
		loggerService = loggerService as LoggerService;
		priceSubscriptionService = new PriceSubscriptionService(dataService, loggerService);
	});

	it('Subscribe to the exchange', () => {
		expect(priceSubscriptionService.subscribeFor(PriceRequestTypes.AuthMeta, 'DFM')).toBe(true); // first subscription should return true
		expect(priceSubscriptionService.subscribeFor(PriceRequestTypes.AuthMeta, 'DFM')).toBe(false); // second subscription should return false
	});

	it('Subscribe to the exchange and then unsubscribe', () => {
		expect(priceSubscriptionService.subscribeFor(PriceRequestTypes.AuthMeta, 'DFM')).toBe(true); // subscription should return true
		expect(priceSubscriptionService.unSubscribeFor(PriceRequestTypes.AuthMeta, 'DFM')).toBe(true); // unsubscription should return true
	});

	it('Subscribe to the exchange twice and one un subscription', () => {
		expect(priceSubscriptionService.subscribeFor(PriceRequestTypes.AuthMeta, 'DFM')).toBe(true); // first subscription
		expect(priceSubscriptionService.subscribeFor(PriceRequestTypes.AuthMeta, 'DFM')).toBe(false); // second subscription is false
		expect(priceSubscriptionService.unSubscribeFor(PriceRequestTypes.AuthMeta, 'DFM')).toBe(false); // first un subscription is false
		expect(priceSubscriptionService.unSubscribeFor(PriceRequestTypes.AuthMeta, 'DFM')).toBe(true); // second un subscription is true
	});

	it('Subscribe exchanges with multiple request types', () => {
		// first subscription to DFM for auth meta is true
		expect(priceSubscriptionService.subscribeFor(PriceRequestTypes.AuthMeta, 'DFM')).toBe(true);

		// second subscription to DFM for auth meta is false
		expect(priceSubscriptionService.subscribeFor(PriceRequestTypes.AuthMeta, 'DFM')).toBe(false);

		// first subscripion to DFM for exchange data is true
		expect(priceSubscriptionService.subscribeFor(PriceRequestTypes.Exchange, 'DFM')).toBe(true);

		// auth meta for ADSM exchange is true
		expect(priceSubscriptionService.subscribeFor(PriceRequestTypes.AuthMeta, 'ADSM')).toBe(true);

		// exchange data for ADSM exchange is true
		expect(priceSubscriptionService.subscribeFor(PriceRequestTypes.Exchange, 'ADSM')).toBe(true);

		// auth mets for ADSM exchange should false
		expect(priceSubscriptionService.subscribeFor(PriceRequestTypes.AuthMeta, 'ADSM')).toBe(false);
	});

	it('Un Subscribe to the exchange', () => {

		// un subscribe without subscribe is false
		expect(priceSubscriptionService.unSubscribeFor(PriceRequestTypes.Exchange, 'DFM')).toBe(false);

		// subscription is true
		expect(priceSubscriptionService.subscribeFor(PriceRequestTypes.Exchange, 'DFM')).toBe(true);

		// unsubscription is true
		expect(priceSubscriptionService.unSubscribeFor(PriceRequestTypes.Exchange, 'DFM')).toBe(true);

		// again unsubscription is false
		expect(priceSubscriptionService.unSubscribeFor(PriceRequestTypes.Exchange, 'DFM')).toBe(false);
	});

	it('Subscribe to the symbol ', () => {
		// subscribe to the symbol is true
		expect(priceSubscriptionService.subscribeFor(PriceRequestTypes.SymbolMeta, 'DFM', 'EMAAR')).toBe(true);

		// second subscription to same symbol is false
		expect(priceSubscriptionService.subscribeFor(PriceRequestTypes.SymbolMeta, 'DFM', 'EMAAR')).toBe(false);
	});

	it('Subscribe to the symbol and then un subscribe ', () => {
		// subscribe to the symbol is true
		expect(priceSubscriptionService.subscribeFor(PriceRequestTypes.SymbolMeta, 'DFM', 'EMAAR')).toBe(true);

		// second subscription to same symbol is false
		expect(priceSubscriptionService.unSubscribeFor(PriceRequestTypes.SymbolMeta, 'DFM', 'EMAAR')).toBe(true);
	});

	it('Subscribe to the symbol and un subscribe twice ', () => {
		// subscribe to the symbol is true
		expect(priceSubscriptionService.subscribeFor(PriceRequestTypes.SymbolMeta, 'DFM', 'EMAAR')).toBe(true);

		// subscribe to the same symbol again is false
		expect(priceSubscriptionService.subscribeFor(PriceRequestTypes.SymbolMeta, 'DFM', 'EMAAR')).toBe(false);

		// un subscribe from the symbol is false
		expect(priceSubscriptionService.unSubscribeFor(PriceRequestTypes.SymbolMeta, 'DFM', 'EMAAR')).toBe(false);

		// second un subsciption should true
		expect(priceSubscriptionService.unSubscribeFor(PriceRequestTypes.SymbolMeta, 'DFM', 'EMAAR')).toBe(true);

	});

	it('Subscribe and un subscribe to the same symbol code with different exchange', () => {
		// subscribe to the EMAAR  symbol in DFM is true
		expect(priceSubscriptionService.subscribeFor(PriceRequestTypes.SymbolMeta, 'DFM', 'EMAAR')).toBe(true);

		// unsubscribe to EMAAR in TDWL should return false
		expect(priceSubscriptionService.unSubscribeFor(PriceRequestTypes.SymbolMeta, 'TDWL', 'EMAAR')).toBe(false);

		// subscribe to the EMAAR in TDWL exchange is true
		expect(priceSubscriptionService.subscribeFor(PriceRequestTypes.SymbolMeta, 'TDWL', 'EMAAR')).toBe(true);

		// un subscribe to the EMAAR  symbol in DFM is true
		expect(priceSubscriptionService.unSubscribeFor(PriceRequestTypes.SymbolMeta, 'DFM', 'EMAAR')).toBe(true);
	});

	it('Subscribe and unsubscribe to the same symbols with different message types', () => {
		// subscribe to the EMAAR  symbol in DFM for symbol meta true
		expect(priceSubscriptionService.subscribeFor(PriceRequestTypes.SymbolMeta, 'DFM', 'EMAAR')).toBe(true);

		// subscribe to EMAAR in DFM for announcements is true
		expect(priceSubscriptionService.subscribeFor(PriceRequestTypes.Announcement, 'DFM', 'EMAAR')).toBe(true);

		// un subscribe to announcements in DFM - EMAAR should be true
		expect(priceSubscriptionService.unSubscribeFor(PriceRequestTypes.Announcement, 'DFM', 'EMAAR')).toBe(true);
	});

	it('Subscribe to symbol and then exchange for same request', () => {
		// subscribe to the EMAAR  symbol in DFM for symbol meta true
		expect(priceSubscriptionService.subscribeFor(PriceRequestTypes.SymbolMeta, 'DFM', 'EMAAR')).toBe(true);

		// subscribe to DFM for symbol meta is true
		expect(priceSubscriptionService.subscribeFor(PriceRequestTypes.SymbolMeta, 'DFM')).toBe(true);

		// subscribe to the DFM - ARTC for symbol meta is false
		expect(priceSubscriptionService.subscribeFor(PriceRequestTypes.SymbolMeta, 'DFM', 'ARTC')).toBe(false);

		// un subscribe to DFM-EMAAR for symbol meta is false
		expect(priceSubscriptionService.unSubscribeFor(PriceRequestTypes.SymbolMeta, 'DFM', 'ARTC')).toBe(false);

		// un subscribe to DFM for symbol meta is true
		expect(priceSubscriptionService.unSubscribeFor(PriceRequestTypes.SymbolMeta, 'DFM')).toBe(true);

		// un subscribe to the DFM - EMAAR for symbol meta true
		expect(priceSubscriptionService.unSubscribeFor(PriceRequestTypes.SymbolMeta, 'DFM', 'EMAAR')).toBe(true);

	});

});

@Injectable()
class MockDataService {
	public sendToWs(data: any): void {
		// tslint:disable-next-line:no-console
		console.log('Mock Data Service Received Data : ' + data);
	}
}
