import { DataStore } from './data-store';

export class Market extends DataStore {

    // Meta
	exchangeCode : string;
	code : string;

	// Realtime
	volume : number;
	turnover : number;

	constructor(values : Object = {}) {
		super();
		Object.assign(this, values);
	}
}
