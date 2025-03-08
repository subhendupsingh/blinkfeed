import type { ArticleWithRSSFeedAndCategory } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {
    const response = await fetch('/api/article');
    const articles = await response.json()
    if (!response.ok) {
        return {
            articles: []
        }
    }
    return {
        articles: articles as ArticleWithRSSFeedAndCategory[]
    };
}) satisfies PageServerLoad;