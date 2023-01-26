<script lang="ts">
	import Title from './Title.svelte';
	import { fulfilled, charArr } from '$stores';
	import { bossInfo } from '$stores/boss';
	import { selectedItems } from '$stores/calendar';
	import { showModal, modalType } from '$stores/modal';
	import type { ItemType } from '$types';

	let counterIdx: number | undefined = undefined;

	function isCheckedChar(selected: ItemType[], charItemsArr: ItemType[]) {
		return (
			$fulfilled.filter((item) => item.char.name === charItemsArr[0].char.name).length ===
			selected.filter((item) => item.char.name === charItemsArr[0].char.name).length
		);
	}

	function dragStart(e: DragEvent, items: ItemType[]) {
		e.dataTransfer?.setData('text/plain', JSON.stringify(items));
	}

	function openModal() {
		$showModal = true;
		$modalType = 'ItemSelect';
	}

	function resetSelected() {
		$selectedItems = [];
		openModal();
	}

	function handleCharCheckbox(e: Event, selected: ItemType[], charName: string) {
		const el = e.target as HTMLInputElement;
		const charItems = $fulfilled.filter((item) => item.char.name === charName);
		selected = selected.filter((item) => item.char.name !== charName);
		if (el.checked) {
			selected = [...selected, ...charItems];
		}
		$selectedItems = selected;
	}

	function selectChar(idx: number) {
		if (counterIdx === undefined || counterIdx !== idx) counterIdx = idx;
		else counterIdx = undefined;
	}

	function isCheckedItem(selectedItems: ItemType[], item: ItemType) {
		return (
			selectedItems.filter(
				(exist) =>
					exist.char.name === item.char.name &&
					exist.boss?.name === item.boss?.name &&
					exist.boss?.dc === item.boss?.dc
			).length > 0
		);
	}

	function handleItemCheckbox(selected: ItemType[], item: ItemType) {
		if (!isCheckedItem(selected, item)) {
			selected = [...selected, item];
		} else {
			selected = selected.filter(
				(exist) =>
					!(
						exist.char.name === item.char.name &&
						exist.boss?.name === item.boss?.name &&
						exist.boss?.dc === item.boss?.dc
					)
			);
		}
		$selectedItems = selected;
	}

	$: charsData = $charArr
		.map((char) => {
			return $fulfilled.filter((item) => item.char.name === char.name);
		})
		.filter((arr) => arr.length > 0);
</script>

<div class="p-4 flex flex-col gap-2">
	<Title type="s">보스 추가</Title>
	{#each charsData as charItemsArr, idx}
		<div class="p-2 border flex flex-col rounded-xl" on:click={() => selectChar(idx)}>
			<div class="p-2 flex justify-between items-center gap-2">
				<div class="flex items-center gap-2 xs:gap-4">
					<input
						type="checkbox"
						class="appearance-none w-6 h-6 border-2 rounded-sm grid place-content-center"
						checked={isCheckedChar($selectedItems, charItemsArr)}
						indeterminate={!isCheckedChar($selectedItems, charItemsArr) &&
							$selectedItems.filter((item) => item.char.name === charItemsArr[0].char.name).length >
								0}
						on:click|stopPropagation={(e) =>
							handleCharCheckbox(e, $selectedItems, charItemsArr[0].char.name)}
					/><span class="text-lg font-bold">{charItemsArr[0].char.name}</span>
				</div>
				<span class="font-semibold">x {charItemsArr.length}</span>
			</div>
			{#if counterIdx === idx}
				<div class="mt-2 grid grid-cols-2 gap-2">
					{#each charItemsArr as item}
						<div
							class="w-full aspect-square p-2 flex justify-center items-end border-2 rounded-3xl"
							class:border-red-500={isCheckedItem($selectedItems, item)}
							style={`background-image: url("${
								item.boss ? bossInfo[item.boss.name].image : ''
							}"); background-position: center; background-size: cover;`}
							on:click|stopPropagation={() => handleItemCheckbox($selectedItems, item)}
						>
							<span class="font-bold text-neutral-100 drop-shadow-[0_0_5px_rgba(0,0,0,0.1)]">
								{item.boss?.dc}
							</span>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	{/each}
	<div class="w-full flex justify-center gap-4">
		{#if $selectedItems.length === 0}
			<div
				class="w-[72px] aspect-square px-4 py-2 flex justify-center items-center
             border rounded-lg border-neutral-700"
			>
				<i class="fa-solid fa-question" />
			</div>
			<div
				class="w-[72px] aspect-square px-4 py-2 flex justify-center items-center
           border rounded-lg border-neutral-300 bg-neutral-300"
			>
				<i class="fa-solid fa-rotate-right" />
			</div>
		{:else}
			<div
				draggable="true"
				class="w-[72px] aspect-square px-4 py-2 flex justify-center items-center
             border rounded-lg shadow"
				on:dragstart={(e) => dragStart(e, $selectedItems)}
			>
				<i class="fa-solid fa-user-check" />
			</div>
			<div
				class="w-[72px] aspect-square px-4 py-2 flex justify-center items-center
             border rounded-lg border-neutral-700 hover:bg-neutral-500/30"
				on:click={resetSelected}
			>
				<i class="fa-solid fa-rotate-right" />
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	input[type='checkbox']::before {
		content: '';
		width: 1rem;
		height: 1rem;
		transform: scale(0);
		box-shadow: inset 1em 1em rgba(0, 0, 0, 0.2);
	}

	input[type='checkbox']:indeterminate::before {
		transform: scale(0.9, 0.3);
		clip-path: none;
	}

	input[type='checkbox']:checked::before {
		transform: scale(1);
		clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
	}
</style>
