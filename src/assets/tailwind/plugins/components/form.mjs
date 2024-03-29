import plugin from 'tailwindcss/plugin';

/** @type { import('tailwindcss/types/config').PluginsConfig } */
const formComponent = plugin(function ({ addComponents }) {
  addComponents({
    '.field': {
      '@apply relative mb-element-spacing w-full last:mb-0': {},

      // .field__label
      '&__label, &__header': {
        '@apply mb-2 block text-sm font-bold text-inherit': {},

        '&[aria-hidden="true"]': {
          '@apply hidden': {},
        },
      },

      // .field__input, .field__select, .field__text-area
      '&__input, &__select, &__textarea': {
        '@apply block w-full px-4 py-2.5': {},
        '@apply font-body text-sm leading-5 text-black': {},
        '@apply bg-primary-50 border-transparent shadow-none outline-none ring-transparent transition-all duration-75 ease-linear placeholder:text-black':
          {},

        '&:focus': {
          '@apply border-primary-100 bg-primary-100 text-black shadow-none shadow-transparent outline-none ring-transparent':
            {},
        },
        '&:focus-visible': {
          '@apply border-primary-100 bg-primary-100 text-black outline-none': {},
        },
        '&:invalid:not(:placeholder-shown), &[aria-invalid="true"]:invalid': {
          '@apply border-danger': {},
          '~ .field__icons .icon-cross': {
            '@apply block': {},
            '[fill="currentColor"]': {
              '@apply fill-danger': {},
            },
          },
          '~ .field__message--error': {
            '@apply block': {},
          },
        },
        '&:active(:not(:disabled)), &:focus(:not(:disabled)), &:focus-visible(:not(:disabled))': {
          '@apply bg-primary-50 outline-none': {},
        },
        '&:valid[required], &:invalid:not(:placeholder-shown)': {
          '@apply pr-14': {}, // preserve space for icons
        },
        '&:valid[required]': {
          '~ .field__icons .icon-checkmark': {
            '@apply block': {},
          },
          '~ .field__message': {
            '@apply hidden': {},
          },
        },
        '&:disabled[required]': {
          '@apply cursor-default opacity-30': {},
          '~ .field__message, ~ .field__label': {
            '@apply opacity-30': {},
          },
        },
        '~ .field__icons .icon': {
          '@apply absolute right-3 top-1/2 hidden -translate-y-1/2': {},
        },
        '&::-webkit-search-cancel-button': {
          '@apply hidden': {},
        },
      },

      // .field__textarea
      '&__textarea': {
        '@apply h-20 resize-none': {},
      },

      // .field__message
      '&__message': {
        '@apply mt-2 block w-full flex-none text-sm': {},
        '&--error': {
          '@apply hidden text-danger': {},
        },
      },

      // .field--checkbox
      '&--checkbox': {
        '@apply flex gap-2': {},
      },

      // input .field__checkbox
      '&__checkbox': {
        '@apply flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center border-none bg-gray-100 text-black':
          {},
        svg: {
          '@apply opacity-0 transition-opacity': {},
        },
      },

      'input:focus-visible + .field__checkbox': {
        '@apply outline-none ring-2 ring-primary-200': {},
      },
      'input:checked + .field__checkbox': {
        '@apply cursor-default': {},
        svg: {
          '@apply opacity-100': {},
        },
      },
      'input:disabled + .field__checkbox': {
        '@apply pointer-events-none': {},
        svg: {
          '@apply opacity-0': {},
        },
      },

      // .field__checkbox-label
      '&__checkbox-label': {
        '@apply mb-0 block cursor-pointer text-sm leading-5 transition-colors text-color-default':
          {},
      },
      '&:hover .field__checkbox-label': {
        '@apply text-primary': {},
      },
      'input:disabled ~ .field__checkbox-label': {
        '@apply pointer-events-none cursor-default line-through opacity-50 text-color-default': {},
      },

      // .field--radio
      '&--radio': {
        '@apply flex gap-2': {},
      },

      // input label.field__radio
      '&__radio': {
        '@apply flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-full border-none bg-gray-100':
          {},
        '&:after': {
          '@apply h-2 w-2 rounded-full bg-black opacity-0 transition-opacity content-[""]': {},
        },
      },
      'input:focus-visible + .field__radio': {
        '@apply outline-none ring-2 ring-primary-200': {},
      },
      '&:hover .field__radio, input:checked + .field__radio': {
        '@apply cursor-default': {},
        '&:after': {
          '@apply opacity-100': {},
        },
      },
      'input:disabled + .field__radio': {
        '@apply pointer-events-none': {},
        '&:after': {
          '@apply opacity-0': {},
        },
      },

      // .field__radio-label
      '&__radio-label': {
        '@apply mb-0 block cursor-pointer text-sm leading-5 transition-colors text-color-default':
          {},
      },
      '&:hover .field__radio-label': {
        '@apply text-primary': {},
      },
      'input:disabled ~ .field__radio-label': {
        '@apply pointer-events-none cursor-default line-through opacity-50 text-color-default': {},
      },

      // .field__select
      '&__select': {
        '@apply cursor-pointer': {},
      },

      // .field__select-icon
      '&__select-icon': {
        '@apply absolute right-5 top-1/2 origin-center -translate-y-1/2': {},
      },

      // .field__dropdown
      '.field__dropdown': {
        '@apply pointer-events-none absolute left-0 top-full z-10 mt-1 flex w-56 origin-top-right flex-col border bg-white py-3 opacity-0 shadow-md transition-opacity border-color-default focus:outline-none':
          {},
        '&--active': {
          '@apply pointer-events-auto opacity-100': {},
        },
      },

      '.field__dropdown-item': {
        '@apply px-3 text-sm text-black transition-colors hover:text-primary hover:no-underline':
          {},
      },

      // .field__text-area
      '&__text-area': {
        '@apply h-40 resize-none p-6': {},
        '&--resize-vertical': {
          '@apply resize-y': {},
        },
      },

      // .field--switch
      '&--switch': {
        '@apply relative inline-flex w-full cursor-pointer items-center gap-2': {},
      },

      // .field--switch-label
      '&__switch': {
        '@apply relative h-5 w-9 rounded-full bg-gray-200': {},
        '&:after': {
          '@apply absolute left-0.5 top-0.5 h-4 w-4 rounded-full border bg-white transition-all content-[""] border-color-default':
            {},
        },
      },
      'input:focus-visible + .field__switch': {
        '@apply outline-none ring-2 ring-primary-200': {},
      },
      'input:checked + .field__switch:after': {
        '@apply translate-x-full border-primary bg-primary': {},
      },
      'input:disabled + .field__switch': {
        '@apply pointer-events-none': {},
      },

      '&__switch-label': {
        '@apply mb-0 block cursor-pointer text-sm leading-5 transition-colors text-color-default':
          {},
      },
      '&:hover .field__switch-label': {
        '@apply text-primary': {},
      },
      'input:disabled ~ .field__switch-label': {
        '@apply pointer-events-none cursor-default line-through opacity-50 text-color-default': {},
      },
    },
  });
});

export default formComponent;
