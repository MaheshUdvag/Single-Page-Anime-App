import { getDataFromCache, setDataToCache } from "../cache.js";

export const getRecommendedAnime = async (limit, offset) => {
  if (offset === 0) {
    const dataFromCache = await getDataFromCache(`getRecommendedAnime${limit}`);
    if (dataFromCache) return dataFromCache;
  }

  const response = await fetch(
    `https://kitsu.io/api/edge/anime?filter[status]=current&sort=-averageRating&page[limit]=${limit}&page[offset]=${offset}&filter[subtype]=TV&filter[ageRating]=G&filter[ageRating]=PG`
  );
  const { data } = await response.json();

  if (!data) return;

  if (offset === 0) await setDataToCache(`getRecommendedAnime${limit}`, data);

  return data;
};

export const getAnimeSearchResults = async (term, limit) => {
  const response = await fetch(
    `https://kitsu.io/api/edge/anime?filter[text]=${term}&page[limit]=${limit}&fields[anime]=titles,canonicalTitle,posterImage`
  );
  const { data } = await response.json();

  if (!data) return;

  return data;
};

export const getTrendingAnime = async (limit, offset) => {
  if (offset === 0) {
    const dataFromCache = await getDataFromCache(`getTrendingAnime${limit}`);
    if (dataFromCache) return dataFromCache;
  }

  const response = await fetch(
    `https://kitsu.io/api/edge/trending/anime?page[limit]=${limit}&page[offset]=${offset}&fields[anime]=titles,canonicalTitle,posterImage`
  );
  const { data } = await response.json();

  if (!data) return;

  if (offset === 0) await setDataToCache(`getTrendingAnime${limit}`, data);

  return data;
};

export const getPopularAnime = async (limit, offset) => {
  if (offset === 0) {
    const dataFromCache = await getDataFromCache(`getPopularAnime${limit}`);
    if (dataFromCache) return dataFromCache;
  }

  const response = await fetch(
    `https://kitsu.io/api/edge/anime?sort=popularityRank&page[limit]=${limit}&page[offset]=${offset}&fields[anime]=titles,canonicalTitle,posterImage`
  );
  const { data } = await response.json();

  if (!data) return;

  if (offset === 0) await setDataToCache(`getPopularAnime${limit}`, data);

  return data;
};

export const getUpcomingAnime = async (limit, offset) => {
  if (offset === 0) {
    const dataFromCache = await getDataFromCache(`getUpcomingAnime${limit}`);
    if (dataFromCache) return dataFromCache;
  }

  const response = await fetch(
    `https://kitsu.io/api/edge/anime?filter[status]=upcoming&sort=-averageRating&page[limit]=${limit}&page[offset]=${offset}&fields[anime]=titles,canonicalTitle,posterImage`
  );
  const { data } = await response.json();

  if (!data) return;

  if (offset === 0) await setDataToCache(`getUpcomingAnime${limit}`, data);

  return data;
};

export const getTopAnime = async (limit, offset) => {
  if (offset === 0) {
    const dataFromCache = await getDataFromCache(`getTopAnime${limit}`);
    if (dataFromCache) return dataFromCache;
  }

  const response = await fetch(
    `https://kitsu.io/api/edge/anime?sort=-averageRating&page[limit]=${limit}&page[offset]=${offset}&fields[anime]=titles,canonicalTitle,posterImage`
  );
  const { data } = await response.json();

  if (!data) return;

  if (offset === 0) await setDataToCache(`getTopAnime${limit}`, data);

  return data;
};

export const getAiringAnimeNow = async (limit, offset) => {
  if (offset === 0) {
    const dataFromCache = await getDataFromCache(`getAiringAnimeNow${limit}`);
    if (dataFromCache) return dataFromCache;
  }

  const response = await fetch(
    `https://kitsu.io/api/edge/anime?sort=popularityRank&filter[status]=current&page[limit]=${limit}&page[offset]=${offset}&fields[anime]=titles,canonicalTitle,posterImage`
  );
  const { data } = await response.json();

  if (!data) return;

  if (offset === 0) await setDataToCache(`getAiringAnimeNow${limit}`, data);

  return data;
};

export const getAnimeById = async (id) => {
  const dataFromCache = await getDataFromCache(`getAnimeById${id}`);
  if (dataFromCache) return dataFromCache;

  const response = await fetch(`https://kitsu.io/api/edge/anime/${id}`);
  const { data } = await response.json();

  if (!data) return;

  await setDataToCache(`getAnimeById${id}`, data);

  return data;
};
