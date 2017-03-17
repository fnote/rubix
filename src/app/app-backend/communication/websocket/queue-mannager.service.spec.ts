/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { QueueMannagerService } from './queue-mannager.service';

describe('QueueMannagerService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [QueueMannagerService]
		});
	});

	it('should ...', inject([QueueMannagerService], (service : QueueMannagerService) => {
		expect(service).toBeTruthy();
	}));
});
