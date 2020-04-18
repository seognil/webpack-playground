module.exports = {
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
        modules: 'amd',
      },
    ],
    '@babel/preset-typescript',
  ],
  exclude: [/node_modules\/(webpack|core-js)/],
};
