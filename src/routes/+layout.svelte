<script lang="ts">
	import '@fontsource/inter/400.css';
	import '@fontsource/inter/500.css';
	import '@fontsource/inter/600.css';
	import '@fontsource/inter/700.css';
	import Menu from '$lib/components/menu/menu.svelte';
	import { ModeWatcher } from "mode-watcher";
	import '../app.css';
	import { Toaster } from 'svelte-5-french-toast'
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import AppSidebar from '$lib/components/common/app-sidebar.svelte';
	let { children } = $props();
</script>

<ModeWatcher defaultMode="system" />
<Toaster />

<Sidebar.Provider>
	<AppSidebar />
	<main class="w-full">
		<Menu>
			<Sidebar.Trigger />
		</Menu>
	  
		<div class="px-8 py-8 max-w-7xl mx-auto">
			{@render children?.()}
		</div>
	</main>
</Sidebar.Provider>

<!-- <main class="max-w-5xl mx-auto px-6 2xl:px-0 py-6">
	{@render children()}
</main> -->
