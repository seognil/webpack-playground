const path = require('path');

const webpackConfig = {
  entry: { app: ['./src/index.js'] },
  output: { path: path.resolve('./dist') },
  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: [/node_modules\/(webpack|core-js)/],
        use: [
          {
            loader: 'babel-loader',
            options: require('./babel.config'),
          },
        ],
      },
    ],
  },
};

module.exports = webpackConfig;
