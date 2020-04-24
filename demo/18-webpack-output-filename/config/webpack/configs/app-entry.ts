import { isDevMode } from '../utils/env';
import { ConfigTweaker } from '../utils/types';

const hashMode = isDevMode ? `` : `.[contenthash:8]`;

export const configEntry: ConfigTweaker = (config, resolver) => {
  config.entry('app').add('./src/index.ts');

  config.output.merge({
    filename: `[name]${hashMode}.js`,
    sourceMapFilename: `sourcemap/[file].map`,
    path: resolver('./dist'),
  });
};
