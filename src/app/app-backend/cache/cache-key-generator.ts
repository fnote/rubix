import { PriceRequest } from '../price/protocols/price-request';

export class CacheKeyGenerator {
	public getKey(request: PriceRequest): string {
		return request.mt.toString();
	}
}
