export class Exchange {
	// Meta
	code: string;
    longDesc: string;
	shortDesc: string;
    dispExgCode: string;
	decimalCorrFactor: number;
	decimalPlaces: number;
	currency: string;
	countryCode: string;
	timeZoneOffset: number;

	// Realtime
	marketStatus: number;
	dateUTC: number;
	dateDisplay: string
	timeDisplay: string;
	ups: number;
	downs: number;
	noChange: number;
	volume: number;
	turnover: number;
	trades: number;
	symbolsTraded: number;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
