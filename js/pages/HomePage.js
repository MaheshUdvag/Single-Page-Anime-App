import {
  getPopularAnime,
  getRecommendedAnime,
  getTopAnime,
  getTrendingAnime,
  getUpcomingAnime,
} from "../api/anime.js";
import CardsComponent from "../components/CardsComponent.js";
import CarouselComponent from "../components/CarouselComponent.js";
import AbstractView from "./AbstractView.js";

export default class HomePage extends AbstractView {
  constructor(params) {
    super(params);
    this.carousel = null;
  }

  onMount() {
    super.onMount();
  }

  onUnMount() {
    this.carousel.removeSlideShowEvent();
    document.getElementById("currentPage").style["margin-top"] = "120px";
    super.onUnMount();
  }

  showCarouselContent(data) {
    const carouselData = [];
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
      const cardInfo = {
        id,
        title: titles.en ? titles.en : canonicalTitle,
        image: coverImage?.original
          ? coverImage.original
          : posterImage.original,
        showType,
        rating: averageRating,
        description:
          synopsis && synopsis.length > 500
            ? synopsis.slice(0, 500) + "...."
            : synopsis,
        url: `anime?id=${id}`,
      };
      carouselData.push(cardInfo);
    });
    this.carousel = new CarouselComponent(carouselData);
    document.getElementById("currentPage").appendChild(this.carousel.render());
    this.carousel.addSlideShowEvent();
  }

  async render() {
    document.getElementById("currentPage").style["margin-top"] = "auto";
    const [recommended, trending, mostPopular, upcomming, top100] =
      await Promise.all([
        getRecommendedAnime(10, 0),
        getTrendingAnime(5, 0),
        getPopularAnime(5, 0),
        getUpcomingAnime(5, 0),
        getTopAnime(5, 0),
      ]);
    this.showCarouselContent(recommended);
    new CardsComponent("Trending Now", trending).render();
    new CardsComponent(
      "Most Popular",
      mostPopular,
      "anime?category=most-popular-anime"
    ).render();
    new CardsComponent(
      "Upcoming",
      upcomming,
      "anime?category=upcoming-anime"
    ).render();
    new CardsComponent(
      "Top Rated",
      top100,
      "anime?category=top-anime"
    ).render();
  }
}
