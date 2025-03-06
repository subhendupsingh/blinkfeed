import { subcategories } from '$lib/db/schema';
import { dbError } from '$lib/helpers/errors';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { eq } from "drizzle-orm";

export const GET: RequestHandler = async ({ locals: { db }, params }) => {
    try {
        const subcategoriez = await db.select().from(subcategories).where(eq(subcategories.categoryId, Number(params.id)));
        return json(subcategoriez);
    } catch (error) {
        return dbError(error);
    }
};