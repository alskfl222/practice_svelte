<script lang="ts">
	import { store, Report, bossInfo, charIndex, counterIndex, maxBossCount } from '$stores';
	import type { CharName, SortReportItem } from '$types';
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

	function selectChar(name: CharName) {
		const nameArr = $store.map((char) => char.name);
		$charIndex = nameArr.indexOf(name);
		window.scrollTo(0, 90);
	}

	function hasRequired(item: SortReportItem) {
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
					class="relative w-full h-[90px] flex border border-2 rounded-2xl"
					class:rounded-b-none={idx === $counterIndex}
					class:border-red-400={hasRequired(item)}
					data-index={idx}
				>
					<img
						src={`${bossInfo[item[0]].image}`}
						alt="boss img"
						class={`absolute w-[480px] h-full ${
							idx === $counterIndex ? 'rounded-tl-2xl' : 'rounded-l-2xl'
						} object-cover`}
					/>
					<div
						class="absolute w-[480px] h-full px-12 flex items-center gap-6
								 bg-gradient-to-l from-white via-transparent to-transparent
								 text-white font-bold"
						data-index={idx}
					>
						<span class="text-3xl">{item[0]}</span><span class="text-2xl">{item[1]}</span>
					</div>
					<div class="absolute right-0 h-full flex items-center">
						<span class="px-4" data-index={idx}>{`X ${item[3].length}`}</span>
					</div>
				</div>
				{#if idx === $counterIndex}
					<div
						class="grow p-4 flex justify-between items-center
									 border-2 border-t-0 rounded-b-2xl"
						class:border-red-400={hasRequired(item)}
					>
						<div class="flex gap-2">
							{#each item[3] as char}
								<div
									class="w-full px-4 py-2 flex flex-col gap-2 border rounded-xl
												 drop-shadow-lg cursor-pointer hover:bg-gray-500/30
												 transition duration-100 ease-in-out"
									class:border-red-400={char[3]}
									on:click|stopPropagation={() => selectChar(char[0])}
								>
									<div class="flex flex-col items-center">
										<span>{char[0]}</span>
										<span>{char[2]} 인</span>
									</div>
									<div class="border-b border-slate-400" />
									<span class="self-center">
										{Math.floor(item[2] / char[2])} 원
									</span>
								</div>
							{/each}
						</div>
						<span>
							총 {getABossPrice(idx)} 원
						</span>
					</div>
				{/if}
			</div>
		{/each}
	</div>
	{#if data.length === 0}
		<span class="h-[80px] px-8 text-xl font-bold text-slate-700">아직 추가된 보스가 없습니다</span>
	{/if}
</section>
