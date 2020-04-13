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
        modules: false,
      },
    ],
  ],
  exclude: [/node_modules\/(webpack|@babel|core-js)/],
};

module.exports = byRuntime;
