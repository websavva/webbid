import { resolve, join, isAbsolute, basename, dirname } from 'path';
import { readdir, readFile, ensureDir, writeFile } from 'fs-extra';
import { defu } from 'defu';
import { globSync } from 'glob';

import type {
  StaticNextConfig,
} from '../../../types/next-config';
import { MiddlewarePagesMap } from '../runtime/types';

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

export interface MiddlewareAggregatorBuilderOptions {
  middlewaresDir?: string;
  appDir?: string;
}

export class MiddlewareAggregatorBuilder {
  private options: Required<MiddlewareAggregatorBuilderOptions>;

  constructor(options: MiddlewareAggregatorBuilderOptions = {}) {
    this.options = this.normalizeOptions(options);
  }

  private normalizeOptions(options: MiddlewareAggregatorBuilderOptions) {
    return Object.fromEntries(
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
    ) as Required<MiddlewareAggregatorBuilderOptions>;
  }

  private scanMiddlewares() {
    const { middlewaresDir: absoluteMiddlewaresDir } = this.options;

    return readdir(absoluteMiddlewaresDir).then((fileNames) => {
      return Object.fromEntries(
        fileNames.map((fileName) => {
          const [middlewareName] = basename(fileName).split('.');

          return [middlewareName, join(absoluteMiddlewaresDir, fileName)];
        }),
      );
    });
  }

  private async scanPages() {
    const { appDir: absoluteAppDir } = this.options;

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

    return middlewarePagesMap;
  }

  private async generateFile() {
    const middlewarePathsMap = await this.scanMiddlewares();
    const middlewarePagesMap = await this.scanPages();

    const absoluteUtilsPath = resolve(__dirname, '../runtime/utils.ts');

    // ensuring dist directory
    const derivedDistDirPath = resolve(__dirname, '../../../../dist');

    await ensureDir(derivedDistDirPath);

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

      `const middlwarePagesMap = {${Object.entries(middlewarePagesMap)
        .map(
          ([pagePathMatcher, pageMiddlwareNames]) =>
            `"${pagePathMatcher}": ${pageMiddlwareNames}`,
        )
        .join(',\n')}};`,

      `export const applyMiddlewareAggregator = createMiddlewareAggregator(middlwarePagesMap, middlewaresMap);`,
    ].join('\n');

    const middlewareAggregatorFilePath = join(
      derivedDistDirPath,
      'middleware-aggregator.js',
    );

    await writeFile(
      middlewareAggregatorFilePath,
      middlewareAggregatorFileContent,
      'utf8',
    );

    return middlewareAggregatorFilePath;
  }

  public async run(nextConfig: StaticNextConfig) {
    const middlewareAggregatorFilePath = await this.generateFile();

    return defu(
      {
        webpack(defaultConfig, ctx) {
          const derivedConfig =
            nextConfig.webpack?.(defaultConfig, ctx) || defaultConfig;

          return defu(
            {
              resolve: {
                alias: {
                  '#middleware-aggregator': middlewareAggregatorFilePath,
                },
              },
            },
            derivedConfig,
          );
        },
      },
      nextConfig,
    ) as StaticNextConfig;
  }

  static async run(
    options: MiddlewareAggregatorBuilderOptions,
    nextConfig: StaticNextConfig,
  ) {
    const builder = new this(options);

    return builder.run(nextConfig);
  }
}
