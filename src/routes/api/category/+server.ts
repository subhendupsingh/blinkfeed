import { categories } from '$lib/db/schema';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals: { db }, platform}) => {
    try {
        const categoriez = await db.select().from(categories);
        return json(categoriez);
    } catch (error) {
        console.error(error);
        return json({ error: 'Failed to fetch categories' }, { status: 500 });
    }
};