import { ConfigTweaker } from '../utils/types';

export const urlLoader: ConfigTweaker = (config, resolver) => {
  config.module
    .rule('url-loader')
    .test(/\.(eot|ttf|TTF|woff|woff2|svg|png|jpg|gif)$/i)
    .use('url-loader')
    .loader('url-loader')
    .options({
      limit: 8192,
      fallback: 'file-loader',
      esModule: false,
    });
};
