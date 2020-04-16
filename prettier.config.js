module.exports = {
  arrowParens: 'always',
  printWidth: 100,
  singleQuote: true,
  trailingComma: 'all',
  tabWidth: 2,
  quoteProps: 'consistent',
  semi: true,
  useTabs: false,
  overrides: [
    {
      files: 'demo/**/*.md',
      options: {
        printWidth: 60,
      },
    },
  ],
};
