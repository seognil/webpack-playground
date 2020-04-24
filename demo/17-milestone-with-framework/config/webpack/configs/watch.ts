import { isWatch } from './../utils/env';
import { ConfigTweaker } from '../utils/types';

export const loadScript: ConfigTweaker = (config, resolver) => {
  config.watch(isWatch);
};
