import plugin from 'tailwindcss/plugin';

export const headingBase = {
  '@apply font-heading font-bold leading-tight last:mb-0': {},
};
export const heading1 = {
  '@apply text-[2.5rem] md:text-[4rem]': {},
};
export const heading2 = {
  '@apply text-[2.25rem] md:text-[3rem]': {},
};
export const heading3 = {
  '@apply text-[1.75rem] md:text-[2.5rem]': {},
};
export const heading4 = {
  '@apply text-[1.75rem]': {},
};
export const heading5 = {
  '@apply text-[1.5rem]': {},
};
export const heading6 = {
  '@apply text-[1.25rem]': {},
};

/** @type { import('tailwindcss/types/config').PluginsConfig } */
const elementsBase = plugin(function ({ addBase, theme }) {
  addBase({
    html: {
      '@apply m-0 font-body leading-normal text-color-default bg-color-default': {},
    },

    body: {
      '@apply m-0 flex min-h-screen flex-col font-body text-base not-italic leading-normal bg-color-default text-color-default':
        {},
    },

    'h1, h2, h3, h4, h5, h6': headingBase,
    h1: heading1,
    h2: heading2,
    h3: heading3,
    h4: heading4,
    h5: heading5,
    h6: heading6,

    a: {
      '@apply text-color-link no-underline states:text-color-link-states states:underline': {},
    },
    hr: {
      '@apply my-16 block h-px border-0 bg-[--border-color-default]': {},
    },
    table: {
      'word-break': 'break-word',
    },
  });
});

export default elementsBase;
