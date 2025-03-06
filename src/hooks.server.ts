import { DB_TOKEN, DB_URL } from '$env/static/private';
import type { Bindings, DB } from '$lib/types/bindings';
import type { Handle } from '@sveltejs/kit';
import { drizzle } from 'drizzle-orm/libsql/web';

// Initialize database connection
const initDb = async (env: Bindings | undefined) => {
    if(!env) throw new Error('Bindings not found');
    
    const db: DB = drizzle({ connection: {
        url: DB_URL, 
        authToken: DB_TOKEN
    }});

    return db;
}

export const handle: Handle = async ({ event, resolve }) => {
    const db = await initDb(event.platform?.env);
    event.locals.db = db;
	const response = await resolve(event);
	return response;
};