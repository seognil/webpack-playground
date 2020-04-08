module.exports = (config) => {
  const cssRule = config.module.rule('css').test(/\.(sass|scss|less|css)$/);

  const USE_EXTRACT = true;

  // * ---------------- load style

  USE_EXTRACT
    ? cssRule.use('css-extract-loader').loader(require('mini-css-extract-plugin').loader)
    : cssRule.use('style').loader('style-loader');

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

  USE_EXTRACT && config.plugin('mini-css-extract').use('mini-css-extract-plugin');
};
