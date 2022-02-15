import SearchBar from "./components/SearchBar.js";
import routes from "./routes.js";

export default class App {
  constructor() {
    this.currentPage = null;
    this.searchBar = null;
  }

  renderSearchBar() {
    this.searchBar = new SearchBar();
    this.searchBar.render();
    this.searchBar.setType("Anime");
  }

  getParams(page) {
    let queryParams = page.slice(page.indexOf("?") + 1, page.length);
    let params = {};
    if (queryParams.includes("&")) {
      let paramList = queryParams.split("&");
      for (let param in paramList) {
        let keyValue = paramList[param].split("=");
        params[keyValue[0]] = decodeURI(keyValue[1]);
      }
    } else {
      let keyValue = queryParams.split("=");
      params[keyValue[0]] = decodeURI(keyValue[1]);
    }
    return params;
  }

  navigate(page) {
    if (!page) page = "home";
    page = page.replace("#", "");
    let params = {};
    let paramString = "";
    if (page.includes("?")) {
      paramString = page.slice(page.indexOf("?"), page.length);
      params = this.getParams(page);
      page = page.slice(0, page.indexOf("?"));
    }
    if (this.currentPage) this.currentPage.onUnMount();

    if (page === "home") {
      document.getElementById("currentPage").style["margin-top"] = "auto";
    } else {
      document.getElementById("currentPage").style["margin-top"] = "120px";
    }
    this.searchBar.hideSearchSuggestions();
    this.searchBar.clearTerm();
    window.scrollTo(0, 0);
    if (routes[page] !== undefined) {
      this.currentPage = new routes[page].component(params);
      this.currentPage.render();
      history.pushState({}, page + paramString, `#${page + paramString}`);
    } else {
      this.currentPage = new routes["home"].component(params);
      this.currentPage.render();
      history.pushState({}, "home", `#home`);
    }
  }

  render() {
    this.renderSearchBar();
    this.navigate(location.hash);

    window.addEventListener("popstate", () => this.navigate(location.hash));

    document.body.addEventListener("click", (e) => {
      if (e.target.matches("[data-link]")) {
        e.preventDefault();
        this.navigate(e.target.getAttribute("data-link"));
      }
      if (
        document.querySelector(".nav").classList.contains("responsive") &&
        e.target.id !== "responsive-menu"
      ) {
        document.querySelector(".nav").classList.remove("responsive");
      }
    });

    document.querySelector("#responsive-menu").addEventListener("click", () => {
      if (document.querySelector(".nav").classList.contains("responsive")) {
        document.querySelector(".nav").classList.remove("responsive");
      } else {
        document.querySelector(".nav").classList.add("responsive");
      }
    });
  }
}
