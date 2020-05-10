import { isWatch } from './../utils/env';
import { ConfigTweaker } from '../utils/types';

export const setWatch: ConfigTweaker = (config, resolver) => {
  config.watch(isWatch);
};
