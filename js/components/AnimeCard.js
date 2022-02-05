export default class AnimeCard {
  constructor(title, image, url) {
    this.title = title;
    this.image = image;
    this.url = url;
  }

  getHtml() {
    return this.image && this.title
      ? `<div class="anime-card">
      <img class="image" src=${this.image} alt=${this.title}  data-link="${this.url}" />
      <div class="anime-card-content">
        <p class="anime-name">${this.title}</p>
    </div>
    </div>`
      : ``;
  }
}
