<script lang="ts">
	import { store, Report, charIdx, counterIndex } from '$stores';
	import { data } from '$stores/item';
	import { bossInfo, maxBossCount } from '$stores/boss';
	import type {
		BossDC,
		BossItemType,
		BossNameType,
		BossReportType,
		CharNameType,
		HeadcountType,
		ItemType,
		SortReportItemType
	} from '$types';
	import { dataSortByPrice, reportSortByPrice } from '$utils';
	import Title from './common/Title.svelte';
	import Hbar from './common/Hbar.svelte';

	let container: HTMLElement;

	function selectBoss(e: MouseEvent) {
		const el = e.target as HTMLElement;
		if (el.getAttribute('data-index')) {
			const idx = parseInt(el.getAttribute('data-index')!);
			if ($counterIndex === undefined || $counterIndex !== idx) {
				$counterIndex = idx;
				return;
			}
		}
		$counterIndex = undefined;
	}

	function getCharBossPrice(name: BossNameType, dc: BossDC, headcount: HeadcountType) {
		if (bossInfo[name] && bossInfo[name].dc[dc]) {
			return Math.floor(bossInfo[name].dc[dc]! / headcount);
		}
		return 0;
	}

	// function getABossPrice(report: BossReportType, idx: number) {
	// 	const aBossReport = reportSortByPrice(report)[idx];
	// 	const [crystalPrice, charArr] = [aBossReport[2], aBossReport[3]];
	// 	let price = 0;
	// 	charArr.forEach((char) => {
	// 		const headcount = char[2];
	// 		price += Math.floor(crystalPrice / headcount);
	// 	});
	// 	return price;
	// }

	function getBossPrice(items: ItemType[]) {
		let price = 0;
		items.forEach((item) => {
			const boss = item.boss as BossItemType;
			price += getCharBossPrice(boss.name, boss.dc, boss.headcount);
		});
		return price;
	}

	function selectChar(name: CharNameType) {
		const nameArr = $store.map((char) => char.name);
		$charIdx = nameArr.indexOf(name);
		window.scrollTo(0, 90);
	}

	function hasRequired(item: SortReportItemType) {
		const dcArr = item[3];
		for (let i = 0; i < dcArr.length; i++) {
			if (dcArr[i][3]) return true;
		}
		return false;
	}

	$: sortedData = dataSortByPrice($data);
</script>

<section
	class="max-h-[600px] p-8 pt-4 flex flex-col rounded-3xl bg-white"
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
						class:rounded-b-none={idx === $counterIndex}
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
						>
							<span
								class="text-sm font-bold drop-shadow-[0_0_10px_rgba(255,255,255,1)] xs:px-2 xs:text-base"
								data-index={idx}>{`X ${boss.length}`}</span
							>
							<span class="text-sm xs:px-2 xs:text-base" data-index={idx}
								>{getBossPrice(boss)} 원</span
							>
						</div>
					</div>
					{#if idx === $counterIndex}
						<div
							class="grow p-4 flex flex-col justify-between items-center gap-2 rounded-b-2xl shadow"
						>
							<div
								class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2"
							>
								{#each boss as item}
									<div
										class="w-full px-4 py-2 flex sm:flex-col justify-between sm:items-center gap-2 
												 border rounded-xl shadow cursor-pointer hover:bg-gray-500/30
												 transition duration-100 ease-in-out"
										class:border-red-400={item.boss?.required}
									>
										<span class="max-w-[40%] overflow-hidden whitespace-nowrap text-ellipsis"
											>{item.char.name}</span
										>

										<div class="flex items-center gap-2">
											<span class="hidden xs:inline whitespace-nowrap"
												>{item.boss?.headcount}인</span
											>
											<span class="whitespace-nowrap">
												{item.boss
													? getCharBossPrice(item.boss.name, item.boss.dc, item.boss.headcount)
													: '??'}원
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
			class="h-[100px] flex flex-col justify-center items-center text-xl font-bold text-slate-700"
		>
			<p>아직 추가된</p>
			<p>보스가 없습니다</p>
		</div>
	{/if}
</section>
