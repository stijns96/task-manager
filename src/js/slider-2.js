import Swiper from "swiper";

class Slider extends HTMLElement {
  constructor() {
    super();
    this.swiper = null;
  }

  connectedCallback() {
    this.swiper = new Swiper(this, {
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      slidesPerView: 1,
    });
  }

  disconnectedCallback() {
    this.swiper.destroy();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "slides-per-view") {
      this.swiper.params.slidesPerView = newValue;
      this.swiper.update();
    }
  }

  static get observedAttributes() {
    return ["slides-per-view"];
  }
}
