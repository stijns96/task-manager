import plugin from 'tailwindcss/plugin';

/** @type { import('tailwindcss/types/config').PluginsConfig } */
const fancyboxComponent = plugin(function ({ theme, addComponents }) {
  addComponents({
    '.fancybox__container.image-zoom': {
      '@apply text-inherit': {},

      '.fancybox__backdrop': {
        '@apply bg-white': {},
      },
      '.fancybox__content': {
        '@apply static': {},
      },
      '.fancybox__toolbar': {
        '@apply bg-transparent text-inherit': {},

        '&__items': {
          '.fancybox__button--thumbs, .fancybox__button--zoom, .fancybox__button--slideshow, .fancybox__button--fullscreen': {
            '@apply hidden': {},
          }
        }
      },
      '.fancybox__counter, .fancybox__thumbs': {
        '@apply hidden': {},
      },
      '.carousel__button': {
        '@apply shadow-none': {},
        'svg': {
          '@apply filter-none': {},
        }
      },
      '.carousel__button.is-close, .fancybox__button--close': {
        '@apply fixed right-4 top-4 h-12 w-12 rounded-full border border-gray-200 bg-gray-200 shadow-none transition-all': {},
        'svg': {
          '@apply h-4 w-4 text-inherit filter-none transition-all': {},
        },
        '&:hover': {
          '@apply border border-gray-700 bg-gray-700 text-white': {},
          'svg': {
            '@apply scale-125': {},
          }
        }
      },
      '.fancybox__carousel': {
        '.fancybox__slide': {
          '@apply p-0': {},
          '&.has-image': {
            '@apply relative bg-white': {},
            '.fancybox__content': {
              '@apply static': {},
            }
          },
          '&.can-zoom_in': {
            '.fancybox__content': {
              cursor: 'url("./zoom-in.svg") 20 20, zoom-in',
              'img': {
                cursor: 'url("./zoom-in.svg") 20 20, zoom-in',
              }
            }
          },
          '&.is-draggable': {
            '@apply p-0': {},
            '.fancybox__content': {
              cursor: 'url("./zoom-out.svg") 20 20, zoom-out',
              'img': {
                cursor: 'url("./zoom-out.svg") 20 20, zoom-out',
              }
            }
          }
        }
      },
      '.fancybox__nav': {
        '@apply fixed top-2/4 w-full': {},
        '.carousel__button.is-next, .carousel__button.is-prev': {
          '@apply bottom-0 top-0 h-12 w-12 rounded-full border border-gray-200 bg-gray-200 shadow-none transition-all': {},
          'svg': {
            '@apply h-4 w-4 text-inherit filter-none transition-all': {},
          },
          '&:hover': {
            '@apply border border-gray-700 bg-gray-700 text-white': {},
            'svg': {
              '@apply scale-125': {},
            }
          }
        },
        '.carousel__button.is-next': {
          '@apply right-4': {},
        },
        '.carousel__button.is-prev': {
          '@apply left-4': {},
        }
      }
    }
  });
});

export default fancyboxComponent;
