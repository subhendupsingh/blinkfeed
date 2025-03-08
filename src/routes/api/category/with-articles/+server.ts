import { articles, categories, rssFeeds } from '$lib/db/schema';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { eq } from 'drizzle-orm';
import { asc } from 'drizzle-orm';

export const GET: RequestHandler = async ({ locals: { db } }) => {
    try {
        const result = await db
        .selectDistinct({
            id: categories.id,
            name: categories.name,
            slug: categories.slug
        })
        .from(categories)
        .innerJoin(rssFeeds, eq(categories.id, rssFeeds.categoryId))
        .innerJoin(articles, eq(rssFeeds.id, articles.rssFeedId))
        .orderBy(asc(categories.name));

        return json(result);
    } catch (error) {
        console.error(error);
        return json({ error: 'Failed to fetch categories' }, { status: 500 });
    }
};