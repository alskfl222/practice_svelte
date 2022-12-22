<script lang="ts">
	import { store, Report, bossInfo, charIndex, counterIndex } from '../../stores';
	import type { Name } from '../../types';
	import { reportSortByPrice } from '../../utils';
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

	function selectChar(name: Name) {
		const nameArr = $store.map((char) => char.name);
		$charIndex = nameArr.indexOf(name);
		window.scrollTo(0, 90);
	}

	$: data = reportSortByPrice($Report);
</script>

<section
	class="max-h-[560px] px-8 pb-8 flex flex-col rounded-3xl bg-white"
	bind:this={container}
	on:click={(e) => selectBoss(e)}
>
	<Title>보스별 정리</Title>
	<Hbar />
	<div class="px-4 py-8 flex flex-col gap-6 overflow-auto">
		{#each data as item, idx}
			<div
				class={idx === $counterIndex
					? 'flex-none w-full min-h-[160px] px-4 flex flex-col'
					: 'flex-none w-full h-[90px] px-4 flex flex-col'}
			>
				<div
					class={`relative w-full h-[90px] flex border rounded-2xl ${
						idx === $counterIndex ? 'rounded-b-none' : ''
					}`}
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
						class="absolute w-[480px] h-full px-12 flex items-center
								 bg-gradient-to-l from-white via-transparent to-transparent
								 text-4xl text-white font-bold"
						data-index={idx}
					>
						{item[0]}
					</div>
					<div class="absolute right-0 h-full flex items-center">
						<span class="px-4" data-index={idx}>{`X ${item[3].length}`}</span>
					</div>
				</div>
				{#if idx === $counterIndex}
					<div
						class="grow px-4 flex justify-between items-center
									 border border-t-0 rounded-b-2xl"
					>
						<div class="flex gap-2">
							{#each item[3] as char}
								<div
									class="px-4 py-2 flex gap-2 border rounded-xl"
									on:click|stopPropagation={() => selectChar(char[0])}
								>
									<span>{char[0]}</span> |
									<span>{char[2]} 인</span>
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
