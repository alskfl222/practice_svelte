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

<div class="relative border" bind:this={container}>
	<div class='p-2 border border-1 border-black bg-white' on:click={() => (show = !show)}>{value ? value : '선택해주세요'}</div>
	{#if show}
		<ul class="w-[100%] absolute border border-1 border-t-0 border-black bg-white">
			{#each options as opt}
				<li class='p-2 hover:bg-slate-500' on:click={() => selectOption(opt)}>{opt}</li>
			{/each}
		</ul>
	{/if}
</div>
