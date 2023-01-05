<script lang="ts">
	import { fade } from 'svelte/transition';
	import Summary from './Summary.svelte';

	let scrollY: number = 0;
	let innerWidth: number = 0;
	let innerHeight: number = 0;
</script>

<svelte:window bind:scrollY bind:innerWidth bind:innerHeight />

{#if scrollY + innerHeight < document.body.scrollHeight - 10}
	<div
		class="fixed bottom-0 inset-x-0 mx-12 drop-shadow-[0_0_10px_rgba(0,0,0,0.1)]
				 	 xl:relative xl:grow-0 xl:w-[240px] xl:mx-0"
		in:fade
	>
		<Summary />
	</div>
{/if}
