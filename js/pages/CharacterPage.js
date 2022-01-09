import { getCharacterById, getCharacters } from "../api/charcters.js";
import CardsComponent from "../components/CardsComponent.js";
import CharacterInfo from "../components/CharacterInfo.js";
import AbstractView from "./AbstractView.js";

export default class CharacterPage extends AbstractView {
  constructor(params) {
    super(params);
    this.id = this.params.id;
    this.limit = 20;
    this.offset = 0;
    this.currentCard = null;
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
    const data = await await getCharacters(
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
      const data = await getCharacterById(this.id);
      if (data) {
        new CharacterInfo(data).render();
      }
    } else {
      const data = await getCharacters(this.limit, this.offset);
      if (data) {
        this.currentCard = new CardsComponent("Characters", data);
        this.currentCard.render();
        this.addLoadButton();
      }
    }
  }
}
