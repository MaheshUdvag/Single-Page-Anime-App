import { getDataFromCache, setDataToCache } from "../cache.js";

export const getRecommendedManga = async (limit, offset) => {
  if (offset === 0) {
    const dataFromCache = await getDataFromCache(`getRecommendedManga${limit}`);
    if (dataFromCache) return dataFromCache;
  }

  const response = await fetch(
    `https://kitsu.io/api/edge/manga?filter[status]=current&sort=-averageRating&page[limit]=${limit}&page[offset]=${offset}&fields[manga]=titles,canonicalTitle,posterImage`
  );
  const { data } = await response.json();

  if (!data) return;

  if (offset === 0) await setDataToCache(`getRecommendedManga${limit}`, data);

  return data;
};

export const getTrendingManga = async (limit, offset) => {
  if (offset === 0) {
    const dataFromCache = await getDataFromCache(`getTrendingManga${limit}`);
    if (dataFromCache) return dataFromCache;
  }

  const response = await fetch(
    `https://kitsu.io/api/edge/trending/manga?page[limit]=${limit}&page[offset]=${offset}&fields[manga]=titles,canonicalTitle,posterImage`
  );
  const { data } = await response.json();

  if (!data) return;

  if (offset === 0) await setDataToCache(`getTrendingManga${limit}`, data);

  return data;
};

export const getPopularManga = async (limit, offset) => {
  if (offset === 0) {
    const dataFromCache = await getDataFromCache(`getPopularManga${limit}`);
    if (dataFromCache) return dataFromCache;
  }

  const response = await fetch(
    `https://kitsu.io/api/edge/manga?sort=popularityRank&page[limit]=${limit}&page[offset]=${offset}&fields[manga]=titles,canonicalTitle,posterImage`
  );
  const { data } = await response.json();

  if (!data) return;

  if (offset === 0) await setDataToCache(`getPopularManga${limit}`, data);

  return data;
};

export const getMangaSearchResults = async (term, limit) => {
  const response = await fetch(
    `https://kitsu.io/api/edge/manga?filter[text]=${term}&page[limit]=${limit}&fields[manga]=titles,canonicalTitle,posterImage`
  );
  const { data } = await response.json();

  if (!data) return;

  return data;
};

export const getUpcomingManga = async (limit, offset) => {
  if (offset === 0) {
    const dataFromCache = await getDataFromCache(`getUpcomingManga${limit}`);
    if (dataFromCache) return dataFromCache;
  }

  const response = await fetch(
    `https://kitsu.io/api/edge/manga?filter[status]=upcoming&sort=-averageRating&page[limit]=${limit}&page[offset]=${offset}&fields[manga]=titles,canonicalTitle,posterImage`
  );
  const { data } = await response.json();

  if (!data) return;

  if (offset === 0) await setDataToCache(`getUpcomingManga${limit}`, data);

  return data;
};

export const getTopManga = async (limit, offset) => {
  if (offset === 0) {
    const dataFromCache = await getDataFromCache(`getTopManga${limit}`);
    if (dataFromCache) return dataFromCache;
  }

  const response = await fetch(
    `https://kitsu.io/api/edge/manga?sort=ratingRank&page[limit]=${limit}&page[offset]=${offset}&fields[manga]=titles,canonicalTitle,posterImage`
  );
  const { data } = await response.json();

  if (!data) return;

  if (offset === 0) await setDataToCache(`getTopManga${limit}`, data);

  return data;
};

export const getMangaById = async (id) => {
  const dataFromCache = await getDataFromCache(`getMangaById${id}`);
  if (dataFromCache) return dataFromCache;

  const response = await fetch(`https://kitsu.io/api/edge/manga/${id}`);
  const { data } = await response.json();

  if (!data) return;

  await setDataToCache(`getMangaById${id}`, data);

  return data;
};
