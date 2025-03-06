<script lang='ts'>
	import { page } from "$app/state";
	import { menuLinks } from "./menu-links";
</script>

<header>
    <nav>
        <a href="/" class="font-bold tracking-wide">Blinkfeed.</a>
        <ul>
            {#each menuLinks as link}
                <li>
                    <a class:active={page.url.pathname === link.url} href={link.url}>{link.name}</a>
                </li>
            {/each}
        </ul>
    </nav>
</header>

<style lang="postcss">
    header {
        @apply w-full bg-background py-2 px-4 border-b border-border flex items-center;
    }

    nav {
        @apply w-full bg-background py-2 flex items-center max-w-7xl mx-auto;
    }

    ul {
        @apply flex items-center gap-5 w-fit ml-auto;
    }

    li {
        @apply h-full;
    }

    li a {
        @apply h-full flex items-center text-sm text-foreground;
    }

    li a:hover {
        @apply text-primary;
    }

    .active {
        @apply text-primary;
    }
</style>