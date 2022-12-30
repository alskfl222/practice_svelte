<script lang="ts">
	import { fly } from 'svelte/transition';
	import BossSelector from './BossSelector.svelte';
	import Summary from './Summary.svelte';
	import { charIndex } from '$stores';
</script>

<div
	class="fixed bottom-0 inset-x-0 mx-12 drop-shadow-[0_0_10px_rgba(0,0,0,0.1)]
				 xl:relative xl:w-[240px] xl:mx-0"
	transition:fly
>
	{#if $charIndex !== undefined}
		<BossSelector />
	{:else}
		<Summary />
	{/if}
</div>
