import { BaseEntity } from './base-entity';
import { CommonHelperService } from '../../../app-utils/helper/common-helper.service';
import { userSettings } from '../../../app-config/user-settings';

export class StockEntity extends BaseEntity {

	private _commonHelperService: CommonHelperService;

	private _instrumentType: number = userSettings.marketData.defaultDecimalPlaces;
	private _longDesc: string = userSettings.marketData.defaultStringInitializer;
	private _shortDesc: string = userSettings.marketData.defaultStringInitializer;
	private _dispCode: string = userSettings.marketData.defaultStringInitializer;
	private _currency: string = userSettings.marketData.defaultStringInitializer;
	private _decimalPlaces: number = userSettings.marketData.defaultDecimalPlaces;
	private _decimalCorrectionFactor: number = userSettings.marketData.defaultDecimalPlaces;
	private _sectorCode: number = userSettings.marketData.defaultNumberInitializer.zeroInitializer;

	private _lastTradePrice: [string, number] = [
		userSettings.marketData.defaultStringInitializer,
		userSettings.marketData.defaultNumberInitializer.zeroInitializer,
	];

	private _openPrice: string = userSettings.marketData.defaultStringInitializer;
	private _rawHighPrice: number = userSettings.marketData.defaultNumberInitializer.zeroInitializer;
	private _highPrice: string = userSettings.marketData.defaultStringInitializer;
	private _rawLowPrice: number = userSettings.marketData.defaultNumberInitializer.zeroInitializer;
	private _lowPrice: string = userSettings.marketData.defaultStringInitializer;
	private _closePrice: string = userSettings.marketData.defaultStringInitializer;
	private _bestAskPrice: string = userSettings.marketData.defaultStringInitializer;
	private _rawBestAskPrice: number = userSettings.marketData.defaultNumberInitializer.minusOneInitializer;
	private _bestAskQty: string = userSettings.marketData.defaultStringInitializer;
	private _rawBestBidPrice: number = userSettings.marketData.defaultNumberInitializer.minusOneInitializer;
	private _bestBidPrice: string = userSettings.marketData.defaultStringInitializer;
	private _bestBidQty: string = userSettings.marketData.defaultStringInitializer;
	private _rawTotalBidQty: number = userSettings.marketData.defaultNumberInitializer.zeroInitializer;
	private _totalBidQty: string = userSettings.marketData.defaultStringInitializer;
	private _rawTotalAskQty: number = userSettings.marketData.defaultNumberInitializer.zeroInitializer;
	private _totalAskQty: string = userSettings.marketData.defaultStringInitializer;
	private _rawChange: number = userSettings.marketData.defaultNumberInitializer.zeroInitializer;
	private _change: string = userSettings.marketData.defaultStringInitializer;
	private _perChange: string = userSettings.marketData.defaultStringInitializer;
	private _previousClosePrice: string = userSettings.marketData.defaultStringInitializer;
	private _turnover: string = userSettings.marketData.defaultStringInitializer;
	private _volume: string = userSettings.marketData.defaultStringInitializer;
	private _trades: string = userSettings.marketData.defaultStringInitializer;
	private _totalQty: string = userSettings.marketData.defaultStringInitializer;
	private _lastTradeDate: string = userSettings.marketData.defaultStringInitializer;
	private _vwap: string = userSettings.marketData.defaultStringInitializer;
	private _min: string = userSettings.marketData.defaultStringInitializer;
	private _max: string = userSettings.marketData.defaultStringInitializer;
	private _rawHigh52: number = userSettings.marketData.defaultNumberInitializer.zeroInitializer;
	private _high52: string = userSettings.marketData.defaultStringInitializer;
	private _rawLow52: number = userSettings.marketData.defaultNumberInitializer.zeroInitializer;
	private _low52: string = userSettings.marketData.defaultStringInitializer;
	private _bidOffer: string = userSettings.marketData.defaultStringInitializer;
	private _spreadPercentage: string = userSettings.marketData.defaultStringInitializer;
	private _spread: string = userSettings.marketData.defaultStringInitializer;
	private _rangePercentage: string = userSettings.marketData.defaultStringInitializer;
	private _range: string = userSettings.marketData.defaultStringInitializer;
	private _bidOfferDifference: string = userSettings.marketData.defaultStringInitializer;

