import { CacheConfig } from '../../app-config/cache-config';
import { CacheRequest } from './cache-request';
import { Channels } from '../../app-constants/enums/channels.enum';
import { Injectable } from '@angular/core';
import { LoggerService } from '../../app-utils/logger.service';
import { PriceRequest } from '../price/protocols/price-request';
import { PriceRequestTypes } from '../../app-constants/enums/price-request-types.enum';

@Injectable()
export class CacheRequestGenerator {
	private cacheConfig: CacheConfig;

	constructor(private logger: LoggerService) {
		this.cacheConfig = new CacheConfig();
	}

	public getRequest(request: {channel: Channels, data: PriceRequest, req_gen: (req: PriceRequest) => string}): CacheRequest {
		const category = Channels[request.channel] + '_' + request.data.MT;
		let name = '';
		if (request.data.TKN === null) {
			switch (request.data.MT) {
				case PriceRequestTypes.SymbolMeta:
					name = request.data.LAN + '_' + request.data.getParam()[0];
					break;
				case PriceRequestTypes.MutualFund:
					name = request.data.LAN + '_' + request.data.EXG + '_' + request.data.PRV;
					break;
				case PriceRequestTypes.MutualFundDS:
					name = request.data.LAN + '_' + request.data.SYM[0];
					break;
			}
			request.data.TKN = name;  // set cache value name to the TKN value which will be returned from Price
		} else {
			name = request.data.TKN;
		}
		return this.applyCacheConfig(new CacheRequest(request.channel, request.req_gen(request.data), category + '_' + name, category));
	}

	public putRequest(request: {channel: Channels, data: any, req: any}): CacheRequest {
		const category = Channels[request.channel] + '_' + request.req.MT;
		let name = '';
		if (request.req.TKN === null || request.req.TKN === undefined) {
			switch (request.req.MT) {
				case PriceRequestTypes.SymbolMeta:
				case PriceRequestTypes.MutualFund:
				case PriceRequestTypes.MutualFundDS:
				default: break;
			}
		} else {
			name = request.req.TKN;
		}
		return this.applyCacheConfig(new CacheRequest(request.channel, request.data, category + '_' + name, category));
	}

	private applyCacheConfig(cacheReq: CacheRequest): CacheRequest {
		return this.cacheConfig.get(cacheReq);
	}
}
