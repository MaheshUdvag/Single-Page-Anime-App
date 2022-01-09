import {
  getAiringAnimeNow,
  getPopularAnime,
  getRecommendedAnime,
  getTopAnime,
  getTrendingAnime,
  getUpcomingAnime,
  getAnimeById,
} from "../api/anime.js";
import CardsComponent from "../components/CardsComponent.js";
import InfoComponent from "../components/InfoComponent.js";
import AbstractView from "./AbstractView.js";

export default class AnimePage extends AbstractView {
  constructor(params) {
    super(params);
    this.id = this.params.id;
    this.limit = 20;
    this.offset = 0;
    this.currentCard = null;
    this.category = {
      "top-anime": {
        title: "Top Rated",
        method: getTopAnime,
      },
      "upcoming-anime": {
        title: "Upcoming",
        method: getUpcomingAnime,
      },
      "airing-anime": {
        title: "Airing Now",
        method: getAiringAnimeNow,
      },
      "most-popular-anime": {
        title: "Most Popular",
        method: getPopularAnime,
      },
      "recommended-anime": {
        title: "Recommended",
        method: getRecommendedAnime,
      },
    };
    this.providedCategory = this.category[this.params?.category];
  }

  onMount() {
    super.onMount();
  }

  addLoadButton() {
    const button = document.createElement("button");
    button.addEventListener("click", () => {
      this.loadMoreData();
    });
    button.className = "button";
    button.id = "load-more";
    button.innerHTML = "Load More";
    document.querySelector(".container").appendChild(button);
  }

  async loadMoreData() {
    const data = await this.providedCategory.method(
      this.limit,
      this.offset + this.limit
    );
    if (data.length > 0) {
      this.currentCard.addCards(data);
      this.offset = this.offset + this.limit;
    } else {
      document.querySelector("#load-more").remove();
    }
  }

  async render() {
    if (this.id) {
      const data = await getAnimeById(this.id);
      new InfoComponent(data).render();
    } else if (this.providedCategory) {
      const data = await this.providedCategory.method(this.limit, this.offset);
      this.currentCard = new CardsComponent(this.providedCategory.title, data);
      this.currentCard.render();
      this.addLoadButton();
    } else {
      const [trending, recommended, mostPopular, airing, upcomming, topRated] =
        await Promise.all([
          getTrendingAnime(5, 0),
          getRecommendedAnime(5, 0),
          getPopularAnime(5, 0),
          getAiringAnimeNow(5, 0),
          getUpcomingAnime(5, 0),
          getTopAnime(5, 0),
        ]);
      new CardsComponent("Trending Now", trending);
      new CardsComponent(
        "Recommended",
        recommended,
        "anime?category=recommended-anime"
      ).render();
      new CardsComponent(
        "Most Popular",
        mostPopular,
        "anime?category=most-popular-anime"
      ).render();
      new CardsComponent(
        "Airing Now",
        airing,
        "anime?category=airing-anime"
      ).render();
      new CardsComponent(
        "Upcoming",
        upcomming,
        "anime?category=upcoming-anime"
      ).render();
      new CardsComponent(
        "Top Rated",
        topRated,
        "anime?category=top-anime"
      ).render();
    }
  }
}
