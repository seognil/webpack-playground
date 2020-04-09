import { ConfigTweaker } from '../types';

export const configEntry: ConfigTweaker = (config, resolver) => {
  config.entry('app').add('./src/index.ts');

  config.output.path(resolver('./dist'));
};
