export default class CharacterInfo {
  constructor(data) {
    this.data = {
      name: data.attributes.names.en
        ? data.attributes.names.en
        : data.attributes.canonicalName,
      description: data.attributes.description,
      image: data.attributes.image.original,
    };
  }

  render() {
    const content = `
          <div class="info-page">
          <div class="info-container">
            <img
              alt="${this.data.name}"
              src=${this.data.image}
            />
              <div
              class="info-details"
              >
                <h2>${this.data.name}</h2>
                <p class="description">
                ${this.data.description}
                </p>
              </div>
          </div>
        </div>
            `;

    document
      .getElementById("currentPage")
      .appendChild(document.createRange().createContextualFragment(content));
  }
}
