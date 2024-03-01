import plugin from 'tailwindcss/plugin';

/** @type { import('tailwindcss/types/config').PluginsConfig } */
const gapUtility = plugin(function ({ addUtilities }) {
  addUtilities({
    '.gap-base': {
      gap: 'var(--gap-y) var(--gap-x)',
    },
    '.gap-x-base': {
      columnGap: 'var(--gap-x)',
    },
    '.gap-y-base': {
      rowGap: 'var(--gap-y)',
    },
  });
});

export default gapUtility;
