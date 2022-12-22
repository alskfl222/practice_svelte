<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let type: string;
	export let value: string;
	export let options: string[];

	const dispatch = createEventDispatcher();

	let show = false;
	let container: HTMLDivElement;

	function selectOption(opt: string) {
		dispatch(type, opt);
		show = false;
	}

	function onDropdownClick(e: MouseEvent) {
		if (container.contains(e.target as HTMLElement) == false) show = false;
	}
</script>

<svelte:window on:click={onDropdownClick} />

<div class="relative" bind:this={container}>
	<div class='relative px-2 py-1 border border-1 border-black bg-white z-1' on:click={() => (show = !show)}>{value ? value : '선택해주세요'}</div>
	{#if show}
		<ul class="w-[100%] absolute border border-1 border-t-0 border-black bg-white z-10">
			{#each options as opt}
				<li class='relative px-2 py-1 hover:bg-slate-500 hover:text-white' on:click={() => selectOption(opt)}>{opt}</li>
			{/each}
		</ul>
	{/if}
</div>
