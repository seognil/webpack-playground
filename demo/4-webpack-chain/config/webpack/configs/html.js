const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (config, resolver) => {
  config.plugin('html').use(HtmlWebpackPlugin, [{ template: resolver('./src/index.html') }]);
};
