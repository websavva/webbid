import { resolve, join, isAbsolute, basename, dirname } from 'path';
import { readdir, readFile, ensureDir, writeFile } from 'fs-extra';
import { defu } from 'defu';
import { globSync } from 'glob';

import type {
  StaticNextConfig,
  DynamicNextConfig,
} from '../../../types/next-config';
import { MiddlewarePagesMap } from '../types';

export interface WithMiddlewareAggregatorOptions {
  middlewaresDir?: string;
  appDir?: string;
}

const DEFAULT_WITH_MIDDLEWARE_AGGREGATOR_OPTIONS: Required<WithMiddlewareAggregatorOptions> =
  {
    middlewaresDir: 'middlewares',
    appDir: 'app',
  };

const MIDDLEWARES_NAMEX_EXPORT_REGEX =
  /export\s+const\s+middlewares\s*=\s*(?<middlewareNames>\[\s*(?:'[^']+',?\s*)*\]);/;

export const withMiddlewareAggregator = (
  baseNextConfig: StaticNextConfig | DynamicNextConfig,
  options: WithMiddlewareAggregatorOptions = {},
) => {
  const nextConfigWithMiddlewareAggregator: DynamicNextConfig = async (
    phase,
    { defaultConfig },
  ) => {
    let derivedBaseNextConfig: StaticNextConfig;

    if (typeof baseNextConfig === 'function') {
      derivedBaseNextConfig = await baseNextConfig(phase, { defaultConfig });
    } else {
      derivedBaseNextConfig = baseNextConfig;
    }

    // making paths in options absolute
    const { appDir: absoluteAppDir, middlewaresDir: absoluteMiddlewaresDir } =
      Object.fromEntries(
        Object.entries(
          defu(options, DEFAULT_WITH_MIDDLEWARE_AGGREGATOR_OPTIONS),
        ).map(([dirName, dirPath]) => {
          return [
            dirName,
            isAbsolute(dirPath)
              ? dirPath
              : resolve(__dirname, '../../..', dirPath),
          ];
        }),
      );

    // reading all middleware files
    const middlewarePathsMap = await readdir(absoluteMiddlewaresDir).then(
      (fileNames) => {
        return Object.fromEntries(
          fileNames.map((fileName) => {
            const [middlewareName] = basename(fileName).split('.');

            return [middlewareName, join(absoluteMiddlewaresDir, fileName)];
          }),
        );
      },
    );

    const absoluteUtilsPath = resolve(__dirname, '../utils.ts');

    // ensuring dist directory
    const derivedDistDir =
      derivedBaseNextConfig.distDir || defaultConfig.distDir!;

    const derivedDistDirPath = resolve(__dirname, '../../../..', derivedDistDir);

    await ensureDir(derivedDistDirPath);

    // scanning usage of middlewares in each page
    const pagesPaths = globSync('**/page.tsx', {
      cwd: absoluteAppDir,
    });

    const middlewarePagesMapEntries = await Promise.all(
      pagesPaths.map(async (pagePath) => {
        const pageCode = await readFile(
          join(absoluteAppDir, pagePath),
          'utf-8',
        );

        if (!MIDDLEWARES_NAMEX_EXPORT_REGEX.test(pageCode)) return null;

        const { groups: { middlewareNames } = {} } = pageCode.match(
          MIDDLEWARES_NAMEX_EXPORT_REGEX,
        )!;

        const pageDirname = dirname(pagePath);

        const pagePathMatcher = `^\/${pageDirname
          .split('/')
          .filter((pathPart) => {
            return !(pathPart === '.' || /^\(.+\)$/.test(pathPart));
          })
          .map((pathPart) => {
            if (/^\[.+\]$/.test(pathPart)) return '[^\\\\/]+';

            return pathPart;
          })
          .join('/')}$`;

        return [pagePathMatcher, middlewareNames];
      }),
    );

    const middlewarePagesMap = Object.fromEntries(
      middlewarePagesMapEntries.filter((entry) => entry !== null),
    ) as MiddlewarePagesMap;

    // generating file with middleware aggregator
    const middlewareAggregatorFileContent = [
      `import { createMiddlewareAggregator } from '${absoluteUtilsPath}';`,

      ...Object.entries(middlewarePathsMap).map(
        ([middlewareName, middlewarePath]) => {
          return `import ${middlewareName} from '${middlewarePath}';`;
        },
      ),

      `const middlewaresMap = {${Object.keys(middlewarePathsMap)
        .map((middlewarName) => middlewarName)
        .join(',')}};`,

      `const middlwarePagesMap = ${JSON.stringify(middlewarePagesMap, null, 2)};`,

      `export const applyMiddlewareAggregator = createMiddlewareAggregator(middlwarePagesMap, middlewaresMap);`,
    ].join('\n');

    const middlewareAggregatorFilePath = join(
      derivedDistDir,
      'middleware-aggregator.js',
    );

    await writeFile(
      middlewareAggregatorFilePath,
      middlewareAggregatorFileContent,
      'utf8',
    );
  };

  return nextConfigWithMiddlewareAggregator;
};
