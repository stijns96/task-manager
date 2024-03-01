import plugin from 'tailwindcss/plugin';

/** @type { import('tailwindcss/types/config').PluginsConfig } */
const rteComponent = plugin(function ({ theme, addComponents }) {
  addComponents({
    '.rte': {
      '@apply max-w-none text-inherit': {},
      '@apply rte-headings:mb-5 rte-headings:mt-8 rte-headings:font-bold rte-headings:leading-[1.2] rte-headings:text-inherit rte-h1:text-[2rem] rte-h2:text-[1.5rem] rte-h3:text-[1.25rem] rte-h4:text-[1.25rem] rte-h5:text-[1.1rem] rte-h6:text-[1.1rem] md:rte-h1:text-[2.25rem] md:rte-h2:text-[2rem] md:rte-h3:text-[1.75rem] md:rte-h4:text-[1.5rem] md:rte-h5:text-[1.25rem] md:rte-h6:text-[1.1rem]':
        {},
      '@apply rte-p:mb-5 rte-p:mt-0 last:rte-p:mb-0': {},
      '@apply rte-a:font-body rte-a:text-inherit rte-a:underline rte-a:hover:text-inherit states:rte-a:no-underline':
        {},
      '@apply rte-blockquote:mb-5 rte-blockquote:mt-0 rte-blockquote:border-l-inherit rte-blockquote:text-inherit':
        {},
      '@apply rte-strong:text-inherit': {},
    },
  });
});

export default rteComponent;