	public set commonHelperService(value: CommonHelperService) {
		this._commonHelperService = value;
	}

	public get instrumentType(): number  {
		return this._instrumentType;
	}

	public set instrumentType(value: number) {
		this._instrumentType = value;
	}

	public get longDesc(): string  {
		return this._longDesc;
	}

	public set longDesc(value: string) {
		this._longDesc = value;
	}

	public get shortDesc(): string  {
		return this._shortDesc;
	}

	public set shortDesc(value: string) {
		this._shortDesc = value;
	}

	public get currency(): string  {
		return this._currency;
	}

	public set currency(value: string) {
		this._currency = value;
	}

	public get dispCode(): string  {
		return this._dispCode;
	}

	public set dispCode(value: string) {
		this._dispCode = value;
	}

	public get decimalPlaces(): number {
		return this._decimalPlaces;
	}

	public set decimalPlaces(value: number) {
		this._decimalPlaces = value;
	}

	public get decimalCorrectionFactor(): number  {
		return this._decimalCorrectionFactor;
	}

	public set decimalCorrectionFactor(value: number) {
		this._decimalCorrectionFactor = value;
	}

	public get sectorCode(): number  {
		return this._sectorCode;
	}

	public set sectorCode(value: number) {
		this._sectorCode = value;
	}

	public getDispLastTradePrice(): string  {
		return this._lastTradePrice[0];
	}

	public getRawLastTradePrice(): number  {
		return this._lastTradePrice[1];
	}

	public set lastTradePrice(value: number) {
		this._lastTradePrice = [this._commonHelperService.formatNumber(value, this.decimalPlaces), value];
	}

	public get openPrice(): string  {
		return this._openPrice;
	}

	public set openPrice(value: string) {
		this._openPrice = this._commonHelperService.formatNumber(parseFloat(value), this.decimalPlaces);
	}

	public get rawHighPrice(): number  {
		return this._rawHighPrice;
	}

	public set rawHighPrice(value: number) {
		this._rawHighPrice = value;
		this.calculateRange();
	}

	public get highPrice(): string  {
		return this._highPrice;
	}

	public set highPrice(value: string) {
		this.rawHighPrice = parseFloat(value);
		this._highPrice = this._commonHelperService.formatNumber(this.rawHighPrice, this.decimalPlaces);
	}

	public get rawLowPrice(): number  {
		return this._rawLowPrice;
	}

	public set rawLowPrice(value: number) {
		this._rawLowPrice = value;
		this.calculateRange();
	}

	public get lowPrice(): string  {
		return this._lowPrice;
	}

	public set lowPrice(value: string) {
		this.rawLowPrice = parseFloat(value);
		this._lowPrice = this._commonHelperService.formatNumber(this.rawLowPrice, this.decimalPlaces);
	}

	public get closePrice(): string  {
		return this._closePrice;
	}

	public set closePrice(value: string) {
		this._closePrice = this._commonHelperService.formatNumber(parseFloat(value), this.decimalPlaces);
	}

	public get rawBestAskPrice(): number  {
		return this._rawBestAskPrice;
	}

	public set rawBestAskPrice(value: number) {
		this._rawBestAskPrice = value;

		this.calculateSpread();
		this.calculateBidOfferDifference();
	}

	public get bestAskPrice(): string  {
		return this._bestAskPrice;
	}

	public set bestAskPrice(value: string) {
		this.rawBestAskPrice = parseFloat(value);
		this._bestAskPrice = this._commonHelperService.formatNumber(this.rawBestAskPrice, this.decimalPlaces);
	}

	public get bestAskQty(): string  {
		return this._bestAskQty;
	}

