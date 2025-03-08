import { api } from '$lib/helpers/api';
import type { Article, ArticleWithRSSFeedAndCategory } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, fetch, depends }) => {
    const slug = params.slug;
    const response = await fetch(`/api/category/${slug}`);
    const data = await response.json();
    
    if(!response.ok){
        return { articles: [] };
    }

    return { articles: data as ArticleWithRSSFeedAndCategory[] };
}) satisfies PageServerLoad;