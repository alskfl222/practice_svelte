<script lang="ts">
	import type { BossDC, BossDCType, BossNameType, CharNameType, ItemType } from '$types';
	import { store, charIdx } from '$stores';
	import { data, char } from '$stores/item';
	import { bossInfo } from '$stores/boss';
	import { showModal, modalType } from '$stores/modal';
	import { sortItemsByDC } from '$utils';

	function openModal() {
		$showModal = true;
		$modalType = 'BossSelect';
	}

	function deleteItem(bossName: BossNameType, dc: BossDC) {
		$data = $data.filter(
			(item) =>
				!(item.char.name === $char.name && item.boss?.name === bossName && item.boss.dc === dc)
		);
	}

	function getBossArr(data: ItemType[], name: CharNameType) {
		console.log(data)
		const bossArr: ItemType[][] = [];
		Object.keys(bossInfo).forEach((boss) => {
			let items = data.filter((item) => item.char.name === name && item.boss?.name === boss);
			items = sortItemsByDC(items);
			if (items.length > 0) bossArr.push(items);
		});
		return bossArr;
	}
	// $: console.log($data);
	// $: console.log($char.name);
	$: bossArr = getBossArr($data, $char.name);
	$: console.log(bossArr);
</script>

{#if $char.name}
	<div class="my-4 flex flex-col">
		{#if bossArr.length !== 0}
			<div class="p-4 text-xl font-bold text-slate-700">
				총 {bossArr.length}종 {bossArr.flat().length}개
			</div>
		{/if}
		<button
			class="sm:mb-8 px-2 py-4 border rounded-2xl cursor-pointer text-2xl font-bold
					 hover:bg-gray-500/30 transition duration-100 ease-in-out"
			on:click={openModal}>보스 추가</button
		>
		{#if bossArr.length > 0}
			<div class="max-h-[400px] p-4 flex flex-col gap-2 sm:gap-6 overflow-x-hidden overflow-y-auto">
				{#each bossArr as items}
					<div class="relative flex-none w-full h-[120px]">
						<div class="w-full h-full flex flex-col sm:flex-row justify-between items-center">
							<div
								class="relative w-full h-full flex flex-col sm:flex-row
											 justify-center sm:justify-between items-center gap-2 rounded-3xl"
							>
								<img
									src={items[0].boss ? bossInfo[items[0].boss.name].image : ''}
									alt={items[0].boss?.name}
									class="absolute w-full h-full rounded-3xl object-cover"
								/>
								<div
									class="absolute w-full h-full bg-gradient-to-l from-white via-transparent to-transparent"
								/>
								<div
									class="sm:px-12 flex justify-center sm:justify-start sm:items-center
												 text-2xl sm:text-4xl text-white font-bold whitespace-pre break-word drop-shadow-xs"
								>
									{items[0].boss?.name}
								</div>
								<div class="flex flex-row sm:flex-col items-center gap-2 md:gap-4">
									{#each items as item}
										<div
											on:click={() => {
												if (item.boss) deleteItem(item.boss.name, item.boss.dc);
											}}
											class="z-10 px-2 py-2 xs:px-4 flex justify-center items-center gap-1
														 border-2 rounded-2xl bg-white cursor-pointer
													 hover:bg-gray-500/30 transition duration-100 ease-in-out"
											class:border-red-400={item.boss?.required}
										>
											<span class="text-xs xs:text-base font-bold">{item.boss?.dc}</span>
											<span class="text-xs xs:text-base whitespace-nowrap"
												>{item.boss?.headcount}인</span
											>
										</div>
									{/each}
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
{:else}
	<div class="mt-4 py-4 text-xl font-bold text-slate-700 overflow-hidden whitespace-nowrap">
		선택된 캐릭터가 없습니다
	</div>
{/if}
