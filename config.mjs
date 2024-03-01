import { glob } from 'glob';

const src = {
  root: `src`,
};

const theme = {
  root: `theme`,
}

/** @type {import('glob').GlobOptions} */
const globOptions = {
  posix: true,
  ignore: [
    `${src.root}/**/_*.{js,scss}`,
  ]
};

/** @type {import('chokidar').WatchOptions} */
const watchOptions = {
  // Ignore dotfiles
  ignored: /(^|[\/\\])\../,
  persistent: true,
};

export default {
  src: {
    root: src.root,
    assetsDir: `${src.root}/assets`,
  },
  theme: {
    root: theme.root,
    assetsDir: `${theme.root}/assets`,
    configDir: `${theme.root}/config`,
    localesDir: `${theme.root}/layout`,
    localesDir: `${theme.root}/locales`,
    sectionsDir: `${theme.root}/sections`,
    snippetsDir: `${theme.root}/snippets`,
    templatesDir: `${theme.root}/templates`,
  },
  js: {
    glob: {
      input: [`${src.root}/assets/js/**/*.js`],
      options: globOptions
    },
  },
  scss: {
    glob: {
      input: [`${src.root}/assets/scss/**/*.scss`],
      options: {
        ...globOptions,
        ignore: [
          ...globOptions.ignore,
          `${src.root}/assets/scss/{partials,tailwind}/**/*.scss`,
        ],
      }
    },
  },
  tailwind: {
    glob: {
      input: [`${src.root}/assets/scss/tailwind/*.scss`],
      options: globOptions
    },
  },
  static: {
    glob: {
      input: [`${src.root}/**/*.{liquid,json}`, `${src.root}/assets/static/**/*`],
      options: globOptions
    },
  },
  watch: {
    options: watchOptions
  }
};