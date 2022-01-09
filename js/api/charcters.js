export const getCharacters = async (limit, offset) => {
  const response = await fetch(
    `https://kitsu.io/api/edge/characters?page[limit]=${limit}&page[offset]=${offset}`
  );
  const { data } = await response.json();

  if (!data) return;

  return data;
};

export const getCharacterSearchResults = async (term, limit) => {
  const response = await fetch(
    `https://kitsu.io/api/edge/characters?filter[name]=${term}&page[limit]=${limit}`
  );
  const { data } = await response.json();

  if (!data) return;

  return data;
};

export const getCharacterById = async (id) => {
  const response = await fetch(`https://kitsu.io/api/edge/characters/${id}`);
  const { data } = await response.json();

  if (!data) return;

  return data;
};
