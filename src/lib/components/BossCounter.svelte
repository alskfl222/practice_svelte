<script lang="ts">
	import Title from './common/Title.svelte';
	import Hbar from './common/Hbar.svelte';
	import { data, char, charArr } from '$stores';
	import { bossInfo, maxBossCount } from '$stores/boss';
	import type { CharNameType, ItemType } from '$types';
	import { sortDataByPrice, getBossPrice, getCharBossPrice } from '$utils';

	let container: HTMLElement;
	let counterIdx: number | undefined = undefined;

	function selectBoss(e: MouseEvent) {
		const el = e.target as HTMLElement;
		if (el.getAttribute('data-index')) {
			const idx = parseInt(el.getAttribute('data-index')!);
			if (counterIdx === undefined || counterIdx !== idx) {
				counterIdx = idx;
				return;
			}
		}
		counterIdx = undefined;
	}

	function selectChar(name: CharNameType) {
		const selected = $charArr.filter((char) => char.name === name)[0];
		$char = { ...selected };
		window.scrollTo(0, 270);
	}

	function hasRequired(items: ItemType[]) {
		for (let i = 0; i < items.length; i++) {
			if (items[i].boss?.required) return true;
		}
		return false;
	}

	function isExceed(item: ItemType) {
		const arr = sortedData.flat();
		const idx = arr.findIndex(
			(el) =>
				el.char.name === item.char.name &&
				el.boss &&
				item.boss &&
				el.boss.name === item.boss.name &&
				el.boss.dc == item.boss.dc
		);
		return idx + 1 > maxBossCount ? true : false;
	}

	function isBossExceed(items: ItemType[]) {
		return items.every(isExceed);
	}

	$: sortedData = sortDataByPrice($data);
</script>

<section
	class="max-h-[600px] p-8 pt-4 flex flex-col rounded-3xl bg-white dark:bg-neutral-600"
	bind:this={container}
	on:click={(e) => selectBoss(e)}
>
	<Title>보스별 정리</Title>
	<Hbar />
	{#if sortedData.length > 0}
		<div class="py-8 flex flex-col gap-9 overflow-x-hidden overflow-y-auto">
			{#each sortedData as boss, idx}
				<div class="flex-none w-full flex flex-col">
					<div
						class="relative w-full h-[120px] flex flex-col justify-center gap-2 rounded-2xl shadow overflow-hidden"
						class:rounded-b-none={idx === counterIdx}
						class:opacity-50={isBossExceed(boss)}
						data-index={idx}
					>
						<img
							src={boss[0].boss ? bossInfo[boss[0].boss.name].image : ''}
							alt="boss img"
							class="absolute w-full h-full object-cover"
						/>
						<div
							class="absolute w-full h-full px-4 flex flex-col pt-4
								 sm:bg-gradient-to-l sm:from-white sm:via-transparent sm:to-transparent
								 text-white font-bold xs:px-8 sm:px-12 sm:pt-0 sm:flex-row sm:justify-start sm:items-center sm:gap-6"
							data-index={idx}
						>
							<span
								class="text-lg drop-shadow-xs whitespace-nowrap xs:text-2xl sm:text-3xl"
								data-index={idx}>{boss[0].boss?.name}</span
							>
							<span class="drop-shadow-xs xs:text-xl sm:text-2xl" data-index={idx}
								>{boss[0].boss?.dc}</span
							>
						</div>
						<div
							class="absolute bottom-2 right-0 mx-2 px-2 py-1 flex justify-center items-center gap-2 border-2 rounded-2xl bg-white text-indigo-500
									 xs:gap-0 sm:flex-col sm:top-0 sm:bottom-0 sm:right-2 sm:my-4"
							class:border-red-700={hasRequired(boss)}
						>
							<span
								class="text-sm font-bold drop-shadow-[0_0_10px_rgba(255,255,255,1)] xs:px-2 xs:text-base"
								data-index={idx}>{`X ${boss.length}`}</span
							>
							<span class="text-sm xs:px-2 xs:text-base" data-index={idx}
								>{getBossPrice(boss).toLocaleString()} 원</span
							>
						</div>
					</div>
					{#if idx === counterIdx}
						<div
							class="grow p-4 flex flex-col justify-between items-center gap-2 rounded-b-2xl shadow dark:bg-neutral-100"
						>
							<div
								class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2"
							>
								{#each boss as item}
									<div
										class="w-full px-4 py-2 flex flex-col justify-between items-center gap-2 
												 border rounded-xl shadow cursor-pointer hover:bg-gray-500/30
												 transition duration-100 ease-in-out"
										class:border-red-400={item.boss?.required}
										class:opacity-50={isExceed(item)}
										on:click={() => selectChar(item.char.name)}
									>
										<div class="w-full flex justify-center items-center gap-2">
											<span class="max-w-[40%] overflow-hidden whitespace-nowrap text-ellipsis"
												>{item.char.name}</span
											>
											<span class="inline xs:hidden whitespace-nowrap"
												>{item.boss?.headcount}인</span
											>
										</div>

										<div class="flex items-center gap-2">
											<span class="hidden xs:inline whitespace-nowrap"
												>{item.boss?.headcount}인</span
											>
											<span class="whitespace-nowrap">
												{item.boss
													? getCharBossPrice(
															item.boss.name,
															item.boss.dc,
															item.boss.headcount
													  ).toLocaleString()
													: '-'}원
											</span>
										</div>
									</div>
								{/each}
							</div>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{:else}
		<div
			class="h-[100px] flex flex-col justify-center items-center text-xl font-bold text-neutral-700 dark:text-neutral-200"
		>
			<p>아직 추가된</p>
			<p>보스가 없습니다</p>
		</div>
	{/if}
</section>
