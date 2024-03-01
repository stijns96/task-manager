/**
 * Variants for the various interactive states.
 * 'states', 'states-enabled', 'hocus-enabled', etc.
 */

import plugin from 'tailwindcss/plugin';

/** @type { import('tailwindcss/types/config').PluginsConfig } */
const statesVariant = plugin(function ({ theme, addVariant, matchVariant }) {
  // All interactive states regardless of the disabled attribute
  addVariant('states', ['&:hover', '&:focus', '&:active']);
  matchVariant(
    'group-states',
    (_, { modifier }) => {
      return modifier
        ? [
            `:merge(.group\\/${modifier}):hover &`,
            `:merge(.group\\/${modifier}):focus &`,
            `:merge(.group\\/${modifier}):active &`,
          ]
        : [':merge(.group):hover &', ':merge(.group):focus &', ':merge(.group):active &'];
    },
    {
      // The `DEFAULT` value here lets you use group-loading/foo without an arbitrary value
      // Otherwise you'd always have to write it as group-loading-[something-here]/foo:bg-red-500
      values: { DEFAULT: null },
    }
  );

  // All interactive states and is not disabled
  addVariant('states-enabled', ['&:hover:enabled', '&:focus:enabled', '&:active:enabled']);
  matchVariant(
    'group-states-enabled',
    (_, { modifier }) => {
      return modifier
        ? [
            `:merge(.group\\/${modifier}):hover:enabled &`,
            `:merge(.group\\/${modifier}):focus:enabled &`,
            `:merge(.group\\/${modifier}):active:enabled &`,
          ]
        : [
            ':merge(.group):hover:enabled &',
            ':merge(.group):focus:enabled &',
            ':merge(.group):active:enabled &',
          ];
    },
    {
      // The `DEFAULT` value here lets you use group-loading/foo without an arbitrary value
      // Otherwise you'd always have to write it as group-loading-[something-here]/foo:bg-red-500
      values: { DEFAULT: null },
    }
  );

  // Only focus and hover states that are not disabled
  addVariant('hocus-enabled', ['&:focus:enabled', '&:hover:enabled']);
  matchVariant(
    'group-hocus-enabled',
    (_, { modifier }) => {
      return modifier
        ? [
            `:merge(.group\\/${modifier}):hover:enabled &`,
            `:merge(.group\\/${modifier}):focus:enabled &`,
          ]
        : [':merge(.group):hover:enabled &', ':merge(.group):focus:enabled &'];
    },
    {
      // The `DEFAULT` value here lets you use group-loading/foo without an arbitrary value
      // Otherwise you'd always have to write it as group-loading-[something-here]/foo:bg-red-500
      values: { DEFAULT: null },
    }
  );

  // Only active state that is not disabled
  addVariant('active-enabled', ['&:active:enabled']);
  matchVariant(
    'group-active-enabled',
    (_, { modifier }) => {
      return modifier
        ? [`:merge(.group\\/${modifier}):active:enabled &`]
        : [':merge(.group):active:enabled &'];
    },
    {
      // The `DEFAULT` value here lets you use group-loading/foo without an arbitrary value
      // Otherwise you'd always have to write it as group-loading-[something-here]/foo:bg-red-500
      values: { DEFAULT: null },
    }
  );

  // We override the default disabled variant to include a .disabled class
  addVariant('disabled', ['&:disabled', '&.disabled']);
});

export default statesVariant;
