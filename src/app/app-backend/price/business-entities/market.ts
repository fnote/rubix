export class Market {

    // Meta
	exchangeCode : string;
	code : string;

	// Realtime
	volume : number;
	turnover : number;

	constructor(values : Object = {}) {
		Object.assign(this, values);
	}
}
