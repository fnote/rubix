export enum RequestPolicy {
	NetWorkOnly = 1, // get only from network
	CacheOrNetwork = 2, // get from cache if is expired get from network
	CacheUpdate = 3, // get from cache but update the cache
	CacheUpdateRefresh = 4 // get from cache but request updates from network and return
}
