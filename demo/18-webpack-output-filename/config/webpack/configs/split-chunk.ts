import { ConfigTweaker } from '../utils/types';

export const splitChunk: ConfigTweaker = (config, resolver) => {
  config.optimization.merge({
    runtimeChunk: {
      name: 'webpack',
    },
  });

  config.optimization.splitChunks({
    chunks: 'all',

    maxInitialRequests: Infinity,
    maxAsyncRequests: Infinity,
    minSize: 0,

    cacheGroups: {
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        priority: -10,

        // * all packages in on file
        name: 'npm',

        // * or single file for every npm package
        // name: (module: any) => {
        //   const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

        //   return `npm-${packageName.replace('@', '')}`;
        // },
      },
    },
  });
};
