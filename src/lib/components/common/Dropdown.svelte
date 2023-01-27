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

<div class="relative self-center w-full max-w-[240px]" bind:this={container}>
	{#if show}
		<ul
			class="absolute top-1 z-10 w-[100%] max-h-[150px] mt-2 py-2 border rounded-xl
			 border-neutral-700 dark:border-white bg-white dark:bg-neutral-500 overflow-y-auto"
		>
			{#each options as opt}
				<li
					class="relative h-[40px] px-4 flex items-center hover:bg-neutral-500 hover:dark:bg-neutral-200
						 hover:text-white dark:text-white hover:dark:text-neutral-700"
					on:click={() => selectOption(opt)}
				>
					{opt}
				</li>
			{/each}
		</ul>
	{/if}
	<div class="p-2 flex justify-center border rounded-xl border-neutral-700" on:click={() => (show = !show)}>
		<slot />
	</div>
</div>
