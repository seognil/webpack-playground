import { ConfigTweaker } from '../types';

export const configEntry: ConfigTweaker = (config, resolver) => {
  config.entry('app').add('./src/index.js');

  config.output.path(resolver('./dist'));
};
