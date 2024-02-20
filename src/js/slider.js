import Swiper from 'swiper';

class Slider extends HTMLElement {
  constructor() {
    super();
    this.swiper = null;
  }

  connectedCallback() {
    this.swiper = new Swiper(this, {
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  disconnectedCallback() {
    this.swiper.destroy();
  }

  static get observedAttributes() {
    return ['data-swiper-slide'];
  }
}
