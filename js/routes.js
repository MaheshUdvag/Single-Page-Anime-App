import AnimePage from "./pages/AnimePage.js";
import CharacterPage from "./pages/CharacterPage.js";
import HomePage from "./pages/HomePage.js";
import MangaPage from "./pages/MangaPage.js";
import SearchResultsPage from "./pages/SearchResultsPage.js";

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

export default routes;