	public set bestAskQty(value: string) {
		this._bestAskQty = this._commonHelperService.formatNumber(parseFloat(value), 0);
	}

	public get rawBestBidPrice(): number  {
		return this._rawBestBidPrice;
	}

	public set rawBestBidPrice(value: number) {
		this._rawBestBidPrice = value;

		this.calculateSpread();
		this.calculateBidOfferDifference();
	}

	public get bestBidPrice(): string  {
		return this._bestBidPrice;
	}

	public set bestBidPrice(value: string) {
		this.rawBestBidPrice = parseFloat(value);
		this._bestBidPrice = this._commonHelperService.formatNumber(this.rawBestBidPrice, this.decimalPlaces);
	}

	public get bestBidQty(): string  {
		return this._bestBidQty;
	}

	public set bestBidQty(value: string) {
		this._bestBidQty = this._commonHelperService.formatNumber(parseFloat(value), 0);
	}

	public get rawTotalBidQty(): number  {
		return this._rawTotalBidQty;
	}

	public set rawTotalBidQty(value: number) {
		this._rawTotalBidQty = value;

		this.calculateBidOfferRatio();
	}

	public get totalBidQty(): string  {
		return this._totalBidQty;
	}

	public set totalBidQty(value: string) {
		this.rawTotalBidQty = parseFloat(value);
		this._totalBidQty = this._commonHelperService.formatNumber(this.rawTotalBidQty, 0);
	}

	public get rawTotalAskQty(): number  {
		return this._rawTotalAskQty;
	}

	public set rawTotalAskQty(value: number) {
		this._rawTotalAskQty = value;

		this.calculateBidOfferRatio();
	}

	public get totalAskQty(): string  {
		return this._totalAskQty;
	}

	public set totalAskQty(value: string) {
		this.rawTotalAskQty = parseFloat(value);
		this._totalAskQty = this._commonHelperService.formatNumber(this.rawTotalAskQty, 0);
	}

	public get rawChange(): number {
		return this._rawChange;
	}

	public set rawChange(value: number) {
		this._rawChange = value;
	}

	public get change(): string {
		return this._change;
	}

	public set change(value: string) {
		this.rawChange = parseFloat(value);
		this._change = this._commonHelperService.formatNumber(this.rawChange, this.decimalPlaces);
	}

	public get perChange(): string {
		return this._perChange;
	}

	public set perChange(value: string) {
		this._perChange = this._commonHelperService.formatNumber(
			parseFloat(value), userSettings.marketData.defaultPercentageDecimalPlaces);
	}

	public get previousClosePrice(): string {
		return this._previousClosePrice;
	}

	public set previousClosePrice(value: string) {
		this._previousClosePrice = this._commonHelperService.formatNumber(parseFloat(value), this.decimalPlaces);
	}

	public get turnover(): string {
		return this._turnover;
	}

	public set turnover(value: string) {
		this._turnover = this._commonHelperService.formatNumber(parseFloat(value), 0);
	}

	public get volume(): string {
		return this._volume;
	}

	public set volume(value: string) {
		this._volume = this._commonHelperService.formatNumber(parseFloat(value), 0);
	}

	public get trades(): string {
		return this._trades;
	}

	public set trades(value: string) {
		this._trades = this._commonHelperService.formatNumber(parseFloat(value), 0);
	}

	public get totalQty(): string {
		return this._totalQty;
	}

	public set totalQty(value: string) {
		this._totalQty = this._commonHelperService.formatNumber(parseFloat(value), 0);
	}

	public get lastTradeDate(): string {
		return this._lastTradeDate;
	}

	public set lastTradeDate(value: string) {
		this._lastTradeDate = this._commonHelperService.formatDate(value.toString(), 'YYYY-MM-DD hh:mm:ss', this.exchangeCode, '2');
	}

	public get vwap(): string {
		return this._vwap;
	}

	public set vwap(value: string) {
		this._vwap = this._commonHelperService.formatNumber(parseFloat(value), this.decimalPlaces);
	}

