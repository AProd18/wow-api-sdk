import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 60 * 60 }); // 1 sat

export function cacheGet(key) {
  return cache.get(key);
}

export function cacheSet(key, value) {
  cache.set(key, value);
}
