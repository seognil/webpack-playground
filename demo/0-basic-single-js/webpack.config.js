const path = require('path');

const webpackConfig = {
  entry: {
    app: ['./src/index.js'],
  },
  output: {
    path: path.resolve('./dist'),
  },
};

module.exports = webpackConfig;
