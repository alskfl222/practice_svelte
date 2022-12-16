<script lang="ts">
	import BossSelector from '$lib/components/BossSelector.svelte';
	import Summary from '$lib/components/Summary.svelte';

	import { charIndex } from '../../stores';
</script>

<div class="min-w-[240px] border p-4">
	{#if $charIndex !== undefined}
		<BossSelector />
	{:else}
		<Summary />
	{/if}
</div>
