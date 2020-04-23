import { createConfig } from './webpack.base';

const config = createConfig();

config.mode('development');

export default config.toConfig();
