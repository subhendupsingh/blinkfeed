<script lang='ts'>
    let { image, name } : { image: string, name?: string | null } = $props();
</script>

<img src={image} alt={name ? name +"'s profile picture" : 'profile picture'} class="size-10 rounded-full" />