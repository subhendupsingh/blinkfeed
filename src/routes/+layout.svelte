<script lang="ts">
	import '@fontsource/inter/400.css';
	import '@fontsource/inter/500.css';
	import '@fontsource/inter/600.css';
	import '@fontsource/inter/700.css';
	import Menu from '$lib/components/menu/menu.svelte';
	import { ModeWatcher } from "mode-watcher";
	import '../app.css';
	import { Toaster } from 'svelte-5-french-toast'
	let { children } = $props();
</script>

<ModeWatcher defaultMode="system" />
<Menu />
<Toaster />

<main class="max-w-5xl mx-auto px-6 2xl:px-0 py-6">
	{@render children()}
</main>
