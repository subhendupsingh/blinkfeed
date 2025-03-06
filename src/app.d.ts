import { KVNamespace, DurableObjectNamespace, MessageBatch } from '@cloudflare/workers-types';
import type { Bindings, DB } from '$lib/types/bindings';

declare global {
	namespace App {
        interface Platform {
            env: Bindings
            cf: CfProperties
            ctx: ExecutionContext
            batch: MessageBatch
        }

        interface Locals {
            db: DB
        }
    }
}

export {};