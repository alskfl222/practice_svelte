<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let type: string;
	export let options: string[];

	const dispatch = createEventDispatcher();

	let show = false;
	let container: HTMLDivElement;
	const headerBaseStyle =
		'relative h-[40px] px-4 flex items-center border border-black bg-white z-1';

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
	<div
		class={show
			? headerBaseStyle + ' rounded-t-xl border-b-slate-300'
			: headerBaseStyle + ' rounded-xl'}
		on:click={() => (show = !show)}
	>
		<slot />
	</div>
	{#if show}
		<ul class="w-[100%] absolute border border-t-0 rounded-b-xl border-black bg-white z-10">
			{#each options as opt}
				<li
					class="relative h-[36px] px-4 flex items-center hover:bg-slate-500 hover:text-white"
					on:click={() => selectOption(opt)}
				>
					{opt}
				</li>
			{/each}
		</ul>
	{/if}
</div>
