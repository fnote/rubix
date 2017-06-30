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

	public getRequest(request: {channel: Channels, data: any, req: PriceRequest}): CacheRequest {
		const category = Channels[request.channel] + '_' + request.req.MT;
		let name = '';
		switch (request.req.MT) {
			case PriceRequestTypes.SymbolMeta:
				name = request.req.getParam()[0];
				break;
		}
		return this.applyCacheConfig(new CacheRequest(request.channel, request.data, category + '_' + name, category));
	}

	public putRequest(request: {channel: Channels, data: any, req: any}): CacheRequest {
		const category = Channels[request.channel] + '_' + request.req.MT;
		let name = '';
		switch (request.req.MT) {
			case PriceRequestTypes.SymbolMeta:
				name = request.req.EXG + '~' + request.req.SYM;
				break;
		}
		return this.applyCacheConfig(new CacheRequest(request.channel, request.data, category + '_' + name, category));
	}

	private applyCacheConfig(cacheReq: CacheRequest): CacheRequest {
		return this.cacheConfig.get(cacheReq);
	}
}
