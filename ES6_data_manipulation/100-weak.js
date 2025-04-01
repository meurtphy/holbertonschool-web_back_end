export const weakMap = new WeakMap();

export function queryAPI(endpoint) {
  if (!weakMap.has(endpoint)) {
    weakMap.set(endpoint, 1);
  } else {
    const current = weakMap.get(endpoint);
    if (current >= 5) {
      throw new Error('Endpoint load is high');
    }
    weakMap.set(endpoint, current + 1);
  }
}
