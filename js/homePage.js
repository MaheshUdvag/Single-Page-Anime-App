import Carousel from "./Carousel.js";
import AnimeCards from "./AnimeContainer.js";
import {
  getPopularAnime,
  getRecommendedAnime,
  getTopAnime,
  getTrendingAnime,
  getUpcomingAnime,
} from "./api/anime.js";
import { showCards } from "./cardsUtil.js";

let carouselInterval = null;

const showCarouselContent = (data) => {
  const images = [];
  data.forEach(({ id, attributes }) => {
    const {
      showType,
      titles,
      coverImage,
      averageRating,
      synopsis,
      canonicalTitle,
      posterImage,
    } = attributes;
    const image = {
      id,
      title: titles.en ? titles.en : canonicalTitle,
      image: coverImage?.original ? coverImage.original : posterImage.original,
      showType,
      rating: averageRating,
      description:
        synopsis && synopsis.length > 500
          ? synopsis.slice(0, 500) + "...."
          : synopsis,
    };
    images.push(image);
  });
  const carousel = new Carousel(images);
  document.getElementById("currentPage").appendChild(carousel.getHtml());
  document.querySelectorAll(".carousel-right").forEach((element) => {
    element.addEventListener("click", () => {
      if (document.querySelectorAll(".carousel").length != 0)
        carousel.showNext();
    });
  });

  document.querySelectorAll(".carousel-left").forEach((element) => {
    element.addEventListener("click", () => {
      if (document.querySelectorAll(".carousel").length != 0) {
        carousel.showPrev();
      }
    });
  });

  carouselInterval = setInterval(() => {
    if (document.querySelectorAll(".carousel").length != 0) {
      carousel.slideShow();
    }
  }, 5000);
};

const clearCarouselInterval = () => {
  if (carouselInterval) clearInterval(carouselInterval);
  carouselInterval = null;
};

const showHomepage = async (params) => {
  const [recommended, trending, mostPopular, upcomming, top100] =
    await Promise.all([
      getRecommendedAnime(5, 0),
      getTrendingAnime(5, 0),
      getPopularAnime(5, 0),
      getUpcomingAnime(5, 0),
      getTopAnime(5, 0),
    ]);
  showCarouselContent(recommended);
  showCards("Trending Now", trending);
  showCards("Most Popular", mostPopular, "most-popular-anime");
  showCards("Upcoming", upcomming, "upcoming-anime");
  showCards("Top Rated", top100, "top-anime");
};

export { showHomepage, clearCarouselInterval };
