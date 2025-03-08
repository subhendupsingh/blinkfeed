import { categories, subcategories } from '$lib/db/schema';
import { dbError } from '$lib/helpers/errors';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import slugify from "slugify";
import type { BatchItem } from 'drizzle-orm/batch';
import { isTuple } from '$lib/helpers/parsers';

export const POST: RequestHandler = async ({ locals: { db }, request }) => {
    try {
        const { category, subcategory } = await request.json() as { category: string; subcategory: string };
        
        if(!category){
            return json({ success: false, message: 'Please enter category name' }, { status: 400 });
        }

        console.log({ category, subcategory });

        const queries: BatchItem<"sqlite">[] = [];

        if(category){
            const categorySlug = slugify(category, { lower: true });
            queries.push(db.insert(categories).values({ name: category, slug: categorySlug, status: 'pending' }));
        }

        if(subcategory){
            const subcategorySlug = slugify(subcategory, { lower: true });
            queries.push(db.insert(subcategories).values({ name: subcategory, slug: subcategorySlug, categoryId: 1, status: 'pending' }));
        }
        
        if(queries?.length>0 && isTuple(queries)){
            const response = await db.batch(queries)
            return json({ success: true, response });
        }
        
        return json({ success: false, message: 'Failed to add category or subcategory' }, { status: 400 });

    } catch (error) {
        return dbError(error);
    }
};