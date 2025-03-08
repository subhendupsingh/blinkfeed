import { articles, categories, rssFeeds } from '$lib/db/schema';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { eq } from 'drizzle-orm';
import type { ArticleWithRSSFeedAndCategory } from '$lib/types';

export const GET: RequestHandler = async ({ locals: { db }, params }) => {
    try {
        const response: ArticleWithRSSFeedAndCategory[] = await db.select().from(articles)
        .innerJoin(rssFeeds, eq(articles.rssFeedId, rssFeeds.id))
        .innerJoin(categories, eq(rssFeeds.categoryId, categories.id))
        .where(eq(categories.slug, params.slug));
        return json(response);
    } catch (error) {
        console.error(error);
        return json({ error: 'Failed to fetch articles' }, { status: 500 });
    }
};