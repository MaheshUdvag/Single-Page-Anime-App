import { getAnimeSearchResults } from "../api/anime.js";
import { getCharacterSearchResults } from "../api/charcters.js";
import { getMangaSearchResults } from "../api/manga.js";
import CardsComponent from "../components/CardsComponent.js";
import AbstractView from "./AbstractView.js";

export default class SearchResultsPage extends AbstractView {
  constructor(params) {
    super(params);
    this.term = this.params.term;
    this.type = this.params.type;
  }

  async render() {
    let data;
    if (this.type === "Character") {
      data = await getCharacterSearchResults(this.term, 20);
    } else if (this.type === "Manga") {
      data = await getMangaSearchResults(this.term, 20);
    } else {
      data = await getAnimeSearchResults(this.term, 20);
    }

    new CardsComponent(`Search Results for "${this.term}"`, data).render();
  }
}
