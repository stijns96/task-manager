
/**
 * Variants for the various interactive states.
 * 'states', 'states-enabled', 'hocus-enabled', etc.
 */

import plugin from 'tailwindcss/plugin';

/** @type { import('tailwindcss/types/config').PluginsConfig } */
const featureDetectionVariant = plugin(function ({ addVariant }) {
  /**
   * These variants are dependent on feature detection.
   * See file theme/snippets/html-head-js.liquid for implementation details.
   */
  addVariant('js', ['.js &']);
  addVariant('no-js', ['.no-js &']);
  addVariant('touch', ['.touch &']);
  addVariant('no-touch', ['.no-touch &']);
});

export default featureDetectionVariant;
