import plugin from 'tailwindcss/plugin';

/** @type { import('tailwindcss/types/config').PluginsConfig } */
const backdropComponent = plugin(function ({ theme, addComponents }) {
  addComponents({
    '.backdrop': {
      '@apply invisible fixed inset-0 h-full w-full bg-black opacity-0 transition-all duration-300':
        {},
    },
    '.backdrop--active': {
      '@apply visible cursor-pointer opacity-50': {},
    },
  });
});

export default backdropComponent;
