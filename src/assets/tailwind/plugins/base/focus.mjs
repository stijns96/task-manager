import plugin from 'tailwindcss/plugin';

/** @type { import('tailwindcss/types/config').PluginsConfig } */
const focusBase = plugin(function ({ addBase, theme }) {
  addBase({
      /*
        Focus ring - default (with offset)
      */
      '*:focus-visible': {
        '@apply outline outline-1 outline-offset-0 outline-accent': {},
      },

      /* Fallback - for browsers that don't support :focus-visible, a fallback is set for :focus */
      '*:focus': {
        '@apply outline outline-1 outline-offset-0 outline-accent': {},
      },

      /* Negate the fallback side-effect for browsers that support :focus-visible */
      '*:focus:not(:focus-visible)': {
        '@apply shadow-none outline-0': {},
      },

      /* Dangerous for a11y - Use with care */
      '.focus-none': {
        '@apply !shadow-none !outline-0': {},
      },

      /* Hide browser cancel button */
      '*::-webkit-search-cancel-button': {
        '@apply hidden': {},
      },
  });
});

export default focusBase;
