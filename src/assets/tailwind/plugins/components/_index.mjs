/**
 * Layout components
 */
import siteCenterComponent from './site-center.mjs';
import siteSpacingComponent from './site-spacing.mjs';
import containerComponent from './container.mjs';
import flexibleHolderComponent from './flexible-holder.mjs';

/**
 * Text components
 */
import labelComponent from './label.mjs';
import rteComponent from './rte.mjs';
import typographyComponent from './typography.mjs';

/**
 * Element components
 */
import backdropComponent from './backdrop.mjs';
import badgeComponent from './badges.mjs';
import buttonComponent from './buttons.mjs';
import collapsibleComponent from './collapsible.mjs';
import formComponent from './form.mjs';
import iconComponent from './icons.mjs';
import listOptionsComponent from './list-options.mjs';
import optionsComponent from './options.mjs';
import policyComponent from './policy.mjs';
import priceComponent from './price.mjs';
import quantityComponent from './quantity.mjs';

/**
 * Styling of Third party components
 */
import fancyboxComponent from './fancybox.mjs';
import swiperComponent from './swiper.mjs';

/**
 * Section components
 */
import sectionFeaturedBlogGridComponent from './section-featured-blog-grid.mjs';
import sectionFeaturedBlogSliderComponent from './section-featured-blog-slider.mjs';
import sectionFeaturedCollectionGridComponent from './section-featured-collection-grid.mjs';
import sectionFeaturedCollectionSliderComponent from './section-featured-collection-slider.mjs';
import sectionMainProductComponent from './section-main-product.mjs';
import sectionProductRecommendationsComponent from './section-product-recommendations.mjs';

/*
  Add each plugin to the array in the order they
  should appear in the cascade.
*/
export default [
  siteCenterComponent,
  siteSpacingComponent,
  containerComponent,
  flexibleHolderComponent,
  labelComponent,
  rteComponent,
  typographyComponent,
  backdropComponent,
  badgeComponent,
  buttonComponent,
  collapsibleComponent,
  formComponent,
  iconComponent,
  listOptionsComponent,
  optionsComponent,
  policyComponent,
  priceComponent,
  quantityComponent,
  fancyboxComponent,
  swiperComponent,
  sectionFeaturedBlogGridComponent,
  sectionFeaturedBlogSliderComponent,
  sectionFeaturedCollectionGridComponent,
  sectionFeaturedCollectionSliderComponent,
  sectionMainProductComponent,
  sectionProductRecommendationsComponent,
];
