const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (config, resolver) => {
  config.plugin('clean-webpack-plugin').use(CleanWebpackPlugin);
};
