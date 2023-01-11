<script lang="ts">
	import { fly } from 'svelte/transition';

	import { store } from '$stores';
	import { mapleDayObj } from '$stores/calendar';
	import type { MapleDayType } from '$types';

	let isOpen: boolean = false;
	let selectedDay: MapleDayType | null = null;

	function onClickDay(idx: number) {
		isOpen = true;
		selectedDay = Object.keys($mapleDayObj)[idx] as MapleDayType;
	}

	function addCharToDay(char: string) {
		if (selectedDay) {
			let index = $mapleDayObj[selectedDay].indexOf(char);
			if (index < 0) {
				$mapleDayObj[selectedDay].push(char);
			} else {
				$mapleDayObj[selectedDay] = [
					...$mapleDayObj[selectedDay].slice(0, index),
					...$mapleDayObj[selectedDay].slice(index + 1)
				];
			}
			$mapleDayObj = $mapleDayObj;
		}
	}
</script>

<div class="px-2 flex flex-col gap-8 lg:flex-row" on:click|self={() => (isOpen = false)}>
	{#each Object.entries($mapleDayObj) as entry, idx}
		<div
			class="w-full h-[160px] p-2 border-2 rounded-2xl bg-white"
			class:border-slate-500={entry[0] === selectedDay}
			on:click|stopPropagation={() => onClickDay(idx)}
		>
			{entry[0]}
			<div class="h-[120px] overflow-x-hidden overflow-y-scroll">
				{#each entry[1] as char}
					<div>{char}</div>
				{/each}
			</div>
		</div>
	{/each}
	{#if isOpen}
		<div class="fixed bottom-0 inset-x-0 z-50 h-[35%] mx-4 pb-8 bg-white" in:fly>
			<button on:click={() => (isOpen = false)}><i class="fa-solid fa-xmark" /></button>
			<div class="h-full overflow-x-hidden overflow-y-scroll">
				{#each $store as char}
					<div class="text-2xl" on:click={() => addCharToDay(char.name)}>{char.name}</div>
				{/each}
			</div>
		</div>
	{/if}
</div>
