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
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('./src/index.html'),
    }),
  ],
};

module.exports = webpackConfig;
