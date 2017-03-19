/* tslint:disable:no-unused-variable */
import {TestBed, inject} from "@angular/core/testing";
import {TradeService} from "./trade.service";

describe('TradeService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [TradeService]
		});
	});

	it('should ...', inject([TradeService], (service: TradeService) => {
		expect(service).toBeTruthy();
	}));
});
