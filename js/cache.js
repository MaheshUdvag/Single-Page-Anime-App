const cache = await caches.open("anime-v1");
const cacheAvailable = "caches" in self;

export const getDataFromCache = async (key) => {
  let cachedData;
  if (cacheAvailable) {
    const response = await cache.match(key);

    if (response) {
      const { data, cachedTime } = await response.json();
      const diffDays = parseInt(
        (new Date().getTime() - cachedTime) / (1000 * 60 * 60 * 24)
      );
      if (diffDays < 2) {
        cachedData = data;
      }
    }
  }

  return cachedData;
};

export const setDataToCache = async (key, data) => {
  const cachedTime = new Date().getTime();
  data = { cachedTime, data };
  if (cacheAvailable) await cache.put(key, new Response(JSON.stringify(data)));
};

export const deleteDataFromCache = async (key) => {
  if (cacheAvailable) await cache.delete(key);
};
