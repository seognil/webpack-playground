module.exports = {
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining',
  ],
  presets: [
    ['@babel/preset-env', { modules: 'commonjs' }],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
};
