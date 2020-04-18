import { config, extendConfigs } from './webpack.base';

config.mode('production');

extendConfigs(['./optional-configs/clean-dist.ts', './optional-configs/terser.ts']);

export default config.toConfig();
