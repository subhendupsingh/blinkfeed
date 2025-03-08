<script lang='ts'>
    import type { ArticleWithRSSFeedAndCategory } from '$lib/types';
    import * as Card from '$lib/components/ui/card';
	import { formatDate, isEmptyString } from '$lib/utils';
	import Avatar from './avatar.svelte';
    let { articleWithRSSFeedAndCategory } : { articleWithRSSFeedAndCategory: ArticleWithRSSFeedAndCategory } = $props();
    
    let article = $derived(articleWithRSSFeedAndCategory.articles);
    let rssFeed = $derived(articleWithRSSFeedAndCategory.rss_feeds);
    let category = $derived(articleWithRSSFeedAndCategory.categories);

    let coverImage = $derived(isEmptyString(article.ogImage) ? rssFeed.favicon : article.ogImage);
</script>

<Card.Root class="hover:border-primary">
    <Card.Content class="h-full flex flex-col">
        <a href={article.link} target="_blank" class="h-full flex flex-col">
            <img src={coverImage} alt={article.title} class="w-full h-full max-h-48 object-contain rounded-sm" />
            <div class="flex flex-col gap-2 mt-6 mb-6">
                <h3 class="line-clamp-2">{article.title}</h3>
                <p class="line-clamp-5">{article.summary}</p>
            </div>
            <div class="flex items-center gap-2 mt-auto">
                {#if rssFeed.favicon}
                    <Avatar image={rssFeed.favicon} name={rssFeed.blogName} />
                {/if}
                <div class="flex flex-col items-start gap-1">
                    <span class="text-muted-foreground text-xs">{rssFeed.blogName}</span>
                    <span class="text-muted-foreground text-xs">{formatDate(article.pubDate)}</span>
                </div>
            </div>
        </a>
    </Card.Content>
</Card.Root>