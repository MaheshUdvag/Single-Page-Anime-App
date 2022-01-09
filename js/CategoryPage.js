import { getCharacters } from "./api/charcters.js";
import AnimeCard from "./AnimeCard.js";
import {
  getAiringAnimeNow,
  getPopularAnime,
  getRecommendedAnime,
  getTopAnime,
  getUpcomingAnime,
} from "./api/anime.js";
import { getTitleAndImage, showCards } from "./cardsUtil.js";
import {
  getPopularManga,
  getRecommendedManga,
  getTopManga,
  getUpcomingManga,
} from "./api/manga.js";

let offset = 0;
let limit = 20;
let fetchMethod;

const addLoadButton = () => {
  const button = document.createElement("button");
  button.addEventListener("click", loadMoreData);
  button.className = "button";
  button.id = "load-more";
  button.innerHTML = "Load More";
  document.querySelector(".container").appendChild(button);
};

export const showCaractersPage = async () => {
  fetchMethod = getCharacters;
  const data = await fetchMethod(limit, offset);
  showCards("Characters", data);
  addLoadButton();
};

export const showTopAnimePage = async () => {
  fetchMethod = getTopAnime;
  const data = await fetchMethod(limit, offset);
  showCards("Top Rated", data);
  addLoadButton();
};

export const showUpcomingAnimePage = async () => {
  fetchMethod = getUpcomingAnime;
  const data = await fetchMethod(limit, offset);
  showCards("Upcoming", data);
  addLoadButton();
};

export const showAiringAnimePage = async () => {
  fetchMethod = getAiringAnimeNow;
  const data = await fetchMethod(limit, offset);
  showCards("Airing Now", data);
  addLoadButton();
};

export const showMostPopularAnimePage = async () => {
  fetchMethod = getPopularAnime;
  const data = await fetchMethod(limit, offset);
  showCards("Most Popular", data);
  addLoadButton();
};

export const showRecommendedAnimePage = async () => {
  fetchMethod = getRecommendedAnime;
  const data = await fetchMethod(limit, offset);
  showCards("Recommended", data);
  addLoadButton();
};

export const showRecommendedMangePage = async () => {
  fetchMethod = getRecommendedManga;
  const data = await fetchMethod(limit, offset);
  showCards("Recommended", data);
  addLoadButton();
};

export const showMostPopularMangePage = async () => {
  fetchMethod = getPopularManga;
  const data = await fetchMethod(limit, offset);
  showCards("Most Popular", data);
  addLoadButton();
};
export const showUpcomingMangePage = async () => {
  fetchMethod = getUpcomingManga;
  const data = await fetchMethod(limit, offset);
  showCards("Upcoming", data);
  addLoadButton();
};

export const showTopMangaPage = async () => {
  fetchMethod = getTopManga;
  const data = await fetchMethod(limit, offset);
  showCards("Top Rated", data);
  addLoadButton();
};

const loadMoreData = async () => {
  const data = await fetchMethod(limit, offset + limit);
  if (data.length > 0) {
    const cards = document.querySelector(".anime-cards");
    let characters = ``;
    data.forEach(({ attributes }) => {
      const { title, image } = getTitleAndImage(attributes);
      const anime = new AnimeCard(title, image);
      characters += anime.getHtml();
    });
    cards.appendChild(
      document.createRange().createContextualFragment(characters)
    );
    offset = offset + limit;
  } else {
    document.querySelector("#load-more").remove();
  }
};
