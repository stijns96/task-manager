/**
 * https://tailwindcss.com/docs/configuration
 */

// Import default Tailwind colors
import colors from "tailwindcss/colors";

// Official Tailwind plugins
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";

// Theme plugins
import baseStyles from "./src/assets/tailwind/plugins/base/_index.mjs";
import componentsStyles from "./src/assets/tailwind/plugins/components/_index.mjs";
import utilitiesStyles from "./src/assets/tailwind/plugins/utilities/_index.mjs";
import variantsStyles from "./src/assets/tailwind/plugins/variants/_index.mjs";

/** @type { import('tailwindcss').Config } */
const tailwindConfig = {
  /**
   * Which files are watched by tailwind
   */
  content: ["./src/**/*.{js,mjs}", "./src/**/*.liquid"],
  /**
   * Containers and site center
   * Default Tailwind container is disabled
   * Usage: format-container
   */
  corePlugins: {
    container: false,
  },
  theme: {
    /**
     * Default screen sizes
     * Advise: leave as it is
     */
    screens: {
      xs: "360px",
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
      "3xl": "1680px",
      "4xl": "1920px",
      "5xl": "2000px",
    },
    /**
     * Font family's
     * Advise: Adjust to project needs in html-head-fonts.liquid
     */
    fontFamily: {
      body: "var(--font-body-family)",
      heading: "var(--font-heading-family)",
    },
    /**
     * Default font sizes
     * Default line height is set on the body
     * Exceptions in line-height text-base leading-tight
     * Advise: leave as it is
     */
    fontSize: {
      "2xs": "0.625rem",
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "3.75rem",
      "7xl": "4.5rem",
      "8xl": "6rem",
      "9xl": "8rem",
    },
    /**
     * Colors
     * We extend the tailwind colors with our own colors
     */
    colors: {
      inherit: colors.inherit,
      current: colors.current,
      transparent: colors.transparent,
      black: "#262626",
      gray: colors.neutral,
      white: colors.white,

      primary: {
        DEFAULT: "#DF9A3E",
        text: "#FFFFFF",
        50: "#FBF4EB",
        100: "#F8EAD8",
        200: "#F2D6B1",
        300: "#EBC28B",
        400: "#E5AE64",
        500: "#DF9A3E",
        600: "#B27B31",
        700: "#855C25",
        800: "#593D18",
        900: "#2C1E0C",
      },

      secondary: {
        DEFAULT: "#262626",
        text: "#FFFFFF",
        50: "#E9E9E9",
        100: "#D3D3D3",
        200: "#A8A8A8",
        300: "#7C7C7C",
        400: "#515151",
        500: "#262626",
        600: "#1E1E1E",
        700: "#161616",
        800: "#0F0F0F",
        900: "#070707",
      },

      accent: {
        DEFAULT: "#737373",
        text: "#262626",
        50: "#FAFAFA",
        100: "#F5F5F5",
        200: "#E5E5E5",
        300: "#D4D4D4",
        400: "#A3A3A3",
        500: "#737373",
        600: "#525252",
        700: "#404040",
        800: "#262626",
        900: "#171717",
      },

      info: "#EDB407",
      success: "#42CC92",
      warning: "#FFC107",
      danger: "#FF5656",
    },
    extend: {
      /**
       * Extend content classes
       * Results in content: ''
       * Usage: before:content-empty
       */
      content: {
        empty: "''",
      },

      backgroundColor: ({ theme }) => ({
        "color-default": theme("colors.white"),
      }),

      borderColor: ({ theme }) => ({
        "color-default": "#DEDEDE",
      }),

      textColor: ({ theme }) => ({
        "color-default": theme("colors.black"),
        "color-light": "#969696",
        "color-link": theme("colors.primary.DEFAULT"),
        "color-link-states": theme("colors.primary.600"),
      }),

      spacing: {
        "element-spacing": "var(--element-spacing)",
        "site-side-spacing": "var(--site-side-spacing)",
      },

      height: {
        "screen-smallest": ["100vh", "100svh"],
        "screen-dynamic": ["100vh", "100dvh"],
        "screen-largest": ["100vh", "100lvh"],
      },

      maxHeight: {
        "screen-smallest": ["100vh", "100svh"],
        "screen-dynamic": ["100vh", "100dvh"],
        "screen-largest": ["100vh", "100lvh"],
      },

      minHeight: {
        "screen-smallest": ["100vh", "100svh"],
        "screen-dynamic": ["100vh", "100dvh"],
        "screen-largest": ["100vh", "100lvh"],
      },

      width: {
        "screen-smallest": ["100vw", "100svw"],
        "screen-dynamic": ["100vw", "100dvw"],
        "screen-largest": ["100vw", "100lvw"],
      },

      maxWidth: {
        "screen-smallest": ["100vw", "100svw"],
        "screen-dynamic": ["100vw", "100dvw"],
        "screen-largest": ["100vw", "100lvw"],
      },

      minWidth: {
        "screen-smallest": ["100vw", "100svw"],
        "screen-dynamic": ["100vw", "100dvw"],
        "screen-largest": ["100vw", "100lvw"],
      },

      zIndex: {
        dropdown: "1000",
        sticky: "1020",
        fixed: "1030",
        "offcanvas-backdrop": "1040",
        offcanvas: "1045",
        "modal-backdrop": "1050",
        modal: "1055",
        popover: "1070",
        tooltip: "1080",
      },

      typography: (theme) => ({
        DEFAULT: {
          css: {
            "--tw-prose-counters": "color: inherit",
            "--tw-prose-bullets": "color: inherit",
          },
        },
      }),
    },
  },
  plugins: [
    /**
     * Plugins are how we add custom classes to Tailwind. To add/edit plugins,
     * add them to /dev/tailwind/plugins.
     * More info: https://tailwindcss.com/docs/plugins
     *
     * Important: Order of plugins affects the CSS cascade.
     * Insert plugins with higher importance lower in the list.
     */

    /**
     * Base
     * More info: https://tailwindcss.com/docs/plugins#adding-base-styles
     */
    ...baseStyles,

    /**
     * Component forms
     * More info: https://github.com/tailwindlabs/tailwindcss-forms
     */
    forms,

    /**
     * Component RTE
     * More info: https://tailwindcss.com/docs/typography-plugin
     */
    typography({
      // Change .prose to .rte. This is needed because Shopify is using the .rte class in some templates that we can't change.
      className: "rte",
    }),

    /**
     * Components
     * More info: https://tailwindcss.com/docs/plugins#adding-components
     */
    ...componentsStyles,

    /**
     * Utilities
     * More info: https://tailwindcss.com/docs/plugins#adding-utilities
     */
    ...utilitiesStyles,

    /**
     * Variants
     * More info: https://tailwindcss.com/docs/plugins#adding-variants
     */
    ...variantsStyles,
  ],
};

export default tailwindConfig;
