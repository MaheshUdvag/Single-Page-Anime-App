import SearchBar from "./components/SearchBar.js";
import AnimePage from "./pages/AnimePage.js";
import CharacterPage from "./pages/CharacterPage.js";
import HomePage from "./pages/HomePage.js";
import MangaPage from "./pages/MangaPage.js";
import SearchResultsPage from "./pages/SearchResultsPage.js";

let currentPage;
let searchBar;

const routes = {
  home: {
    path: "home",
    component: HomePage,
  },
  anime: {
    path: "anime",
    component: AnimePage,
  },
  manga: {
    path: "manga",
    component: MangaPage,
  },
  characters: {
    path: "characters",
    component: CharacterPage,
  },
  search: {
    path: "search",
    component: SearchResultsPage,
  },
};

const renderSearchBar = () => {
  searchBar = new SearchBar();
  searchBar.render();
  searchBar.setType("Anime");
};

const getParams = (page) => {
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
};

const navigate = async (page) => {
  if (!page) page = "home";
  page = page.replace("#", "");
  let params = {};
  let paramString = "";
  if (page.includes("?")) {
    paramString = page.slice(page.indexOf("?"), page.length);
    params = getParams(page);
    page = page.slice(0, page.indexOf("?"));
  }
  if (currentPage) currentPage.onUnMount();

  if (page === "home") {
    document.getElementById("currentPage").style["margin-top"] = "auto";
  } else {
    document.getElementById("currentPage").style["margin-top"] = "120px";
  }
  searchBar.hideSearchSuggestions();
  searchBar.clearTerm();
  window.scrollTo(0, 0);
  if (routes[page] !== undefined) {
    currentPage = new routes[page].component(params);
    currentPage.render();
    history.pushState({}, page + paramString, `#${page + paramString}`);
  } else {
    currentPage = new routes["home"].component(params);
    currentPage.render();
    history.pushState({}, "home", `#home`);
  }
};

renderSearchBar();

navigate(location.hash);

window.addEventListener("popstate", () => navigate(location.hash));

document.body.addEventListener("click", function (e) {
  if (e.target.matches("[data-link]")) {
    e.preventDefault();
    navigate(e.target.getAttribute("data-link"));
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

// const a = document
//   .createRange()
//   .createContextualFragment(new InfoComponent(11).render());
// document.getElementById("currentPage").appendChild(a);
