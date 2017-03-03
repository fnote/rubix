export class Market {
    // Meta
    code: string;
	exchangeCode: string;

	// Realtime
	volume: number;
	turnover: number;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
