import path from 'path';
import glob from 'glob';
import Config from 'webpack-chain';

// * ---------------- init config

const config = new Config();

// * ---------------- make resolver

const cwd = process.cwd();
const resolver = (p: string) => path.resolve(cwd, p);

// * ---------------- search files

const subConfigs = glob.sync(path.resolve(__dirname, './configs/*.{ts,js}'));

// * ---------------- load all sub configs

subConfigs.forEach((p) => {
  Object.values(require(p)).forEach((val) => {
    typeof val === 'function' && val(config, resolver);
  });
});

export { config };
