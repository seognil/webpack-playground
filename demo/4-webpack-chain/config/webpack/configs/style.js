module.exports = (config) => {
  const cssRule = config.module.rule('css').test(/\.(sass|scss|less|css)$/);

  // * ---------------- load style

  const USE_EXTRACT = true;

  if (USE_EXTRACT) {
    cssRule.use('css-extract-loader').loader(require('mini-css-extract-plugin').loader);
    config.plugin('mini-css-extract').use('mini-css-extract-plugin');
  } else {
    cssRule.use('style').loader('style-loader');
  }

  // * ---------------- css

  cssRule.use('css').loader('css-loader').options({ importLoaders: 2 });

  // * ---------------- postcss

  cssRule
    .use('postcss')
    .loader('postcss-loader')
    .options({ ident: 'postcss', plugins: [require('autoprefixer')()] });

  // * ---------------- sass
  // * would parse scss and less all in one

  cssRule
    .use('sass')
    .loader('sass-loader')
    .options({ implementation: require('dart-sass') });
};
