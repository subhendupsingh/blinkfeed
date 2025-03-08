<script lang='ts'>
	import Seo from "$lib/components/common/seo.svelte";
	import Feed from "$lib/components/feed/feed.svelte";
	import { SITE_URL } from "$lib/helpers/constants";
	import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
    let articles = $state(data.articles);
</script>

<Seo data= {{
    title: 'Read mind-blowing blogs on technology, web-development, and more at one place - BlinkFeed',
    description: 'Read mind-blowing blogs on technology, web-development, and more from around the web on BlinkFeed. Including from the individual blogs',
    ogImage: 'https://res.cloudinary.com/curead/image/upload/f_auto,q_100/v1741426993/Shootmail/og-image/blinkfeed-og-image_wntpi4.jpg',
    url: SITE_URL
}} />

<Feed {articles} />
