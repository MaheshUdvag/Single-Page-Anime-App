import AnimeCard from "../AnimeCard.js";
import AnimeCards from "../AnimeContainer.js";

export default class CardsComponent {
  constructor(title, data, url) {
    this.title = title;
    this.data = data;
    this.url = url;
  }

  getCardInfo(id, attributes, type) {
    const { names, name, image, titles, canonicalTitle, posterImage } =
      attributes;
    let title = titles && titles.en ? titles.en : canonicalTitle;
    if (!title) title = names && names.en ? names.en : name;
    let img = posterImage && posterImage.small && posterImage.small;
    if (!img) img = image && image.original;
    let url;
    if (type === "anime") {
      url = `anime?id=${id}`;
    } else if (type === "manga") {
      url = `manga?id=${id}`;
    } else {
      url = `characters?id=${id}`;
    }
    return { title, image: img, url };
  }

  addCards(data) {
    const cards = document.querySelector(".anime-cards");
    let characters = ``;
    data.forEach(({ id, attributes, type }) => {
      const { title, image, url } = this.getCardInfo(id, attributes, type);
      const anime = new AnimeCard(title, image, url);
      characters += anime.getHtml();
    });
    cards.appendChild(
      document.createRange().createContextualFragment(characters)
    );
  }

  render() {
    const cards = [];
    if (this.data.length > 0) {
      this.data.forEach(({ id, attributes, type }) => {
        const card = this.getCardInfo(id, attributes, type);
        cards.push(card);
      });

      const characters = new AnimeCards(this.title, cards, this.url);
      document.getElementById("currentPage").appendChild(characters.getHtml());
    }
  }
}
