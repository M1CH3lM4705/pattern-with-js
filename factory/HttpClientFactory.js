import withCache from '../decorator/cache.js';
import FetchClient from '../HttpClients/FetchClient.js';

export default class HttpClientFactory {

    static create(baseUrl, useCache = true, ttl = 60_000_000) {
        let ClientClass = FetchClient;

        if (useCache) {
            ClientClass = withCache(FetchClient, ttl)
        }
        return new ClientClass(baseUrl);
    }
}