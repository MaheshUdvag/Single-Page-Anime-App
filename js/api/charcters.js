import { getDataFromCache, setDataToCache } from "../cache.js";

export const getCharacters = async (limit, offset) => {
  if (offset === 0) {
    const dataFromCache = await getDataFromCache(`getCharacters${limit}`);
    if (dataFromCache) return dataFromCache;
  }

  const response = await fetch(
    `https://kitsu.io/api/edge/characters?page[limit]=${limit}&page[offset]=${offset}&fields[characters]=names,name,image`
  );
  const { data } = await response.json();

  if (!data) return;

  if (offset === 0) await setDataToCache(`getCharacters${limit}`, data);

  return data;
};

export const getCharacterSearchResults = async (term, limit) => {
  const response = await fetch(
    `https://kitsu.io/api/edge/characters?filter[name]=${term}&page[limit]=${limit}&fields[characters]=names,name,image`
  );
  const { data } = await response.json();

  if (!data) return;

  return data;
};

export const getCharacterById = async (id) => {
  const dataFromCache = await getDataFromCache(`getCharacterById${id}`);
  if (dataFromCache) return dataFromCache;

  const response = await fetch(`https://kitsu.io/api/edge/characters/${id}`);
  const { data } = await response.json();

  if (!data) return;

  await setDataToCache(`getCharacterById${id}`, data);

  return data;
};
