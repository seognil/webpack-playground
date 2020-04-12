import { argv } from 'yargs';

const configFile = argv.config as string;

const prod = /webpack\.prod/.test(configFile);
const dev = /webpack\.dev/.test(configFile);
const server = /webpack\.server/.test(configFile);

export const isDevMode = dev || server;
export const isBuilding = dev || prod;

export const shouldMinify = prod;

export const sourcemap = argv.devtool !== undefined ? argv.devtool : isDevMode;
