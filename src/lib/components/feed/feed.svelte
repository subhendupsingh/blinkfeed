<script lang='ts'>
    import type { ArticleWithRSSFeedAndCategory } from '$lib/types';
	import FeedItem from './feed-item.svelte';
    let { articles } : { articles: ArticleWithRSSFeedAndCategory[]} = $props();
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each articles as article}
        <FeedItem articleWithRSSFeedAndCategory={article} />
    {/each}
</div>