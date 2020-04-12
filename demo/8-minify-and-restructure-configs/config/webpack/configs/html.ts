import { ConfigTweaker } from '../utils/types';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export const makeHtml: ConfigTweaker = (config, resolver) => {
  config.plugin('html').use(HtmlWebpackPlugin, [{ template: resolver('./src/index.html') }]);
};
