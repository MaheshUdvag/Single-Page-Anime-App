export const getRecommendedManga = async (limit, offset) => {
  const response = await fetch(
    `https://kitsu.io/api/edge/manga?filter[status]=current&sort=-averageRating&page[limit]=${limit}&page[offset]=${offset}`
  );
  const { data } = await response.json();

  if (!data) return;

  return data;
};

export const getTrendingManga = async (limit, offset) => {
  const response = await fetch(
    `https://kitsu.io/api/edge/trending/manga?page[limit]=${limit}&page[offset]=${offset}`
  );
  const { data } = await response.json();

  if (!data) return;

  return data;
};

export const getPopularManga = async (limit, offset) => {
  const response = await fetch(
    `https://kitsu.io/api/edge/manga?sort=popularityRank&page[limit]=${limit}&page[offset]=${offset}`
  );
  const { data } = await response.json();

  if (!data) return;

  return data;
};

export const getMangaSearchResults = async (term, limit) => {
  const response = await fetch(
    `https://kitsu.io/api/edge/manga?filter[text]=${term}&page[limit]=${limit}`
  );
  const { data } = await response.json();

  if (!data) return;

  return data;
};

export const getUpcomingManga = async (limit, offset) => {
  const response = await fetch(
    `https://kitsu.io/api/edge/manga?filter[status]=upcoming&sort=-averageRating&page[limit]=${limit}&page[offset]=${offset}`
  );
  const { data } = await response.json();

  if (!data) return;

  return data;
};

export const getTopManga = async (limit, offset) => {
  const response = await fetch(
    `https://kitsu.io/api/edge/manga?sort=ratingRank&page[limit]=${limit}&page[offset]=${offset}`
  );
  const { data } = await response.json();

  if (!data) return;

  return data;
};

export const getMangaById = async (id) => {
  const response = await fetch(`https://kitsu.io/api/edge/manga/${id}`);
  const { data } = await response.json();

  if (!data) return;

  return data;
};
