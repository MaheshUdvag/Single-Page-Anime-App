export default class AbstractView {
  constructor(params) {
    this.params = params;
  }

  onMount() {}

  onUnMount() {
    const app = document.getElementById("currentPage");
    app.replaceChildren();
  }

  async render() {
    return "";
  }
}
