import Swiper from "swiper";
import { A11y, Navigation } from "swiper/modules";

class ProductCard extends HTMLElement {
  constructor() {
    super();
    this.init();
  }

  init() {
    this.createSwiper();
    this.handleSwiperButtons();
    window.addEventListener("resize", () => {
      this.handleSwiperButtons();
    });
  }

  createSwiper() {
    this.swiperElement = this.querySelector("[data-product-card-swiper]");

    this.swiperOptions = {
      modules: [A11y, Navigation],
      watchOverflow: true,
      preventClicks: true,
      loop: false,
      autoplay: false,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      slidesPerView: 1,
      direction: "horizontal",
      breakpoints: {
        768: { allowTouchMove: false },
      },
    };

    // Check if we have extra options on the HTML
    if (this && this.dataset && this.dataset.options) {
      const jsonOptions = JSON.parse(this.dataset.options);
      if (jsonOptions) {
        this.swiperOptions = {
          ...this.swiperOptions,
          ...jsonOptions,
        };
      }
    }

    this.swiperInstance = new Swiper(this.swiperElement, this.swiperOptions);
  }

  handleSwiperButtons() {
    let windowWidth = window.innerWidth;
    if (windowWidth < 768) {
      this.querySelectorAll("button").forEach((button) =>
        button.classList.remove("hidden")
      );
    } else if (this.swiperInstance) {
      this.querySelectorAll("button").forEach((button) =>
        button.classList.add("hidden")
      );
    }
  }
}

if (!customElements.get("product-card-swiper")) {
  window.ProductCard = ProductCard;

  customElements.define("product-card-swiper", ProductCard);
}
