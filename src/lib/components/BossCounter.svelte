<script lang="ts">
	import { bossReport, bossInfo, counterIndex } from '../../stores';
	import { reportSortByPrice, getTotalBossPrice } from '../../utils';
	import Title from './common/Title.svelte';
	import Hbar from './common/Hbar.svelte';

	const baseStyle = `
		flex-none w-full h-[80px] px-8 flex justify-between items-center
		bg-center rounded-3xl object-cover text-white
	`;
	const selectStyle =
		'flex-none w-full h-[180px] px-4 flex flex-col bg-center rounded-3xl object-cover';

	function selectBoss(idx: number) {
		if ($counterIndex !== undefined) {
			$counterIndex = undefined;
			return;
		}
		$counterIndex = idx;
	}
	$: data = reportSortByPrice($bossReport);
</script>

<section class="min-h-[240px] max-h-[540px] pb-16 flex flex-col rounded-3xl bg-white">
	<Title text="보스별 정리" />
	<Hbar />
	<div class="flex flex-col gap-4 p-8 overflow-auto">
		{#each data as item, idx}
			<div
				class={idx === $counterIndex ? selectStyle : baseStyle}
				style={`background-image: url(${bossInfo[item[0]].image}`}
				on:click={() => selectBoss(idx)}
			>
				{#if idx === $counterIndex}
					<div class="h-[80px] px-4 flex justify-between items-center text-white">
						<span>{`${item[0]} ${item[1]}`}</span>
						<span>{`X ${item[3].length}`}</span>
					</div>
					<Hbar color="white" />
					<div class="grow px-4 flex justify-between items-center text-white">
						{item[3].map(char => char[0]).toString()}
					</div>
				{:else}
					<span>{`${item[0]} ${item[1]}`}</span>
					<span>{`X ${item[3].length}`}</span>
				{/if}
			</div>
		{/each}
	</div>
</section>
