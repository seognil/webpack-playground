import path from 'path';
import fs from 'fs';
import glob from 'glob';

// * ================================================================================

const rootDir = path.resolve(__dirname, '..');

// * ---------------- find all demos

const numMatch = (p: string): RegExpMatchArray | null => p.match(/(?<=demo\/)\d+(?=[-])/);

const numOf = (p: string): number => Number(numMatch(p)![0]);

const demos: string[] = glob
  .sync(path.resolve(rootDir, 'demo/*'))
  .filter((e) => numMatch(e) !== null)
  .sort((a, b) => numOf(a) - numOf(b));

// * ----------------

const readmePathOf = (p: string): string => path.resolve(p, 'readme.md');

const hasReadme = (p: string): boolean => fs.existsSync(readmePathOf(p));

const readmeList: string[] = demos
  .filter((p) => hasReadme(p))
  .map((p) => {
    const relPath = path.relative(rootDir, p);
    const readmeText = fs.readFileSync(readmePathOf(p), 'utf8');
    const title = readmeText.match(/(?<=(^#\s)).*(?=\n)/)![0];
    return `- [${title}](${relPath})`;
  });

const noReadmeList: string[] = demos
  .filter((p) => !hasReadme(p))
  .map((p) => {
    const relPath = path.relative(rootDir, p);
    const folder = path.basename(p);
    return `- [${folder}](${relPath})`;
  });

const mdList = (noReadmeList.length
  ? [...readmeList, '\n_还没写文档的_\n', ...noReadmeList]
  : [...readmeList]
).join('\n');

// * ================================================================================

const readmePath = path.resolve(rootDir, 'readme.md');
const readme = fs.readFileSync(readmePath, 'utf8');

const result = readme.replace(
  /<!-- demo start -->(.|\n)*<!-- demo end -->/,
  `<!-- demo start -->

${mdList}

<!-- demo end -->`,
);

fs.writeFileSync(readmePath, result);
