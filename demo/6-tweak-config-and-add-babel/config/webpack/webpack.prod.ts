import { config } from './webpack.base';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

config.mode('production');

config.plugin('clean-webpack-plugin').use(CleanWebpackPlugin);

export default config.toConfig();
