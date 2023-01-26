<script lang="ts">
	import { data, order, fulfilled } from '$stores';
	import { bossInfo } from '$stores/boss';
	import { calendarData, selectedItems } from '$stores/calendar';
	import { showModal, modalType } from '$stores/modal';
	import type { ItemType, MapleDayType } from '$types';
	import { fly } from 'svelte/transition';

	type DayType = 'common' | 'maple';
	const dayObj: {
		[key in DayType]: MapleDayType[];
	} = {
		common: ['일', '월', '화', '수', '목', '금', '토'],
		maple: ['목', '금', '토', '일', '월', '화', '수']
	};
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

	function openModal() {
		$showModal = true;
		$modalType = 'ItemSelect';
	}

	function dragStart(e: DragEvent, items: ItemType[]) {
		e.dataTransfer?.setData('text/plain', JSON.stringify(items));
	}

	function dragDrop(e: DragEvent, day: MapleDayType) {
		const dragData = e.dataTransfer?.getData('text/plain') as string;
		const items = JSON.parse(dragData) as ItemType[];

		if (items && items.length > 0) {
			items.forEach((item) => {
				const char = item.char.name;
				const boss = item.boss?.name;
				const dc = item.boss?.dc;

				if (
					$data.filter(
						(item) =>
							char === item.char.name &&
							boss === item.boss?.name &&
							dc === item.boss?.dc &&
							item.day === day
					).length === 0
				) {
					$data.push({ ...item, day });
					$data = $data.filter(
						(item) =>
							!(
								char === item.char.name &&
								boss === item.boss?.name &&
								dc === item.boss?.dc &&
								item.day !== day
							)
					);
				}
			});

			localStorage.setItem('prev', JSON.stringify($data));
			$selectedItems = [];
		}
	}
</script>

<svelte:head>
	<title>일정 관리</title>
	<meta name="description" content="일정 관리" />
</svelte:head>

<svelte:window bind:scrollY bind:innerWidth bind:innerHeight />

<div
	class="p-2 xs:p-4 grid grid-cols-1 gap-4 rounded-3xl bg-neutral-50"
	on:drop={(e) => dragDrop(e, 'x')}
	on:dragover={(e) => e.preventDefault()}
>
	<span>총 {$fulfilled.filter(item => item.day !== 'x').length}개</span>
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
								<div class="p-2 grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-4">
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
				{:else}<div class="pb-4 flex justify-center items-center">
						<span class="font-semibold">일정이 없습니다</span>
					</div>
				{/if}
			</div>
		</div>
	{/each}
	{#if innerWidth < 1280 && scrollY + innerHeight < document.body.scrollHeight - 10}
		<div
			class="fixed z-40 bottom-0 inset-x-0 max-h-[160px] mx-4 p-4 flex justify-center items-center
						 gap-16 sm:gap-24 md:gap-30 bg-white drop-shadow-[0_0_5px_rgba(0,0,0,0.1)]"
			transition:fly
		>
			{#if $selectedItems.length === 0}
				<div
					class="w-[20%] max-w-[128px] aspect-square px-4 py-2 flex justify-center items-center
								 border rounded-lg border-neutral-700"
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
					class="w-[20%] max-w-[128px] aspect-square px-4 py-2 flex justify-center items-center
								 border rounded-lg shadow"
					on:dragstart={(e) => dragStart(e, $selectedItems)}
				>
					<i class="fa-solid fa-user-check" />
				</div>
				<div
					class="w-[15%] max-w-[84px] aspect-square px-4 py-2 flex justify-center items-center
								 border rounded-lg border-neutral-700 hover:bg-neutral-500/30"
					on:click={() => {
						$selectedItems = [];
						openModal();
					}}
				>
					<i class="fa-solid fa-rotate-right" />
				</div>
			{/if}
		</div>
	{/if}
</div>
