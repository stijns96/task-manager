import accessibilityBase from './accessibility.mjs';
import elementsBase from './elements.mjs';
import focusBase from './focus.mjs';
import imagesBase from './images.mjs';
import layoutBase from './layout.mjs';
import rootVariables from './root-variables.mjs';
import shopifyBase from './shopify.mjs';

/*
  Add each plugin to the array in the order they
  should appear in the cascade.
*/
export default [
  accessibilityBase,
  elementsBase,
  focusBase,
  imagesBase,
  layoutBase,
  rootVariables,
  shopifyBase,
];
