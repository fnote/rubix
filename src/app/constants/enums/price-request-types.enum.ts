export enum PriceRequestTypes {
	AuthMeta = -2,
	AuthPrice = -1,
	Pulse = 0,
	SnapshotSymbol = 10,
	SnapshotFullMarket,
	DetailQuoteSymbol,
	DetailQuoteFullMarket,
	ExchangeAndSubmarket = 15,
	Exchange = 17,
	SectorSummary,
	TimeAndSalesSymbol = 20,
	TimeAndSalesFullMarket,
	MarketDepthByPrice = 25,
	MarketDepthByOrder = 26,
	News = 30,
	Announcement = 35,
	OHLCSymbol = 40,
	OHLCFullMarket,
	SymbolMeta = 46,
	TopStocks = 50,
}
