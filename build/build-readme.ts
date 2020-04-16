import path from 'path';
import fs from 'fs';
import glob from 'glob';

// * ================================================================================

const rootDir = path.resolve(__dirname, '..');

const numMatch = (p: string) => p.match(/(?<=demo\/)\d+(?=[-])/);

const numOf = (p: string) => Number(numMatch(p)![0]);

const projs = glob
  .sync(path.resolve(rootDir, 'demo/*'))
  .filter((e) => numMatch(e) !== null)
  .sort((a, b) => numOf(a) - numOf(b));

const readmeAbsPaths = projs.map((p) => path.resolve(p, 'readme.md'));

const readmeRelPaths = readmeAbsPaths.map((p) => path.relative(rootDir, p));

const titles = readmeAbsPaths.map(
  (p) => fs.readFileSync(p, 'utf8').match(/(?<=(^#\s)).*(?=\n)/)![0],
);

const makeMarkdown = titles.map((e, i) => `- [${e}](${readmeRelPaths[i]})`);

// * ================================================================================

const readmePath = path.resolve(rootDir, 'readme.md');
const readme = fs.readFileSync(readmePath, 'utf8');

const result = readme.replace(
  /<!-- demo start -->(.|\n)*<!-- demo end -->/,
  `<!-- demo start -->
${makeMarkdown.join('\n')}
<!-- demo end -->`,
);

fs.writeFileSync(readmePath, result);
