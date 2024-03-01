import plugin from 'tailwindcss/plugin';

/** @type { import('tailwindcss/types/config').PluginsConfig } */
const colorScheme = plugin(function ({ addUtilities, theme }) {
  addUtilities({
    '.color-scheme': {
      '@apply bg-[--color-scheme-background-color] text-[--color-scheme-text]': {},

      '--swiper-theme-color': 'var(--color-scheme-text)',
      '--text-color-link': 'var(--color-scheme-text)',
      '--text-color-link-states': 'var(--color-scheme-text)',

      '&--black': {
        '--color-scheme-background-color': 'theme(colors.black)',
        '--color-scheme-text': 'theme(colors.white)',
      },
      '&--white': {
        '--color-scheme-background-color': 'theme(colors.white)',
        '--color-scheme-text': 'theme(colors.black)',
      },
      '&--primary': {
        '--color-scheme-background-color': 'theme(colors.primary.DEFAULT)',
        '--color-scheme-text': 'theme(colors.primary.text)',
      },
      '&--secondary': {
        '--color-scheme-background-color': 'theme(colors.secondary.DEFAULT)',
        '--color-scheme-text': 'theme(colors.secondary.text)',
      },
      '&--accent': {
        '--color-scheme-background-color': 'theme(colors.accent.DEFAULT)',
        '--color-scheme-text': 'theme(colors.accent.text)',
      },
      '&--gray': {
        '--color-scheme-background-color': 'theme(colors.gray.200)',
        '--color-scheme-text': 'theme(colors.black)',
      },

      '&-text': {
        '@apply text-[--color-scheme-text]': {},
      },
      '&-bg': {
        '@apply bg-[--color-scheme-background-color]': {},
      },
    },
  });
});

export default colorScheme;
