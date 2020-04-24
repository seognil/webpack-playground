// * yarn jest --cases='11-13'
// * yarn jest --cases='11, 13'

import { argv } from 'yargs';
import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';
import glob from 'glob';

// * ================================================================================

const numMatch = (p: string) => p.match(/(?<=demo\/)\d+(?=[-])/);

const numOf = (p: string) => Number(numMatch(p)![0]);

const echoRaw = (str: string) => {
  execSync(`echo ${str}`, { stdio: 'inherit' });
};
const echo = (str: string) => {
  echoRaw(`'\\n'`);
  echoRaw(str);
  echoRaw(`'\\n'`);
};

const cleanFolder = (p: string) => {
  const distPath = path.resolve(p, 'dist');
  fs.existsSync(distPath) && execSync(`trash ${distPath}`);
  // const npmPath = path.resolve(p, 'node_modules');
  // fs.existsSync(npmPath) && execSync(`trash ${npmPath}`);
};

// * ================================================================================

const projPathList = glob
  .sync(path.resolve(__dirname, '../../demo/*'))
  .filter((e) => numMatch(e) !== null)
  .sort((a, b) => numOf(a) - numOf(b));

// * ---------------------------------------------------------------- range

type Ranger = (i: number) => boolean;

const shouldTest: Ranger = (() => {
  const testRange = [-Infinity, Infinity];

  let c = argv.cases as string | undefined;

  c = c ? String(c).replace(/\s/g, '') : c;

  const range = (c && /^\d+[-~]\d+$/.test(c) && c.split(/[-~]/).map(Number)) || testRange;

  const cases = c && /^(\d+,)?\d+$/.test(c) && c.replace(/\s/g, '').split(',').map(Number);

  return cases ? (i: number) => cases.includes(i) : (i: number) => range[0] <= i && i <= range[1];
})();

echo(
  `should test: ${projPathList
    .map((e, i) => i)
    .filter((e) => shouldTest(e))
    .join(', ')}`,
);

// * ---------------------------------------------------------------- test every proj

const testCmd = {
  basic: [`yarn build; yarn test`],
  prod: [`yarn build:dev; yarn test`, `yarn build; yarn test`],
  babel: [`yarn build:babel; yarn test:babel`],
};

const dynamicList = [9, 13, 17];
const polyfillList = [10, 11, 14, 15, 16, 17, 18];
const babelTest = [10, 11];
const shakeTest = [12, 13, 17, 18];

const findDistJs = (projPath: string) => glob.sync(path.resolve(projPath, 'dist/*.js'));

jest.retryTimes(1);

projPathList.forEach((p, i) => {
  if (!shouldTest(i)) return;

  const projName = path.basename(p);

  const myTest = (title: string, fn: Function) => {
    const fullTitle = `${title}: ${projName}`;

    test(fullTitle, () => {
      echo(`'\\033[0;34m---- ${fullTitle}\\033[0m'`);
      fn();
    });
  };

  describe(`proj: ${projName}`, () => {
    // * clear dist w/o npm
    cleanFolder(p);

    const cmds = i <= 3 ? testCmd.basic : testCmd.prod;
    cmds.forEach((c) =>
      myTest(`build test`, () => {
        execSync(`cd ${p}; yarn; ${c}`, { stdio: 'inherit' });
      }),
    );

    if (shakeTest.includes(i)) {
      myTest(`tree shaking check`, () => {
        findDistJs(p).forEach((e) => {
          const output = fs.readFileSync(e, 'utf8');
          expect(/\bDEADBEAF\b/.test(output)).toBe(false);
        });
      });
    }

    if (dynamicList.includes(i)) {
      myTest(`dynamic import check`, () => {
        expect(findDistJs(p).length).toBeGreaterThan(1);
      });
    }

    if (babelTest.includes(i)) {
      myTest(`babel build test`, () => {
        execSync(`cd ${p}; yarn; ${testCmd.babel}`);
      });
    }

    if (polyfillList.includes(i)) {
      myTest(`polyfill check`, () => {
        findDistJs(p).forEach((e) => {
          const output = fs.readFileSync(e, 'utf8');
          expect(/[^'"]\b(=>|await|yield)\b[^'"=]/.test(output)).toBe(false);
        });
      });
    }
  });
});

// * ================================================================================

const titleMap: Record<number, string> = {
  // * ---------------- basic

  0: 'demo/0-basic-single-js',
  1: 'demo/1-basic-with-html',
  2: 'demo/2-basic-dev-server-and-hot-reload',
  3: 'demo/3-basic-html-js-css',
  4: 'demo/4-webpack-chain',
  5: 'demo/5-refactor-config-with-ts',
  6: 'demo/6-more-style',
  7: 'demo/7-babel-basic',
  8: 'demo/8-minify-and-restructure-configs',
  9: 'demo/9-dynamic-import',

  // * ---------------- let's

  10: 'demo/10-webpack-babel-polyfill-basic',
  11: 'demo/11-polyfill-and-async',
  12: 'demo/12-tree-shaking',
  13: 'demo/13-milestone-with-polyfill',

  // * ---------------- framework

  14: 'demo/14-pack-image',
  15: 'demo/15-react',
  16: 'demo/16-vue',
  17: 'demo/17-milestone-with-framework',
};
