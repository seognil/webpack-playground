import { ConfigTweaker } from '../utils/types';

export const terser: ConfigTweaker = (config, resolver) => {
  config.optimization.minimizer('terser').use('terser-webpack-plugin', [
    {
      terserOptions: {
        compress: { drop_console: false },
        output: { comments: false },
      },
    },
  ]);
};
