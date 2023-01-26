<script lang="ts">
	import ItemSelectBar from '$lib/components/ItemSelectBar.svelte';
	import { order, fulfilled } from '$stores';
	import { bossInfo } from '$stores/boss';
	import { calendarData, dayObj } from '$stores/calendar';
	import type { DayType } from '$stores/calendar';
	import type { ItemType, MapleDayType } from '$types';
	import { dragStart, dragDrop } from '$utils/calendar';
	import ItemDragBar from '$lib/components/ItemDragBar.svelte';

	let dayType: DayType = 'common';

	let selected: {
		day: MapleDayType;
		char: string | undefined;
	} = { day: 'x', char: undefined };

	let scrollY: number = 0;
	let innerWidth: number = 0;
	let innerHeight: number = 0;

	function getDayCharsArr(items: ItemType[]) {
		return $order
			.map((char) => {
				return items.filter((item) => item.char.name === char);
			})
			.filter((row) => row.length > 0);
	}

	function handleSelected(day: MapleDayType, char: string | undefined) {
		if (selected.day !== day || selected.char !== char) selected = { day, char };
		else selected = { day: 'x', char: undefined };
	}
</script>

<svelte:head>
	<title>일정 관리</title>
	<meta name="description" content="일정 관리" />
</svelte:head>

<svelte:window bind:scrollY bind:innerWidth bind:innerHeight />

<div
	class="flex flex-col md:flex-row gap-4"
	on:drop={(e) => dragDrop(e, 'x')}
	on:dragover={(e) => e.preventDefault()}
>
	<div class="p-4 xs:p-4 sm:p-8 w-full rounded-3xl bg-neutral-50">
		<span>총 {$fulfilled.filter((item) => item.day !== 'x').length}개</span>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4 ">
			{#each dayObj[dayType] as day}
				<div
					class="p-4 border rounded-3xl"
					on:drop={(e) => dragDrop(e, 'x')}
					on:dragover={(e) => e.preventDefault()}
				>
					<div class="pb-2 xs:pb-4 flex justify-between text-lg font-semibold">
						<span>{day}</span> <span>x{$calendarData[day].length}</span>
					</div>
					<div
						class="min-h-[60px] px-2 xs:px-4 flex flex-col justify-center gap-2 rounded-2xl"
						on:drop|stopPropagation={(e) => dragDrop(e, day)}
						on:dragover={(e) => e.preventDefault()}
					>
						{#if $calendarData[day].length > 0}
							{#each getDayCharsArr($calendarData[day]) as charArr}
								<div
									draggable="true"
									class="p-2 border rounded-xl hover:bg-neutral-300/30"
									on:click={() => handleSelected(day, charArr[0].char.name)}
									on:dragstart={(e) => dragStart(e, charArr)}
								>
									<div class="p-2 xs:px-4 flex justify-between">
										<span class="font-semibold">{charArr[0].char.name}</span>
										<span>x {charArr.length} </span>
									</div>
									{#if selected.day === day && selected.char === charArr[0].char.name}
										<div class="p-2 grid grid-cols-2 xs:grid-cols-3 md:grid-cols-2 gap-2 sm:gap-4">
											{#each charArr as item}
												<div
													draggable="true"
													class="aspect-square p-2 flex flex-col justify-end items-center border rounded-xl font-bold text-neutral-100"
													style={`background-image: url("${
														item.boss ? bossInfo[item.boss.name].image : ''
													}"); background-position: center; background-size: cover;`}
													on:dragstart|stopPropagation={(e) => dragStart(e, [item])}
												>
													<span class="text-sm drop-shadow-[0_0_5px_rgba(0,0,0,0.1)]">
														{item.boss?.name}
													</span>
													<span class="text-xs drop-shadow-[0_0_5px_rgba(0,0,0,0.1)]">
														{item.boss?.dc}
													</span>
												</div>
											{/each}
										</div>
									{/if}
								</div>
							{/each}
						{:else}
							<div class="py-4 flex justify-center items-center border rounded-3xl">
								<span class="font-semibold">일정이 없습니다</span>
							</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>

	{#if innerWidth < 1280}
		<ItemDragBar />
	{:else}
		<ItemSelectBar />
	{/if}
</div>
