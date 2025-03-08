<script lang="ts">
	import { page } from '$app/state';
	import Seo from '$lib/components/common/seo.svelte';
	import Feed from '$lib/components/feed/feed.svelte';
	import { SITE_URL } from '$lib/helpers/constants';
	import { slugToTitle } from '$lib/utils';
    import type { PageProps } from './$types';

    let { data }: PageProps= $props();
    let articles = $derived(data.articles);
    let categorySlug = $derived(slugToTitle(page.params.slug));
</script>

<Seo data= {{
    title: `${categorySlug} Blogs - BlinkFeed`,
    description: `Read ${categorySlug} blogs from around the web on BlinkFeed`,
    ogImage: 'https://res.cloudinary.com/curead/image/upload/f_auto,q_100/v1741426993/Shootmail/og-image/blinkfeed-og-image_wntpi4.jpg',
    url: `${SITE_URL}/category/${page.params.slug}`
}} />

<Feed {articles} />

