import {
  getMangaById,
  getPopularManga,
  getRecommendedManga,
  getTopManga,
  getTrendingManga,
  getUpcomingManga,
} from "../api/manga.js";
import CardsComponent from "../components/CardsComponent.js";
import InfoComponent from "../components/InfoComponent.js";
import AbstractView from "./AbstractView.js";

export default class MangaPage extends AbstractView {
  constructor(params) {
    super(params);
    this.id = this.params.id;
    this.limit = 20;
    this.offset = 0;
    this.currentCard = null;
    this.category = {
      "top-manga": {
        title: "Top Rated",
        method: getTopManga,
      },
      "upcoming-manga": {
        title: "Upcoming",
        method: getUpcomingManga,
      },
      "most-popular-manga": {
        title: "Most Popular",
        method: getPopularManga,
      },
      "recommended-manga": {
        title: "Recommended",
        method: getRecommendedManga,
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
      const cards = document.querySelector(".anime-cards");
      this.currentCard.addCards(data);
      this.offset = this.offset + this.limit;
    } else {
      document.querySelector("#load-more").remove();
    }
  }

  async render() {
    if (this.id) {
      const data = await getMangaById(this.id);
      new InfoComponent(data).render();
    } else if (this.providedCategory) {
      const data = await this.providedCategory.method(this.limit, this.offset);
      if (data) {
        this.currentCard = new CardsComponent(
          this.providedCategory.title,
          data
        );
        this.currentCard.render();
        this.addLoadButton();
      }
    } else {
      const [trending, recommended, mostPopular, upcomming, topManga] =
        await Promise.all([
          getTrendingManga(5, 0),
          getRecommendedManga(5, 0),
          getPopularManga(5, 0),
          getUpcomingManga(5, 0),
          getTopManga(5, 0),
        ]);
      new CardsComponent("Trending Now", trending).render();
      new CardsComponent(
        "Recommended",
        recommended,
        "manga?category=recommended-manga"
      ).render();
      new CardsComponent(
        "Most Popular",
        mostPopular,
        "manga?category=most-popular-manga"
      ).render();
      new CardsComponent(
        "Upcoming",
        upcomming,
        "manga?category=upcoming-manga"
      ).render();
      new CardsComponent(
        "Top Rated",
        topManga,
        "manga?category=top-manga"
      ).render();
    }
  }
}
