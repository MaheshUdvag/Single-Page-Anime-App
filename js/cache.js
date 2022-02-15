const cache = await caches.open("anime-v1");
const cacheAvailable = "caches" in self;

export const getDataFromCache = async (key) => {
  let data;
  if (cacheAvailable) {
    const response = await cache.match(key);

    if (response) {
      data = await response.json();
    }
  }

  return data;
};

export const setDataToCache = async (key, data) => {
  if (cacheAvailable) await cache.put(key, new Response(JSON.stringify(data)));
};

export const deleteDataFromCache = async (key) => {
  if (cacheAvailable) await cache.delete(key);
};
