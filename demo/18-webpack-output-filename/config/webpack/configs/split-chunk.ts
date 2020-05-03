import { ConfigTweaker } from '../utils/types';

export const splitChunk: ConfigTweaker = (config, resolver) => {
  config.optimization.merge({
    runtimeChunk: {
      name: 'webpack',
    },
  });

  // * all packages in on file
  const setNpmSingle = () =>
    config.optimization.splitChunks({
      chunks: 'all',

      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,

          name: 'npm',
        },
      },
    });

  // * or single file for every npm package
  const setNpmMulti = () =>
    config.optimization.splitChunks({
      chunks: 'all',

      maxInitialRequests: Infinity,
      maxAsyncRequests: Infinity,
      minSize: 0,

      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,

          name: (module: any) => {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            return `npm-${packageName.replace('@', '')}`;
          },
        },
      },
    });

  const npmAllinOne = true;

  if (npmAllinOne) {
    setNpmSingle();
  } else {
    setNpmMulti();
  }
};
