import { ConfigTweaker } from '../types';

import babelConfig from './babel.config';

export const loadScript: ConfigTweaker = (config, resolver) => {
  config.module
    .rule('script')
    .test(/\.(ts|tsx|js|jsx)$/)
    .use('babel')
    .loader('babel-loader')
    .options(babelConfig);
};
