import { createConfig, extendConfigs } from './webpack.base';

const config = createConfig();

config.mode('development');

extendConfigs(config, ['./optional-configs/clean-dist.ts']);

export default config.toConfig();
