import { ConfigTweaker } from '../utils/types';
import { sourcemap } from '../utils/env';

export const setDevToolkits: ConfigTweaker = (config) => {
  if (sourcemap) config.devtool('source-map');
};
