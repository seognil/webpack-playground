const path = require('path');
const glob = require('glob');
const Config = require('webpack-chain');

// * ---------------- init config

const config = new Config();

// * ---------------- make resolver

const cwd = process.cwd();
const resolver = (p) => path.resolve(cwd, p);

// * ---------------- search files

const subConfigs = glob.sync(path.resolve(__dirname, './configs/*.{ts,js}'));

// * ---------------- make config

subConfigs.forEach((p) => require(p)(config, resolver));

module.exports = config;
