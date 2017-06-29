import { CacheConfig } from '../../app-config/cache-config';
import { CacheRequest } from './cache-request';
import { Channels } from '../../app-constants/enums/channels.enum';
import { Injectable } from '@angular/core';
import { LoggerService } from '../../app-utils/logger.service';
import { PriceRequest } from '../price/protocols/price-request';

@Injectable()
export class CacheRequestGenerator {
	private cacheConfig: CacheConfig;
	constructor(private logger: LoggerService) {
		this.cacheConfig = new CacheConfig();
	}

	public getRequest(request: {channel: Channels, data: any, req: PriceRequest}): CacheRequest {
		return this.applyCacheConfig(new CacheRequest(request.channel, request.data, Channels[request.channel] + '_' + request.req.MT));
	}

	private applyCacheConfig(cacheReq: CacheRequest): CacheRequest {
		return this.cacheConfig.get(cacheReq);
	}
}
