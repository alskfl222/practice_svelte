<script lang="ts">
	import { data } from '$stores';
	import { calendarData, selectedItems } from '$stores/calendar';
	import { showModal, modalType } from '$stores/modal';
	import type { ItemType, MapleDayType } from '$types';

	type DayType = 'common' | 'maple';
	const dayObj: {
		[key in DayType]: MapleDayType[];
	} = {
		common: ['일', '월', '화', '수', '목', '금', '토'],
		maple: ['목', '금', '토', '일', '월', '화', '수']
	};
	let dayType: DayType = 'common';

	let scrollY: number = 0;
	let innerWidth: number = 0;
	let innerHeight: number = 0;

	function openModal() {
		$showModal = true;
		$modalType = 'ItemSelect';
	}

	function dragStart(e: DragEvent, items: ItemType[]) {
		e.dataTransfer?.setData('text/plain', JSON.stringify(items));
	}

	function dragEnter(e: DragEvent) {
		const el = e.target as HTMLElement;
		el.classList.add('bg-neutral-500/30');
	}

	function dragLeave(e: DragEvent) {
		const el = e.target as HTMLElement;
		el.classList.remove('bg-neutral-500/30');
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

		const container = e.currentTarget as HTMLElement;
		container.classList.remove('bg-neutral-500/30');
	}
</script>

<svelte:head>
	<title>일정 관리</title>
	<meta name="description" content="일정 관리" />
</svelte:head>

<svelte:window bind:scrollY bind:innerWidth bind:innerHeight />

<div class="grid grid-cols-1 gap-2">
	{#each dayObj[dayType] as day}
		<div class="p-2 bg-neutral-100">
			<div>{day}</div>
			<div
				class="min-h-[60px] p-2 grid grid-cols-1 gap-2 border rounded hover:bg-neutral-300/30"
				on:dragenter={dragEnter}
				on:dragleave={dragLeave}
				on:drop={(e) => dragDrop(e, day)}
				on:dragover={(e) => e.preventDefault()}
			>
				{#each $calendarData[day] as item}
					<div
						draggable="true"
						class="p-2 border rounded"
						on:dragstart={(e) => dragStart(e, [item])}
					>
						<div>{item.char.name}</div>
						<div>
							{item.boss?.name} - {item.boss?.dc}
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/each}
	{#if innerWidth < 1280 && scrollY + innerHeight < document.body.scrollHeight - 10}
		<div
			class="fixed z-40 bottom-0 inset-x-0 max-h-[160px] mx-4 p-4 flex justify-center items-center
						 gap-16 sm:gap-24 md:gap-30 bg-white drop-shadow-[0_0_5px_rgba(0,0,0,0.1)]"
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
							 border rounded-lg border-neutral-500 bg-neutral-500"
				>
					<i class="fa-solid fa-rotate-right" />
				</div>
			{:else}
				<div
					draggable="true"
					class="w-[20%] max-w-[128px] aspect-square px-4 py-2 flex justify-center items-center
								 border rounded-lg shadow"
					on:dragstart={(e) => dragStart(e, $selectedItems)}
				><i class="fa-solid fa-user-check"></i></div>
				<div
					class="w-[15%] max-w-[84px] aspect-square px-4 py-2 flex justify-center items-center
								 border rounded-lg border-neutral-700 hover:bg-neutral-500/30"
					on:click={openModal}
				>
					<i class="fa-solid fa-rotate-right" />
				</div>
			{/if}
		</div>
	{/if}
</div>
