<script lang="ts">
	import BossSelector from '$lib/components/BossSelector.svelte';
	import Summary from '$lib/components/Summary.svelte';

	import { charIndex } from '$stores';
</script>

<div class="min-w-[200px] flex flex-col">
	{#if $charIndex !== undefined}
		<BossSelector />
	{:else}
		<Summary />
	{/if}
</div>
