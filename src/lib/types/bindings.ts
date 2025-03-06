import * as schema from '$lib/server/db/schema';
import type { Queue } from '@cloudflare/workers-types';
import type { LibSQLDatabase } from 'drizzle-orm/libsql';

export type Bindings = {
    KV: KVNamespace,
    DB_URL: string,
    DB_TOKEN: string,
    Q: Queue
}

export type DB = LibSQLDatabase<typeof schema>