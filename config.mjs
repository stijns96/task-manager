/** @type {import('glob').GlobOptions} */
const globOptions = {
  posix: true,
};

/** @type {import('chokidar').WatchOptions} */
const watchOptions = {
  // Ignore dotfiles
  ignored: /(^|[\/\\])\../,
  persistent: true,
};

const src = {
  root: `./src`,
};

const theme = {
  root: `./theme`,
}

export default {
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
      input: `${src.root}/assets/js/**/*.js`,
      options: {
        ignore: [
          `${src.root}/assets/js/**/_*.js`,
        ],
        ...globOptions
      }
    },
  },
  scss: {
    glob: {
      input: `${src.root}/assets/scss/**/*.scss`,
      options: {
        ignore: [
          `${src.root}/assets/scss/**/_*.scss`,
          `${src.root}/assets/scss/{partials,tailwind}/**`,
        ],
        ...globOptions
      }
    },
  },
  tailwind: {
    glob: {
      input: `${src.root}/assets/scss/tailwind.scss`,
      options: globOptions
    },
  },
  liquid: {
    glob: {
      input: `${src.root}/**/*.liquid`,
      options: globOptions
    },
  },
  watch: {
    options: watchOptions
  }
};