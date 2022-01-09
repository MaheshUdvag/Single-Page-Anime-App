import { getAnimeSearchResults } from "../api/anime.js";
import { getCharacterSearchResults } from "../api/charcters.js";
import { getMangaSearchResults } from "../api/manga.js";

export default class SearchBar {
  constructor() {
    this.term = "";
    this.type = "";
    this.timer = 0;
  }

  setType(type) {
    this.type = type;
  }

  clearTerm() {
    this.term = "";
    document.querySelector(".search-input").value = "";
  }

  addSearchSuggestions(terms) {
    const suggestions = document.querySelector(".search-suggestions");
    for (let x in terms) {
      const suggestion = document.createElement("p");
      suggestion.classList.add("search-term");
      suggestion.dataset.link = terms[x].url;
      const term = document
        .createRange()
        .createContextualFragment(
          `<i class="fa fa-search search-icon" aria-hidden="true"></i>${terms[x].text}`
        );
      suggestion.appendChild(term);
      suggestions.appendChild(suggestion);
    }

    document.querySelector(".search-suggestions").style.display = "block";

    document.querySelectorAll(".search-term").forEach((element) => {
      element.addEventListener("click", () => {
        this.hideSearchSuggestions();
      });
    });
  }

  hideSearchSuggestions() {
    document.querySelector(".search-suggestions").style.display = "none";
    document.querySelector(".search-suggestions").replaceChildren();
  }

  async fetchSearchResults() {
    let terms = [];
    if (this.type === "Character") {
      let data = await getCharacterSearchResults(this.term, 4);
      data.forEach(({ id, attributes }) => {
        const { names, canonicalName } = attributes;
        const text = names?.en ? names.en : canonicalName;
        const url = `characters?id=${id}`;
        terms.push({ text, url });
      });
    } else if (this.type === "Manga") {
      let data = await getMangaSearchResults(this.term, 4);
      data.forEach(({ id, attributes }) => {
        const { titles, canonicalTitle } = attributes;
        const text = titles?.en ? titles.en : canonicalTitle;
        const url = `manga?id=${id}`;
        terms.push({ text, url });
      });
    } else {
      let data = await getAnimeSearchResults(this.term, 4);
      data.forEach(({ id, attributes }) => {
        const { titles, canonicalTitle } = attributes;
        const text = titles?.en ? titles.en : canonicalTitle;
        const url = `anime?id=${id}`;
        terms.push({ text, url });
      });
    }
    if (terms.length > 0) {
      document.querySelector(
        "#search-term"
      ).dataset.link = `search?term=${this.term}&type=${this.type}`;
      this.addSearchSuggestions(terms);
    }
  }

  deBounce() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.hideSearchSuggestions();
      this.fetchSearchResults();
    }, 300);
  }

  render() {
    const searchBar = document.createRange().createContextualFragment(`
        <div class="search-bar">
            <select class="search-filter">
                <option value="Anime">Anime</option>
                <option value="Manga">Manga</option>
                <option value="Character">Character</option>
            </select>
            <input class="search-input" type="text" placeholder="Search Anime,Manga,Characters.." />
            <i class="fa fa-search search-icon" id="search-term" aria-hidden="true"></i>
        </div>
        <div class="search-suggestions">
            
        </div>
      `);

    document.querySelector("#search-component").appendChild(searchBar);

    document.querySelector(".search-filter").addEventListener("change", (e) => {
      this.type = e.target.value;
    });

    document.querySelector(".search-input").addEventListener("keyup", (e) => {
      this.term = e.target.value;

      if (e.keyCode === 13) {
        document.querySelector("#search-term").click();
      }

      if (this.term.length > 0 && !e.ctrlKey) {
        this.deBounce();
      }
      if (this.term.length === 0) this.hideSearchSuggestions();
    });
  }
}
