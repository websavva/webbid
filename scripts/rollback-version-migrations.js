const { resolve, join } = require('path');

require('dotenv').config({
  path: join(process.cwd(), `.env.build`),
});
require('dotenv').config();

const swcRegister = require('@swc/register');
const payload = require('payload');
const {
  migrationTableExists,
} = require('@payloadcms/db-postgres/dist/utilities/migrationTableExists');
const {
  parseError,
} = require('@payloadcms/db-postgres/dist/utilities/parseError');
const {
  commitTransaction,
} = require('payload/dist/utilities/commitTransaction');
const { initTransaction } = require('payload/dist/utilities/initTransaction');
const { killTransaction } = require('payload/dist/utilities/killTransaction');
const {
  prettySyncLoggerDestination,
} = require('payload/dist/utilities/logger');

const tsConfig = require('../tsconfig.json');

swcRegister({
  ignore: [
    /.*[\\/]node_modules[\\/].*/, // parse everything besides files within node_modules
  ],
  jsc: {
    baseUrl: resolve(tsConfig.compilerOptions.baseUrl),
    paths: tsConfig.compilerOptions.paths,
    parser: {
      syntax: 'typescript',
      tsx: true,
    },
    paths: undefined,
  },
  module: {
    type: 'commonjs',
  },
  sourceMaps: 'inline',
});

const [_, _1, fromVersion, toVersion] = process.argv;

const prettySyncLogger = {
  loggerDestination: prettySyncLoggerDestination,
  loggerOptions: {},
};

class MigrationRollbackManager {
  constructor(fromVersion, toVersion) {
    this.fromVersion = fromVersion;
    this.toVersion = toVersion;
  }

  getAbsoluteMigrationFilePath(name) {
    return resolve(__dirname, `../src/server/migrations/${name}.ts`);
  }

  diffMigrations() {}

  parseMigrationName(name) {
    const [dateString, timestamp] = name.split('_');

    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 7);
    const day = dateString.slice(7, 10);

    return {
      date: new Date(year, month, day),
      timestamp: +timestamp,
    };
  }

  isMigrationNewer(leftMigrationName, rightMigrationName) {
    const parsedLeftMigrationName = this.parseMigrationName(leftMigrationName);
    const parsedRightMigrationName =
      this.parseMigrationName(rightMigrationName);

    return parsedLeftMigrationName.date === parsedRightMigrationName.date
      ? parsedLeftMigrationName.timestamp > parsedRightMigrationName.timestamp
      : parsedLeftMigrationName.date > parsedRightMigrationName.date;
  }

  async fetchMigrations(version) {
    const allMigrationRelatedFiles = await fetch(
      `https://api.github.com/repos/websavva/webbid/contents/src/server/migrations?ref=v${version}`,
      {
        headers: {
          'User-Agent': 'Node.js',
          Accept: 'application/vnd.github.v3+json',
          'X-GitHub-Api-Version': '2022-11-28',
          Host: 'api.github.com',
        },
      },
    ).then((response) => response.json());

    const migrationFileScripts = allMigrationRelatedFiles
      .filter(({ name, type }) => {
        return type === 'file' && name.endsWith('.ts');
      })
      .map(({ name }) => name.replace(/\.ts$/, ''));

    migrationFileScripts.sort((leftMigrationName, rightMigrationName) => {
      return this.isMigrationNewer(leftMigrationName, rightMigrationName)
        ? 1
        : -1;
    });

    return migrationFileScripts;
  }

  readMigrations(migrationNames) {
    return migrationNames.map((name) => {
      return {
        ...require(this.getAbsoluteMigrationFilePath(name)),
        name,
      };
    });
  }

  diffMigrations(fromMigrations, toMigrations) {
    return fromMigrations.filter((fromMigrationName) => {
      return !toMigrations.includes(fromMigrationName);
    });
  }

  async prepare() {
    process.env.PAYLOAD_MIGRATING = 'true';

    // Barebones instance to access database adapter
    await payload.init({
      disableOnInit: true,
      local: true,
      secret: process.env.PAYLOAD_SECRET || '--unused--',
      ...prettySyncLogger,
    });

    const adapter = payload.db;

    if (!adapter) {
      throw new Error('No database adapter found');
    }

    this.adapter = adapter;
  }

  doesMigrationExist(name) {
    return this.adapter
      .findOne({
        collection: 'payload-migrations',
        where: {
          name: {
            equals: name,
          },
        },
        req: {
          payload: this.adapter.payload,
        },
      })
      .then((migration) => Boolean(migration));
  }

  async runMigrations(migrations) {
    const { payload, drizzle } = this.adapter;

    payload.logger.info({
      msg: `Rolling back rollback batch consisting of ${migrations.length} migration(s).`,
    });

    for (const migration of migrations) {
      const start = Date.now();
      const req = { payload };

      if (!(await this.doesMigrationExist(migration.name))) {
        payload.logger.info({
          msg: `Skipping migration as it has been rollbacked already: ${migration.name}`,
        });
        continue;
      }

      try {
        payload.logger.info({ msg: `Migrating down: ${migration.name}` });

        await initTransaction(req);
        await migration.down({ payload, req });

        payload.logger.info({
          msg: `Migrated down:  ${migration.name} (${Date.now() - start}ms)`,
        });

        const tableExists = await migrationTableExists(drizzle);

        if (tableExists) {
          await payload.delete({
            collection: 'payload-migrations',
            where: {
              name: {
                equals: migration.name,
              },
            },
            req,
          });
        }

        debugger;
        await commitTransaction(req);
        debugger;
      } catch (err) {
        await killTransaction(req);

        payload.logger.error({
          err,
          msg: parseError(
            err,
            `Error migrating down ${migration.name}. Rolling back.`,
          ),
        });
        process.exit(1);
      }
    }
  }

  async rollback() {
    await this.prepare();

    const fromMigrationNames = await this.fetchMigrations(this.fromVersion);
    const toMigrationNames = await this.fetchMigrations(this.toVersion);

    const rollbackMigrationNames = this.diffMigrations(
      fromMigrationNames,
      toMigrationNames,
    );

    if (!rollbackMigrationNames.length) {
      this.adapter.payload.logger.info({
        msg: 'No migrations are required for rollback.',
      });

      process.exit(0);
    }

    const rollbackMigrations = this.readMigrations(rollbackMigrationNames);

    await this.runMigrations(rollbackMigrations);

    process.exit(0);
  }

  static run(fromTag, toVersion) {
    return new this(fromTag, toVersion).rollback();
  }
}

if (!fromVersion || !toVersion) {
  throw new Error('Both versions are required !');
}

MigrationRollbackManager.run(fromVersion, toVersion);
