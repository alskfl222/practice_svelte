<script lang="ts">
	import BossSelector from './BossSelector.svelte';
	import Summary from './Summary.svelte';

	import { charIndex } from '$stores';
</script>

<div class="min-w-[200px] flex flex-col">
	{#if $charIndex !== undefined}
		<BossSelector />
	{:else}
		<Summary />
	{/if}
</div>
