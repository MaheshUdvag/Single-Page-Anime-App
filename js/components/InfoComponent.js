export default class InfoComponent {
  constructor(data) {
    this.data = {
      name: data.attributes.titles.en
        ? data.attributes.titles.en
        : data.attributes.canonicalTitle,
      description: data.attributes.description,
      coverImage: data.attributes.coverImage?.original
        ? data.attributes.coverImage.original
        : data.attributes.posterImage?.original,
      posterImage: data.attributes.posterImage.original,
      averageRating: data.attributes.averageRating,
      popularity: data.attributes.popularityRank,
      rating: data.attributes.ratingRank,
      startDate: data.attributes.startDate,
      endDate: data.attributes.endDate,
      episodeCount: data.attributes.episodeCount,
      episodeLength: data.attributes.episodeLength,
      status: data.attributes.status,
    };
  }

  onMount() {
    const seeMore = document.querySelector("#see-more");
  }

  render() {
    document.getElementById("currentPage").style["margin-top"] = "auto";
    const content = `
        <div class="info-page">
        <div class="info-cover-image">
          <img
            alt="${this.data.name}"
            src=${this.data.coverImage}
          />
        </div>
        <div class="info-container">
          <img
            alt="${this.data.name}"
            src=${this.data.posterImage}
          />
          
            <div
            class="info-details"
            >
              <h2>${this.data.name}</h2>
              ${
                this.data.description
                  ? `<p class="description">${this.data.description}</p>`
                  : ""
              }
              <div class="statistics">
                <p><strong>Average Rating:</strong>  ${
                  this.data.averageRating ? this.data.averageRating : " -"
                }</p>
                <p><strong>Start Date:</strong>  ${
                  this.data.startDate ? this.data.startDate : "-"
                }</p>
                <p><strong>End Date:</strong>  ${
                  this.data.endDate ? this.data.endDate : "-"
                }</p>
                <p><strong>Rating Rank:</strong>  ${
                  this.data.rating ? this.data.rating : "-"
                }</p>
                <p><strong>Popularity Rank:</strong>  ${
                  this.data.popularity ? this.data.popularity : "-"
                }</p>
                <p><strong>Episode Count:</strong> ${
                  this.data.episodeCount ? this.data.episodeCount : "-"
                }</p>
                <p><strong>Episode Length:</strong> ${
                  this.data.episodeLength ? this.data.episodeLength : "-"
                }</p>
                <p><strong>Status:</strong> ${
                  this.data.status ? this.data.status : "-"
                }</p>
              </div>
            </div>
          
        </div>
        
      </div>
          `;

    document
      .getElementById("currentPage")
      .appendChild(document.createRange().createContextualFragment(content));
    this.onMount();
  }
}
