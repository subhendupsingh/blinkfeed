<script lang='ts'>
	import type { Snippet } from "svelte";
	import { dashboardTitle } from "$lib/stores/index.svelte";
    let { children }: { children: Snippet } = $props();
</script>

<header>
    <nav>
        <div class="flex items-center gap-4">
            {@render children?.()}
            <h1 class="text-lg font-semibold">{dashboardTitle.title}</h1>
        </div>
        <a href="https://github.com/subhendupsingh/blinkfeed" target="_blank"><img src="/github.svg" class="size-5 ml-auto" alt=""></a>
    </nav>
</header>

<style lang="postcss">
    header {
        @apply w-full bg-background py-2 px-4 border-b border-border flex flex-1 sticky top-0;
    }

    nav {
        @apply w-full bg-background py-2 flex items-center justify-between gap-4;
    }
</style>