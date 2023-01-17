<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let type: string;
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
	<div on:click={() => (show = !show)}>
		<slot />
	</div>
	{#if show}
		<ul
			class="z-10 w-[100%] max-h-[150px] absolute mt-2 py-2 border rounded-xl border-black bg-white overflow-y-auto"
		>
			{#each options as opt}
				<li
					class="relative h-[40px] px-4 flex items-center hover:bg-neutral-500 hover:text-white"
					on:click={() => selectOption(opt)}
				>
					{opt}
				</li>
			{/each}
		</ul>
	{/if}
</div>
