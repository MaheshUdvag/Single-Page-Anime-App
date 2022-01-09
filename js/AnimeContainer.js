import AnimeCard from "./AnimeCard.js";

export default class AnimeCards {
  constructor(title, cards, url) {
    this.content = `<div class="container">
    <div class="anime-card-header">
      <h2 class="anime-ranking-category">${title}</h2>
      ${
        cards.length <= 5
          ? `<button ${
              url ? `data-link=${url}` : ``
            } class="button small">View all</button>`
          : ``
      }
      </div>
      <div class="anime-cards"></div>
  </div>`;
    this.title = title;
    this.cards = cards;
  }

  getHtml() {
    let doc = document.createRange().createContextualFragment(this.content);
    const cards = doc.querySelector(".anime-cards");
    this.cards.forEach((card) => {
      const anime = new AnimeCard(card.title, card.image, card.url);
      cards.appendChild(
        document.createRange().createContextualFragment(anime.getHtml())
      );
    });

    return doc;
  }
}
