import { subcategories } from '$lib/db/schema';
import { dbError } from '$lib/helpers/errors';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { eq, and } from "drizzle-orm";

export const GET: RequestHandler = async ({ locals: { db }, params, url }) => {
    try {
        const categoryId = Number(url.searchParams.get('categoryId'));
        const subcategoriez = await db.select().from(subcategories).where(and(eq(subcategories.categoryId, categoryId), eq(subcategories.status, 'approved')));
        return json(subcategoriez);
    } catch (error) {
        return dbError(error);
    }
};