import { ConfigTweaker } from '../types';
import Config from 'webpack-chain';

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

  // * ---------------- css

  cssRule.use('css').loader('css-loader');

  // * ---------------- postcss

  cssRule
    .use('postcss')
    .loader('postcss-loader')
    .options({ ident: 'postcss', plugins: [require('autoprefixer')()] });

  // * ---------------- anvanced processor

  if (loader) {
    cssRule.use(loader).loader(loader).options(options);
  }
};

export const loadStyle: ConfigTweaker = (config, resolver) => {
  loadStyleAdvanced(config, 'css', /\.css$/);
  loadStyleAdvanced(config, 'less', /\.less$/, 'less-loader');
  loadStyleAdvanced(config, 'sass', /\.(sass|scss)$/, 'sass-loader', {
    implementation: require('dart-sass'),
  });
};
