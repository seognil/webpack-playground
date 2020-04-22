import { ConfigTweaker } from '../types';

export const resolveConfig: ConfigTweaker = (config, resolver) => {
  config.resolve.extensions.merge(['.ts', '.tsx', '.js', '.jsx']);
};
