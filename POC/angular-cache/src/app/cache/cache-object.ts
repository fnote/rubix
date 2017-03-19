import { RequestPolicy } from './util/replacement-policy.enum';
export class CacheObject {
	keyName : string;
	store : string;
	ttl : number;
	requestPolicy : RequestPolicy;
	persistTime :number;
}
