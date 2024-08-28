import { findExports } from 'mlly';
import { readFile } from 'fs-extra';
import { globSync} from 'glob';
import { dirname } from 'path';

// export const MIDDLEWARES_NAMEX_EXPORT_REGEX =
//   /\bexport\s+(?<declaration>(async function\s*\*?|function\s*\*?|let|const enum|const|enum|var|class))\s+\*?(?<name>[\w$]+)(?<extraNames>.*,\s*[\s\w:[\]{}]*[\w$\]}]+)*/g;

export const MIDDLEWARES_NAMEX_EXPORT_REGEX =
  /export\s+const\s+middlewares\s*=\s*(?<middlewareNamesArray>\[\s*(?:'[^']+',?\s*)+\]);/;

async function main() {
  const matchers = globSync('**/page.tsx', {
    cwd: '/Users/websavva/coding/self/projects/webbid/src/app',
  }).map((filePath) => {
    const pageDirname = dirname(filePath);

    return `^\/${pageDirname.split('/').filter(pathPart => {
      return !(pathPart === '.' || /^\(.+\)$/.test(pathPart))
    }).map(pathPart => {
      if (/^\[.+\]$/.test(pathPart)) return '[^\\\\\/]+';

      return pathPart
    }).join('\/')}$`
  });


  console.log(matchers)

}

main();
