/**
 * Example web component
  <swiper-container>
    <swiper-slide>Slide 1</swiper-slide>
    <swiper-slide>Slide 2</swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>
  </swiper-container>
  <script src="{{ 'swiper-slider-web-component.js' | asset_url }}" type="module"></script>
 */

// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';

// register Swiper custom elements
register();
