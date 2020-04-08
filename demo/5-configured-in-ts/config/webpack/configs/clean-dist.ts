import { ConfigTweaker } from '../types';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

export const cleanDist: ConfigTweaker = (config, resolver) => {
  config.plugin('clean-webpack-plugin').use(CleanWebpackPlugin);
};
