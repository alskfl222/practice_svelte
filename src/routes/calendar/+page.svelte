<script lang="ts">
	import { fly, fade } from 'svelte/transition';

	import Title from '$lib/components/common/Title.svelte';
	import Hbar from '$lib/components/common/Hbar.svelte';

	import { store } from '$stores';
	import { mapleDayObj } from '$stores/calendar';
	import type { MapleDayType } from '$types';

	let isCharListOpen: boolean = false;
	let selectedDay: MapleDayType | null = null;

	function onClickDay(idx: number) {
		isCharListOpen = true;
		selectedDay = Object.keys($mapleDayObj)[idx] as MapleDayType;
	}

	function addCharToDay(char: string) {
		if (selectedDay) {
			let index = $mapleDayObj[selectedDay].indexOf(char);
			if (index < 0) {
				const nameArr = $store.map((char) => char.name);
				$mapleDayObj[selectedDay].push(char);
				$mapleDayObj[selectedDay].sort((a, b) => nameArr.indexOf(a) - nameArr.indexOf(b));
			} else {
				$mapleDayObj[selectedDay] = [
					...$mapleDayObj[selectedDay].slice(0, index),
					...$mapleDayObj[selectedDay].slice(index + 1)
				];
			}
			localStorage.setItem('dayObj', JSON.stringify($mapleDayObj));
			$mapleDayObj = $mapleDayObj;
		}
	}
</script>

<div
	class="h-full px-2 pt-4 pb-[120px] rounded-2xl bg-white"
	on:click={() => (isCharListOpen = false)}
	in:fade
>
	<Title>주간 일정</Title>
	<div class="px-4 grid gap-4 lg:grid-cols-7">
		{#each Object.entries($mapleDayObj) as entry, idx}
			<div
				class="w-full h-[160px] p-4 flex flex-col justify-between gap-2 border-2 rounded-2xl bg-white shadow lg:h-[270px]"
				class:border-slate-500={entry[0] === selectedDay}
				on:click|stopPropagation={() => onClickDay(idx)}
			>
				<div class="flex justify-between items-center lg:flex-col lg:items-start">
					<span class='text-2xl'>{entry[0]}</span><span>{entry[1].length} 캐릭터</span>
				</div>
				<div class="w-full h-[80%] overflow-y-auto">
					{#each entry[1] as char}
						<div class="whitespace-nowrap text-ellipsis overflow-x-hidden">{char}</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
	{#if isCharListOpen}
		<div
			class="fixed bottom-0 inset-x-0 z-30 h-[35%] mx-4 px-12 pt-4 pb-16 rounded-t-2xl bg-white shadow-[0_1px_3px_-1px_rgba(0,0,0,1)] lg:mx-0"
			on:click|stopPropagation={() => (isCharListOpen = true)}
			in:fly
		>
			<div class="w-full mb-2 flex justify-center">
				<button
					class="w-full text-lg font-bold hover:bg-slate-300/30"
					on:click={() => (isCharListOpen = false)}>닫기 <i class="fa-solid fa-xmark" /></button
				>
			</div>
			<Hbar />
			<div class="h-full mt-4 flex flex-col gap-2 overflow-x-hidden overflow-y-scroll">
				{#each $store as char}
					<div class="text-2xl hover:bg-slate-300/30" on:click={() => addCharToDay(char.name)}>
						{char.name}
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>
