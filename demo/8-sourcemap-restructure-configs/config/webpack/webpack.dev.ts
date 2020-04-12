import { config, extendConfigs } from './webpack.base';

config.mode('development');

extendConfigs(['./optional-configs/clean-dist.ts']);

export default config.toConfig();
