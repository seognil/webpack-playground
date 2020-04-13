const byRuntime = {
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3,
      },
    ],
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        modules: 'umd',
      },
    ],
  ],
  exclude: [/node_modules\/(webpack|@babel|core-js)/],
};

module.exports = byRuntime;
