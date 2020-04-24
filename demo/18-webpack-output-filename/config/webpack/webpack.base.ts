import path from 'path';
import glob from 'glob';
import Config from 'webpack-chain';

const cwd = process.cwd();
const resolver = (p: string) => path.resolve(cwd, p);

export const createConfig = () => {
  // * empty Config instance
  const config = new Config();

  // * load basic configs
  const subConfigPaths = glob.sync(path.resolve(__dirname, './configs/*.{ts,js}'));
  extendConfigs(config, subConfigPaths);

  return config;
};

export const extendConfigs = (config: Config, paths: string[]) => {
  paths.forEach((p) => {
    Object.values(require(p)).forEach((val) => {
      typeof val === 'function' && val(config, resolver);
    });
  });
};
