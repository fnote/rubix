export class Stock {
	// Meta
    symbolCode: string;
	exchangeCode: string;
    longDesc: string;
	shortDesc: string;
    dispSymbCode: string;

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
