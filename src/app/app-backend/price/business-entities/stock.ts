export class Stock {
	// Meta
    code: string;
	exchangeCode: string;
    longDesc: string;
	shortDesc: string;
    dispCode: string;

	// Realtime
	lastTradePrice: number;
	openPrice: number;
	highPrice: number;
	lowPrice: number;
	closePrice: number;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
