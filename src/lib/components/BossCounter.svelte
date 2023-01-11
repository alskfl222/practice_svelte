<script lang="ts">
	import { store, Report, charIndex, counterIndex } from '$stores';
	import { bossInfo, maxBossCount } from '$stores/boss';
	import type { CharNameType, SortReportItemType } from '$types';
	import { reportSortByPrice } from '$utils';
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

	function getABossPrice(idx: number) {
		const aBossReport = data[idx];
		const [crystalPrice, charArr] = [aBossReport[2], aBossReport[3]];
		let price = 0;
		charArr.forEach((char) => {
			const headcount = char[2];
			price += Math.floor(crystalPrice / headcount);
		});
		return price;
	}

	function selectChar(name: CharNameType) {
		const nameArr = $store.map((char) => char.name);
		$charIndex = nameArr.indexOf(name);
		window.scrollTo(0, 90);
	}

	function hasRequired(item: SortReportItemType) {
		const dcArr = item[3];
		for (let i = 0; i < dcArr.length; i++) {
			if (dcArr[i][3]) return true;
		}
		return false;
	}

	$: data = reportSortByPrice($Report);
</script>

<section
	class="max-h-[600px] px-8 pb-8 flex flex-col rounded-3xl bg-white"
	bind:this={container}
	on:click={(e) => selectBoss(e)}
>
	<Title>보스별 정리</Title>
	<Hbar />
	<div class="px-4 py-8 flex flex-col gap-9 overflow-x-hidden overflow-y-auto">
		{#each data as item, idx}
			<div
				class="flex-none w-full px-4 flex flex-col transition"
				class:scale-105={idx === $counterIndex}
				class:opacity-50={item[4] - item[3].length >= maxBossCount}
			>
				<div
					class="relative w-full h-[120px] flex flex-col justify-center gap-2 rounded-2xl shadow overflow-hidden"
					class:rounded-b-none={idx === $counterIndex}
					class:shadow-red-400={hasRequired(item)}
					data-index={idx}
				>
					<img
						src={`${bossInfo[item[0]].image}`}
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
							data-index={idx}>{item[0]}</span
						>
						<span class="drop-shadow-xs xs:text-xl sm:text-2xl" data-index={idx}>{item[1]}</span>
					</div>
					<div
						class="absolute bottom-2 right-0 mx-2 px-2 py-1 flex justify-center items-center gap-2 border-2 rounded-2xl bg-white text-indigo-500
									 xs:gap-0 sm:flex-col sm:top-0 sm:bottom-0 sm:right-2 sm:my-4"
					>
						<span
							class="text-sm font-bold drop-shadow-[0_0_10px_rgba(255,255,255,1)] xs:px-2 xs:text-base"
							data-index={idx}>{`X ${item[3].length}`}</span
						>
						<span class="text-sm xs:px-2 xs:text-base" data-index={idx}
							>{getABossPrice(idx)} 원</span
						>
					</div>
				</div>
				{#if idx === $counterIndex}
					<div
						class="grow p-4 flex flex-col justify-between items-center gap-2 rounded-b-2xl shadow"
						class:shadow-red-400={hasRequired(item)}
					>
						<div class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
							{#each item[3] as char}
								<div
									class="w-full px-4 py-2 flex sm:flex-col justify-between sm:items-center gap-2 
												 border rounded-xl shadow cursor-pointer hover:bg-gray-500/30
												 transition duration-100 ease-in-out"
									class:border-red-400={char[3]}
									on:click|stopPropagation={() => selectChar(char[0])}
								>
									<span class="max-w-[40%] overflow-hidden whitespace-nowrap text-ellipsis"
										>{char[0]}</span
									>
									<div class="flex items-center gap-2">
										<span class="hidden xs:inline whitespace-nowrap">{char[2]}인</span>
										<span class="whitespace-nowrap">
											{Math.floor(item[2] / char[2])}원
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
	{#if data.length === 0}
		<span class="h-[80px] px-8 text-xl font-bold text-slate-700">아직 추가된 보스가 없습니다</span>
	{/if}
</section>
