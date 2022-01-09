import {
  getPopularManga,
  getRecommendedManga,
  getTopManga,
  getTrendingManga,
  getUpcomingManga,
} from "./api/manga.js";
import { showCards } from "./cardsUtil.js";

const showMangapage = async () => {
  const [trending, recommended, mostPopular, upcomming, topManga] =
    await Promise.all([
      getTrendingManga(5, 0),
      getRecommendedManga(5, 0),
      getPopularManga(5, 0),
      getUpcomingManga(5, 0),
      getTopManga(5, 0),
    ]);
  await showCards("Trending Now", trending);
  await showCards("Recommended", recommended, "recommended-manga");
  await showCards("Most Popular", mostPopular, "most-popular-manga");
  await showCards("Upcoming", upcomming, "upcoming-manga");
  await showCards("Top Rated", topManga, "top-manga");
};

export { showMangapage };
