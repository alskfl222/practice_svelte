<script lang="ts">
	import Title from './common/Title.svelte';
	import Checkbox from './common/Checkbox.svelte';
	import { fulfilled, charArr } from '$stores';
	import { bossInfo } from '$stores/boss';
	import { selectedItems } from '$stores/calendar';
	import {
		isCheckedChar,
		dragStart,
		resetSelected,
		handleCharCheckbox,
		getCounterIdx,
		isCheckedItem,
		handleItemCheckbox,
		getCharsData
	} from '$utils/calendar';

	let counterIdx: number | undefined = undefined;
	$: charsData = getCharsData($fulfilled, $charArr);
</script>

<div class="min-w-[270px] p-4 flex flex-col gap-2 bg-neutral-50">
	<Title type="s">보스 추가</Title>
	{#each charsData as charItemsArr, idx}
		<div
			class="p-2 border flex flex-col rounded-xl"
			on:click={() => (counterIdx = getCounterIdx(counterIdx, idx))}
		>
			<div class="p-2 flex justify-between items-center gap-2">
				<div class="flex items-center gap-2 xs:gap-4">
					<Checkbox
						checked={isCheckedChar($fulfilled, $selectedItems, charItemsArr)}
						indeterminate={!isCheckedChar($fulfilled, $selectedItems, charItemsArr) &&
							$selectedItems.filter((item) => item.char.name === charItemsArr[0].char.name).length >
								0}
						onClick={() =>
							handleCharCheckbox(
								isCheckedChar($fulfilled, $selectedItems, charItemsArr),
								charItemsArr[0].char.name
							)}
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
							on:click|stopPropagation={() => handleItemCheckbox(item)}
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
