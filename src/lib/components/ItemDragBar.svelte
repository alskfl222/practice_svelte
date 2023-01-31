<script lang="ts">
	import { fade } from 'svelte/transition';
	import { selectedItems } from '$stores/calendar';
	import {
		openModal,
		dragStart,
		touchStart,
		touchMove,
		touchEnd,
		resetSelected
	} from '$utils/calendar';

	let scrollY: number = 0;
	let innerWidth: number = 0;
	let innerHeight: number = 0;
</script>

<svelte:window bind:scrollY bind:innerWidth bind:innerHeight />

<div
	class="fixed z-40 bottom-0 inset-x-0 max-h-[160px] mx-12 p-4 pb-6 flex justify-evenly sm:justify-center items-center
       gap-4 rounded-t-3xl sm:gap-12 md:gap-24 bg-white dark:bg-neutral-300 drop-shadow-[0_0_5px_rgba(0,0,0,0.1)]"
	class:hidden={scrollY + innerHeight > document.body.scrollHeight - 10}
	in:fade
>
	{#if innerWidth >= 360}
		<span class="text-lg sm:text-2xl font-bold">보스 추가</span>
	{/if}
	{#if $selectedItems.length === 0}
		<div
			class="w-[15%] max-w-[84px] aspect-square px-4 py-2 flex justify-center items-center
           border rounded-lg border-neutral-700 hover:bg-neutral-500/30"
			on:click={openModal}
		>
			<i class="fa-solid fa-question" />
		</div>
		<div
			class="w-[15%] max-w-[84px] aspect-square px-4 py-2 flex justify-center items-center
         border rounded-lg border-neutral-300 bg-neutral-300"
		>
			<i class="fa-solid fa-rotate-right" />
		</div>
	{:else}
		<div
			draggable="true"
			class="w-[15%] max-w-[84px] aspect-square px-4 py-2 flex justify-center items-center
           border rounded-lg shadow cursor-move"
			on:click={openModal}
			on:dragstart={(e) => dragStart(e, $selectedItems)}
			on:touchstart={(e) => touchStart(e, $selectedItems)}
			on:touchmove={(e) => touchMove(e)}
			on:touchend={(e) => touchEnd(e)}
		>
			<i class="fa-solid fa-user-check" />
		</div>
		<div
			class="w-[15%] max-w-[84px] aspect-square px-4 py-2 flex justify-center items-center
           border rounded-lg border-neutral-700 hover:bg-neutral-500/30"
			on:click={resetSelected}
		>
			<i class="fa-solid fa-rotate-right" />
		</div>
	{/if}
</div>

<style>
	div {
		-webkit-touch-callout: none;
		-ms-touch-action: none;
		touch-action: none;
	}
</style>
