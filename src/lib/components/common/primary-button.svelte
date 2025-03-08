<script lang="ts">
	import { Button } from "../ui/button";
    import type { ButtonProps } from "../ui/button";
	import Spinner from "./spinner.svelte";

    let { class: className, loading = $bindable(false), ...restProps }: ButtonProps & { loading?: boolean } = $props();
</script>

<Button class={className} {...restProps}>
    {#if loading}
        <Spinner />
    {:else}
        {@render restProps.children?.()}
    {/if}
</Button>