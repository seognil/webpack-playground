const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackConfig = {
  entry: {
    app: ['./src/index.js'],
  },
  output: {
    path: path.resolve('./dist'),
  },
  devServer: {
    contentBase: 'dist',
    overlay: true,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('./public/index.html'),
    }),
  ],
};

module.exports = webpackConfig;
