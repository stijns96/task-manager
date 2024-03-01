import plugin from 'tailwindcss/plugin';

import {
  heading1,
  heading2,
  heading3,
  heading4,
  heading5,
  heading6,
  headingBase,
} from '../base/elements.mjs';

/** @type { import('tailwindcss/types/config').PluginsConfig } */
const typography = plugin(function ({ theme, addComponents }) {
  addComponents({
    '.heading': headingBase,
    '.h1, .h2, .h3, .h4, .h5, .h6': {
      '@apply font-heading': {},
    },
    '.h1': heading1,
    '.h2': heading2,
    '.h3': heading3,
    '.h4': heading4,
    '.h5': heading5,
    '.h6': heading6,
  });
});

export default typography;
