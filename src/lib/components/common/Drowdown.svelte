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
	<div on:click={() => (show = !show)}>{value ? value : '선택해주세요'}</div>
	{#if show}
		<ul class="absolute">
			{#each options as opt}
				<div on:click={() => selectOption(opt)}>{opt}</div>
			{/each}
		</ul>
	{/if}
</div>
