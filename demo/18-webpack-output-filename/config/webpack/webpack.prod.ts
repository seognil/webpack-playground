import { createConfig, extendConfigs } from './webpack.base';

const config = createConfig();

config.mode('production');

extendConfigs(config, ['./optional-configs/clean-dist.ts', './optional-configs/terser.ts']);

export default config.toConfig();
