export default function withCache(clientClass, ttl = 60_000_000) {
  return class extends clientClass {
    constructor(...args) {
      super(...args)
      this.cache = new Map();
    }

    async request(endpoint, method = 'GET', data = null, headers = {}) {
      const cacheKey = `${method}-${endpoint}-${JSON.stringify(data)}-${JSON.stringify(headers)}`;
      const cached = this.cache.get(cacheKey);

      if (cached && (Date.now() - cached.timestamp < ttl)) {
        console.log('Retornado do cache!\n')
        return cached.result;
      }

      const result = await super.request(endpoint, method, data, headers);
      this.cache.set(cacheKey, { result, timestamp: Date.now() });

      setTimeout(() => this.cache.delete(cacheKey), ttl);

      return result;
    }
  }
}