import path from 'path';
import glob from 'glob';
import { execSync } from 'child_process';

const projs = glob.sync(path.resolve(__dirname, '../../demo/{0,1,2,3,4,5,6,7,8}-*'));

const commands = Object.values({
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
}).map((cmds, i) => cmds.map((e) => e.replace(/^/, `cd ${projs[i]}; yarn; `)));

describe(`run build`, () => {
  commands.forEach((cmds) => {
    cmds.forEach((c) => {
      test(c, () => {
        execSync(c);
      });
    });
  });
});
