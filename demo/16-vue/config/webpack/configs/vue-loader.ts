import { ConfigTweaker } from '../utils/types';

export const vueLoader: ConfigTweaker = (config, resolver) => {
  config.module
    .rule('vue')
    .test(/\.vue$/)
    .use('vue')
    .loader('vue-loader')
    .options({
      esModule: false,
    });

  config.plugin('vue').use('vue-loader/lib/plugin');
};
