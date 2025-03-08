<script lang="ts">
	import { page } from '$app/state';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { dashboardTitle } from '$lib/stores/index.svelte';
	import { onMount } from 'svelte';
	import { menuLinks } from '../menu/menu-links';
	import type { Category } from '$lib/types';
	import { api } from '$lib/helpers/api';
	import { toast } from '$lib/utils';

    let categories: Category[] = $state([]);
    const fetchCategoriesWithArticles = async () => {
        const response = await api.get<Category[]>('/category/with-articles');
        
        if(response.data){
            console.log(response.data);
            categories = response.data;
        }

        if(response.error){
            toast(response.error, 'error');
        }
    };

    onMount(() => {
        fetchCategoriesWithArticles();
    });
</script>

<Sidebar.Root>
	<Sidebar.Header>
        <a href="/" class="font-bold tracking-wide px-4 py-2 text-2xl font-sans">Blinkfeed.</a>
    </Sidebar.Header>
	<Sidebar.Content>
		<Sidebar.Group />
            <Sidebar.GroupContent>
                <Sidebar.Menu>
                    {#each menuLinks as item (item.name)}
                        <Sidebar.MenuItem class="py-2 px-6">
                            <Sidebar.MenuButton onclick={() => dashboardTitle.title = item.name} isActive={item.url === page.url.pathname}>
                                {#snippet child({ props })}
                                    <a href={item.url} {...props} class="text-sm hover:text-primary">
                                        <span>{item.name}</span>
                                    </a>
                                {/snippet}
                            </Sidebar.MenuButton>
                        </Sidebar.MenuItem>
                    {/each}
                </Sidebar.Menu>
            </Sidebar.GroupContent>
            <Sidebar.Group>
                <Sidebar.GroupLabel>Categories</Sidebar.GroupLabel>
                <Sidebar.GroupContent>
                    <Sidebar.Menu>
                        {#each categories as category}
                            <Sidebar.MenuItem class="py-2 px-6">
                                <Sidebar.MenuButton onclick={() => dashboardTitle.title = category.name} isActive={"/category/"+category.slug === page.url.pathname}>
                                    {#snippet child({ props })}
                                        <a href={`/category/${category.slug}`} {...props} class="text-sm hover:text-primary">
                                            <span>{category.name}</span>
                                        </a>
                                    {/snippet}
                                </Sidebar.MenuButton>
                            </Sidebar.MenuItem>
                        {/each}
                    </Sidebar.Menu>
                </Sidebar.GroupContent>
            </Sidebar.Group>
		<Sidebar.Group />
	</Sidebar.Content>
	<Sidebar.Footer />
</Sidebar.Root>

<style lang="postcss">
    [data-active="true"] {
        @apply text-indigo-400;
    }
</style>
