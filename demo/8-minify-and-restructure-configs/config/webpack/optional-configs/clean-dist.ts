import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { ConfigTweaker } from '../utils/types';

export const cleanDist: ConfigTweaker = (config, resolver) => {
  config.plugin('clean-webpack-plugin').use(CleanWebpackPlugin);
};
