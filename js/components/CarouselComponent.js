export default class CarouselComponent {
  constructor(data) {
    this.content = `<div class="carousel">
        <div class="carousel-icon carousel-left"></div>
            <ul class="carousel-images">
            </ul>
        <div class="carousel-icon carousel-right"></div>
      </div>`;
    this.data = data;
    this.hasNext = true;
    this.hasPrev = false;
    this.carouselInterval = null;
  }

  addSlideShowEvent() {
    document.querySelectorAll(".carousel-right").forEach((element) => {
      element.addEventListener("click", () => {
        this.showNext();
      });
    });

    document.querySelectorAll(".carousel-left").forEach((element) => {
      element.addEventListener("click", () => {
        this.showPrev();
      });
    });

    this.carouselInterval = setInterval(() => {
      this.slideShow();
    }, 5000);
  }

  removeSlideShowEvent() {
    document.querySelectorAll(".carousel-right").forEach((element) => {
      element.removeEventListener("click", this.showNext);
    });

    document.querySelectorAll(".carousel-left").forEach((element) => {
      element.removeEventListener("click", this.showPrev);
    });

    clearInterval(this.carouselInterval);
  }

  render() {
    let carousel = document
      .createRange()
      .createContextualFragment(this.content);
    const ul = carousel.querySelector(".carousel-images");
    this.data.forEach((anime, index) => {
      const carouselImg = `<li class="carousel-image" style="left: ${
        index * 100
      }%">
      <img src=${anime.image} alt=${anime.title}/>
      <div class="carousel-image-content">
      <h4># Recommendation ${index + 1}</h4>
      <h2 class="carousel-anime-title">${anime.title}</h2>
      <div class="carousel-description">${anime.description}</div>
      <div class="carousel-anime-stats">
        <p class="anime-type">${anime.showType}</p>
        <p class="rating">${anime.rating}</p>
      </div>
      <button class="button" data-link=${anime.url}>Detail</button>
      </div>
      </li>`;
      ul.appendChild(
        document.createRange().createContextualFragment(carouselImg)
      );
    });
    return carousel.querySelector(".carousel");
  }

  showNext() {
    let imageElements = document.querySelectorAll(".carousel-image");
    if (this.hasNext) {
      let isLastImage = true;
      imageElements.forEach((item) => {
        const position = item.style.left.replace("%", "");
        if (position > 100) {
          isLastImage = false;
        }
        item.style.left = `${position - 100}%`;
      });

      if (isLastImage) {
        document.querySelector(".carousel-right").style.display = "none";
        this.hasNext = false;
      } else {
        if (!this.hasPrev)
          document.querySelector(".carousel-left").style.display = "block";
        this.hasPrev = true;
      }
    }
  }

  showPrev() {
    let imageElements = document.querySelectorAll(".carousel-image");
    if (this.hasPrev) {
      let isLastImage = true;
      imageElements.forEach((item) => {
        const position = parseInt(item.style.left.replace("%", ""));
        if (position < -100) {
          isLastImage = false;
        }
        item.style.left = `${position + 100}%`;
      });
      if (isLastImage) {
        document.querySelector(".carousel-left").style.display = "none";
        this.hasPrev = false;
      } else {
        if (!this.hasNext)
          document.querySelector(".carousel-right").style.display = "block";
        this.hasNext = true;
      }
    }
  }

  slideShow() {
    if (this.hasNext) {
      this.showNext();
    } else {
      let imageElements = document.querySelectorAll(".carousel-image");
      imageElements.forEach((item, index) => {
        item.style.left = `${index * 100}%`;
      });
      this.hasPrev = false;
      this.hasNext = true;
      document.querySelector(".carousel-right").style.display = "block";
      document.querySelector(".carousel-left").style.display = "none";
    }
  }
}
