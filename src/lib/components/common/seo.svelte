<script lang='ts'>
    export let data : {
        title: string;
        description: string;
        ogImage: string;
        url: string;
    };
</script>

<svelte:head>
    <!-- Primary Meta Tags -->
    <title>{data.title}</title>
    <meta name="title" content={data.title} />
    <meta name="description" content={data.description} />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content={data.url} />
    <meta property="og:title" content={data.title} />
    <meta property="og:description" content={data.description} />
    <meta property="og:image" content={data.ogImage} />
 
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content={data.url} />
    <meta property="twitter:title" content={data.title} />
    <meta property="twitter:description" content={data.description} />
    <meta property="twitter:image" content={data.ogImage} />

    <link rel="canonical" href={data.url} />
</svelte:head>