/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PulseService } from './pulse.service';

describe('PulseService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [PulseService]
		});
	});

	it('should ...', inject([PulseService], (service : PulseService) => {
		expect(service).toBeTruthy();
	}));
});
