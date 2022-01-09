import {
  getAiringAnimeNow,
  getPopularAnime,
  getRecommendedAnime,
  getTopAnime,
  getTrendingAnime,
  getUpcomingAnime,
} from "./api/anime.js";
import { showCards } from "./cardsUtil.js";

const showAnimepage = async () => {
  const [trending, recommended, mostPopular, airing, upcomming, topRated] =
    await Promise.all([
      getTrendingAnime(5, 0),
      getRecommendedAnime(5, 0),
      getPopularAnime(5, 0),
      getAiringAnimeNow(5, 0),
      getUpcomingAnime(5, 0),
      getTopAnime(5, 0),
    ]);
  await showCards("Trending Now", trending);
  await showCards("Recommended", recommended, "recommended-anime");
  await showCards("Most Popular", mostPopular, "most-popular-anime");
  await showCards("Airing Now", airing, "airing-anime");
  await showCards("Upcoming", upcomming, "upcoming-anime");
  await showCards("Top Rated", topRated, "top-anime");
};

export { showAnimepage };
