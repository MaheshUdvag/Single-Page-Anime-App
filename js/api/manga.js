import { getDataFromCache, setDataToCache } from "../cache.js";

export const getRecommendedManga = async (limit, offset) => {
  if (offset === 0) {
    const dataFromCache = await getDataFromCache("getRecommendedManga");
    if (dataFromCache) return dataFromCache;
  }

  const response = await fetch(
    `https://kitsu.io/api/edge/manga?filter[status]=current&sort=-averageRating&page[limit]=${limit}&page[offset]=${offset}&fields[manga]=titles,canonicalTitle,posterImage`
  );
  const { data } = await response.json();

  if (!data) return;

  if (offset === 0) await setDataToCache("getRecommendedManga", data);

  return data;
};

export const getTrendingManga = async (limit, offset) => {
  if (offset === 0) {
    const dataFromCache = await getDataFromCache("getTrendingManga");
    if (dataFromCache) return dataFromCache;
  }

  const response = await fetch(
    `https://kitsu.io/api/edge/trending/manga?page[limit]=${limit}&page[offset]=${offset}&fields[manga]=titles,canonicalTitle,posterImage`
  );
  const { data } = await response.json();

  if (!data) return;

  if (offset === 0) await setDataToCache("getTrendingManga", data);

  return data;
};

export const getPopularManga = async (limit, offset) => {
  if (offset === 0) {
    const dataFromCache = await getDataFromCache("getPopularManga");
    if (dataFromCache) return dataFromCache;
  }

  const response = await fetch(
    `https://kitsu.io/api/edge/manga?sort=popularityRank&page[limit]=${limit}&page[offset]=${offset}&fields[manga]=titles,canonicalTitle,posterImage`
  );
  const { data } = await response.json();

  if (!data) return;

  if (offset === 0) await setDataToCache("getPopularManga", data);

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
    const dataFromCache = await getDataFromCache("getUpcomingManga");
    if (dataFromCache) return dataFromCache;
  }

  const response = await fetch(
    `https://kitsu.io/api/edge/manga?filter[status]=upcoming&sort=-averageRating&page[limit]=${limit}&page[offset]=${offset}&fields[manga]=titles,canonicalTitle,posterImage`
  );
  const { data } = await response.json();

  if (!data) return;

  if (offset === 0) await setDataToCache("getUpcomingManga", data);

  return data;
};

export const getTopManga = async (limit, offset) => {
  if (offset === 0) {
    const dataFromCache = await getDataFromCache("getTopManga");
    if (dataFromCache) return dataFromCache;
  }

  const response = await fetch(
    `https://kitsu.io/api/edge/manga?sort=ratingRank&page[limit]=${limit}&page[offset]=${offset}&fields[manga]=titles,canonicalTitle,posterImage`
  );
  const { data } = await response.json();

  if (!data) return;

  if (offset === 0) await setDataToCache("getTopManga", data);

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
