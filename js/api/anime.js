export const getRecommendedAnime = async (limit, offset) => {
  const response = await fetch(
    `https://kitsu.io/api/edge/anime?filter[status]=current&sort=-averageRating&page[limit]=${limit}&page[offset]=${offset}&filter[subtype]=TV`
  );
  const { data } = await response.json();
  let animeList = [];
  if (data) {
    for (let anime of data) {
      if (
        anime?.attributes?.ageRating !== "R" &&
        anime?.attributes?.ageRating !== "R18"
      )
        animeList.push(anime);
    }
  }

  if (!animeList) {
    animeList = await getTrendingAnime(10, 0);
  }

  return animeList;
};

export const getAnimeSearchResults = async (term, limit) => {
  const response = await fetch(
    `https://kitsu.io/api/edge/anime?filter[text]=${term}&page[limit]=${limit}`
  );
  const { data } = await response.json();

  if (!data) return;

  return data;
};

export const getTrendingAnime = async (limit, offset) => {
  const response = await fetch(
    `https://kitsu.io/api/edge/trending/anime?page[limit]=${limit}&page[offset]=${offset}`
  );
  const { data } = await response.json();

  if (!data) return;

  return data;
};

export const getPopularAnime = async (limit, offset) => {
  const response = await fetch(
    `https://kitsu.io/api/edge/anime?sort=popularityRank&page[limit]=${limit}&page[offset]=${offset}`
  );
  const { data } = await response.json();

  if (!data) return;

  return data;
};

export const getUpcomingAnime = async (limit, offset) => {
  const response = await fetch(
    `https://kitsu.io/api/edge/anime?filter[status]=upcoming&sort=-averageRating&page[limit]=${limit}&page[offset]=${offset}`
  );
  const { data } = await response.json();

  if (!data) return;

  return data;
};

export const getTopAnime = async (limit, offset) => {
  const response = await fetch(
    `https://kitsu.io/api/edge/anime?sort=-averageRating&page[limit]=${limit}&page[offset]=${offset}`
  );
  const { data } = await response.json();

  if (!data) return;

  return data;
};

export const getAiringAnimeNow = async (limit, offset) => {
  const response = await fetch(
    `https://kitsu.io/api/edge/anime?sort=popularityRank&filter[status]=current&page[limit]=${limit}&page[offset]=${offset}`
  );
  const { data } = await response.json();

  if (!data) return;

  return data;
};

export const getAnimeById = async (id) => {
  const response = await fetch(`https://kitsu.io/api/edge/anime/${id}`);
  const { data } = await response.json();

  if (!data) return;

  return data;
};
