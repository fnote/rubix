export enum CachePolicy {
	NetWorkOnly = 1, // get only from network
	CacheOrNetwork, // get from cache if is expired get from network
	CacheUpdate, // get from cache but update the cache
	CacheUpdateRefresh, // get from cache but request updates from network and return
}
