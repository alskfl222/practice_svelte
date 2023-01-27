<script lang="ts">
	import Checkbox from '../common/Checkbox.svelte';
	import { fulfilled, charArr } from '$stores';
	import { bossInfo } from '$stores/boss';
	import { selectedItems } from '$stores/calendar';
	import { showModal } from '$stores/modal';
	import {
		isCheckedChar,
		handleCharCheckbox,
		getCounterIdx,
		isCheckedItem,
		handleItemCheckbox,
		getCharsData
	} from '$utils/calendar';

	let counterIdx: number | undefined = undefined;
	$: charsData = getCharsData($fulfilled, $charArr);
</script>

<div
	class="w-[70vw] max-w-[900px] h-[80vh] p-2 xs:p-4 sm:p-8 flex flex-col items-center gap-2 xs:gap-4
				 rounded-2xl bg-white dark:bg-neutral-500 dark:text-neutral-100"
>
	<button
		class="w-[70%] mb-2 p-2 border rounded-3xl hover:bg-neutral-500/30 hover:dark:bg-neutral-200/30
					 text-lg sm:text-xl font-semibold"
		on:click={() => ($showModal = false)}
	>
		닫기
	</button>
	{#each charsData as charItemsArr, idx}
		<div
			class="w-full p-2 sm:p-4 md:p-6 border flex flex-col rounded-3xl hover:dark:bg-neutral-200/30 cursor-pointer"
			on:click={() => (counterIdx = getCounterIdx(counterIdx, idx))}
		>
			<div class="p-2 flex justify-between items-center gap-2 ">
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
					/>
					<span class="text-lg sm:text-xl font-bold">{charItemsArr[0].char.name}</span>
				</div>
				<span class="sm:text-lg font-semibold">x {charItemsArr.length}</span>
			</div>
			{#if counterIdx === idx}
				<div class="mt-2 grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-2">
					{#each charItemsArr as item}
						<div
							class="w-full aspect-square p-2 flex justify-center items-end border-2 rounded-3xl"
							class:border-red-500={isCheckedItem($selectedItems, item)}
							style={`background-image: url("${
								item.boss ? bossInfo[item.boss.name].image : ''
							}"); background-position: center; background-size: cover;`}
							on:click|stopPropagation={() => handleItemCheckbox(item)}
						>
							<span class="font-bold text-neutral-100 drop-shadow-[0_0_3px_rgba(0,0,0,0.1)]">
								{item.boss?.dc}
							</span>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	{/each}
</div>
