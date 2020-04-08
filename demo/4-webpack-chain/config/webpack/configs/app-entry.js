module.exports = (config, resolver) => {
  config.entry('app').add('./src/index.js');

  config.output.path(resolver('./dist'));
};
