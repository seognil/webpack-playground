const byRuntime = {
  sourceType: 'unambiguous',
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
  exclude: [/node_modules\/(webpack|core-js)/],
};

module.exports = byRuntime;
