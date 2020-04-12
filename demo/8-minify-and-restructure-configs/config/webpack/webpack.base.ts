import path from 'path';
import glob from 'glob';
import Config from 'webpack-chain';

// * ---------------- foundation

const config = new Config();

const cwd = process.cwd();
const resolver = (p: string) => path.resolve(cwd, p);

const extendConfigs = (paths: string[]) => {
  paths.forEach((p) => {
    Object.values(require(p)).forEach((val) => {
      typeof val === 'function' && val(config, resolver);
    });
  });
};

// * ---------------- load basic configs

const subConfigs = glob.sync(path.resolve(__dirname, './configs/*.{ts,js}'));

extendConfigs(subConfigs);

// * ---------------- export

// * basic conifg
export default config.toConfig();

// * for extends
export { config, extendConfigs };
