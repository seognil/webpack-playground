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
        modules: 'cjs',
      },
    ],
  ],
  exclude: [/node_modules\/(webpack|core-js)/],
};

module.exports = byRuntime;
