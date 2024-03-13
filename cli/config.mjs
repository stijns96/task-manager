/** @type {import('glob').GlobOptions} */
const globOptions = {
  posix: true,
  ignore: [
    `src/**/_*.{js,scss}`,
  ]
};

/** @type {import('chokidar').WatchOptions} */
const watchOptions = {
  // Ignore dotfiles
  persistent: true,
};

export default {
  src: {
    root: 'src',
    assetsDir: 'src/assets',
  },
  theme: {
    root: 'theme',
    assetsDir: 'theme/assets',
    glob: {
      input: [`src/**/*`],
      options: {
        ...globOptions,
        ignore: [
          `src/assets`,
          `src/assets/**/*`,
        ],
        dot: true
      }
    },
  },
  assets: {
    public: {
      glob: {
        input: [`src/assets/public/**/*`],
        options: globOptions
      },
    },
    js: {
      glob: {
        input: [`src/assets/js/**/*.js`],
        options: globOptions
      },
    },
    scss: {
      glob: {
        input: [`src/assets/scss/**/*.scss`],
        options: globOptions,
      },
    },
    tailwind: {
      glob: {
        input: [`src/assets/tailwind/scss/*.scss`],
        options: globOptions
      },
    },
  },
  watch: {
    options: watchOptions
  }
};