	public get min(): string {
		return this._min;
	}

	public set min(value: string) {
		this._min = this._commonHelperService.formatNumber(parseFloat(value), this.decimalPlaces);
	}

	public get max(): string {
		return this._max;
	}

	public set max(value: string) {
		this._max = this._commonHelperService.formatNumber(parseFloat(value), this.decimalPlaces);
	}

	public get rawHigh52(): number {
		return this._rawHigh52;
	}

	public set rawHigh52(value: number) {
		this._rawHigh52 = value;
	}

	public get high52(): string {
		return this._high52;
	}

	public set high52(value: string) {
		this.rawHigh52 = parseFloat(value);
		this._high52 = this._commonHelperService.formatNumber(this.rawHigh52, this.decimalPlaces);
	}

	public get rawLow52(): number {
		return this._rawLow52;
	}

	public set rawLow52(value: number) {
		this._rawLow52 = value;
	}

	public get low52(): string {
		return this._low52;
	}

	public set low52(value: string) {
		this.rawLow52 = parseFloat(value);
		this._low52 = this._commonHelperService.formatNumber(this.rawLow52, this.decimalPlaces);
	}

	public get bidOffer(): string {
		return this._bidOffer;
	}

	public get spreadPercentage(): string  {
		return this._spreadPercentage;
	}

	public set spreadPercentage(value: string) {
		this._spreadPercentage = value;
	}

	public get spread(): string  {
		return this._spread;
	}

	public set spread(value: string) {
		this._spread = value;
	}

	public get rangePercentage(): string  {
		return this._rangePercentage;
	}

	public set rangePercentage(value: string) {
		this._rangePercentage = value;
	}

	public get range(): string  {
		return this._range;
	}

	public set range(value: string) {
		this._range = value;
	}

	public get bidOfferDifference(): string {
		return this._bidOfferDifference;
	}

	public set bidOfferDifference(value: string) {
		this._bidOfferDifference = value;
	}

	constructor(values: Object = {}) {
		super();
		this.setValues(values);
	}

	// Computed properties
	private calculateBidOfferRatio(): void {
		if (this.rawTotalAskQty > 0 && this.rawTotalBidQty) {
			const val = this.rawTotalBidQty / this.rawTotalAskQty;
			this._bidOffer = this._commonHelperService.formatNumber(val, this.decimalPlaces);
		}
	}

	private calculateSpread(): void {
		let spreadVal = 0;
		let spreadPer = 0;
		if (this.rawBestAskPrice > 0 && this.rawBestBidPrice > 0) {
			spreadVal = this.rawBestAskPrice - this.rawBestBidPrice;
			spreadPer = 100 * spreadVal * 2 / (this.rawBestAskPrice + this.rawBestBidPrice);
		}

		this.spread = this._commonHelperService.formatNumber(spreadVal, this.decimalPlaces);
		this.spreadPercentage = this._commonHelperService.formatNumber(spreadPer, 2) + '%';
	}

	private calculateRange(): void {
		let rangeVal = 0;
		let rangePer = 0;
		if (this._rawLowPrice > 0 && this.rawHighPrice > 0) {
			rangeVal = this.rawHighPrice - this._rawLowPrice;
			rangePer = 100 * rangeVal * 2 / (this.rawHighPrice + this.rawLowPrice);
		}

		this.range = this._commonHelperService.formatNumber(rangeVal, this.decimalPlaces);
		this.rangePercentage = this._commonHelperService.formatNumber(rangePer, 2) + '%';
	}

	private calculateBidOfferDifference(): void {
		let difference = 0;
		if (this._rawBestAskPrice !== userSettings.marketData.defaultNumberInitializer.minusOneInitializer &&
			this._rawBestBidPrice !== userSettings.marketData.defaultNumberInitializer.minusOneInitializer) {
			difference = this._rawBestAskPrice - this._rawBestBidPrice;
			this.bidOfferDifference = this._commonHelperService.formatNumber(difference, this.decimalPlaces);
		}
	}
}
