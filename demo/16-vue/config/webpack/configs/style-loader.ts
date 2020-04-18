import { ConfigTweaker } from '../utils/types';
import { sourcemap, shouldMinify } from '../utils/env';
import Config from 'webpack-chain';

// * ================================================================================

const sourcemapOrNot = sourcemap ? { sourceMap: true } : {};

// * ================================================================================

const loadStyleAdvanced = (
  config: Config,
  name: string,
  test: RegExp,
  loader?: string,
  options: Object = {},
) => {
  const cssRule = config.module.rule(name).test(test);

  // * ---------------- load style

  const USE_EXTRACT = true;

  if (USE_EXTRACT) {
    cssRule.use('css-extract-loader').loader(require('mini-css-extract-plugin').loader);
    config.plugin('mini-css-extract').use('mini-css-extract-plugin');
  } else {
    cssRule.use('style').loader('style-loader');
  }

  if (shouldMinify) {
    config.optimization.minimizer('css').use('optimize-css-assets-webpack-plugin');
  }

  // * ---------------- css

  cssRule
    .use('css')
    .loader('css-loader')
    .options({ ...sourcemapOrNot });

  // * ---------------- postcss

  cssRule
    .use('postcss')
    .loader('postcss-loader')
    .options({
      ...sourcemapOrNot,
      ident: 'postcss',
      plugins: [require('autoprefixer')()],
    });

  // * ---------------- anvanced processor

  if (loader) {
    cssRule
      .use(loader)
      .loader(loader)
      .options({ ...sourcemapOrNot, ...options });
  }
};

export const loadStyle: ConfigTweaker = (config, resolver) => {
  loadStyleAdvanced(config, 'css', /\.css$/);
  loadStyleAdvanced(config, 'less', /\.less$/, 'less-loader');
  loadStyleAdvanced(config, 'sass', /\.(sass|scss)$/, 'sass-loader', {
    implementation: require('dart-sass'),
  });
};
