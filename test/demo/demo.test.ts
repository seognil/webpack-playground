import path from 'path';
import glob from 'glob';
import { execSync } from 'child_process';

const numMatch = (p: string) => p.match(/(?<=demo\/)\d+(?=[-])/);

const numOf = (p: string) => Number(numMatch(p)![0]);

const projs = glob
  .sync(path.resolve(__dirname, '../../demo/*'))
  .filter((e) => numMatch(e) !== null)
  .sort((a, b) => numOf(a) - numOf(b));

const commands = Object.entries({
  //
  0: [`yarn build; yarn test`],
  1: [`yarn build; yarn test`],
  2: [`yarn build; yarn test`],
  3: [`yarn build; yarn test`],
  4: [`yarn build; yarn test`, `yarn build:dev; yarn test`],
  5: [`yarn build; yarn test`, `yarn build:dev; yarn test`],
  6: [`yarn build; yarn test`, `yarn build:dev; yarn test`],
  7: [`yarn build; yarn test`, `yarn build:dev; yarn test`],
  8: [`yarn build; yarn test`, `yarn build:dev; yarn test`],
  9: [`yarn build; yarn test`, `yarn build:dev; yarn test`],
  //
  10: [`yarn build; yarn test`, `yarn build:dev; yarn test`, `yarn build:babel; yarn test:babel`],
  11: [`yarn build; yarn test`, `yarn build:dev; yarn test`, `yarn build:babel; yarn test:babel`],
  12: [`yarn build; yarn test`, `yarn build:dev; yarn test`],
  //
  13: [`yarn build; yarn test`, `yarn build:dev; yarn test`],
}).map(([i, cmds]) => cmds.map((e) => e.replace(/^/, `cd ${projs[Number(i)]}; yarn; `)));

jest.retryTimes(0);

describe(`run build`, () => {
  commands.forEach((cmds) => {
    cmds.forEach((c) => {
      test(c, () => {
        execSync(c, { stdio: 'inherit' });
      });
    });
  });
});
