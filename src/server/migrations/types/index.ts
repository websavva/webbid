import type {
  MigrateUpArgs as _MigrateUpArgs,
  MigrateDownArgs as _MigrateDownArgs,
} from '@payloadcms/db-postgres';
import type { PayloadRequest } from 'payload/types';

export type MigrateUpArgs = Omit<_MigrateUpArgs, 'req'> & {
  req: PayloadRequest;
};

export type MigrateDownArgs = Omit<_MigrateDownArgs, 'req'> & {
  req: PayloadRequest;
};
