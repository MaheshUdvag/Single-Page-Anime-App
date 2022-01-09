import AnimeCards from "./AnimeContainer.js";

export const showCards = (title, data, url) => {
  const cards = [];
  if (data.length > 0) {
    data.forEach(({ attributes }) => {
      const { title, image } = getTitleAndImage(attributes);
      const card = {
        title,
        image,
      };
      cards.push(card);
    });

    const characters = new AnimeCards(title, cards, url);
    document.getElementById("currentPage").appendChild(characters.getHtml());
  }
};

export const getTitleAndImage = (attributes) => {
  const { names, name, image, titles, canonicalTitle, posterImage } =
    attributes;
  let title = titles && titles.en ? titles.en : canonicalTitle;
  if (!title) title = names && names.en ? names.en : name;
  let img = posterImage && posterImage.small && posterImage.small;
  if (!img) img = image && image.original;

  return { title, image: img };
};
