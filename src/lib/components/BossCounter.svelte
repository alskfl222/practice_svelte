<script lang="ts">
	import { Report, bossInfo, counterIndex } from '../../stores';
	import { reportSortByPrice } from '../../utils';
	import Title from './common/Title.svelte';
	import Hbar from './common/Hbar.svelte';

	function selectBoss(idx: number) {
		if ($counterIndex !== undefined) {
			$counterIndex = undefined;
			return;
		}
		$counterIndex = idx;
	}
	$: data = reportSortByPrice($Report);
</script>

<section class="min-h-[240px] max-h-[540px] pb-16 flex flex-col rounded-3xl bg-white">
	<Title text="보스별 정리" />
	<Hbar />
	<div class="flex flex-col gap-4 p-8 overflow-auto">
		{#each data as item, idx}
			<div
				class={idx === $counterIndex
					? 'flex-none w-full h-[160px] px-4 flex flex-col'
					: 'flex-none w-full h-[80px] px-4 flex flex-col'}
			>
				<div
					class={`h-[80px] px-4 flex justify-between items-center text-white ${
						idx === $counterIndex ? 'rounded-t-3xl' : 'rounded-3xl'
					}`}
					style={`background-image: url(${bossInfo[item[0]].image}`}
					on:click={() => selectBoss(idx)}
				>
					<span>{`${item[0]} ${item[1]}`}</span>
					<span>{`X ${item[3].length}`}</span>
				</div>
				{#if idx === $counterIndex}
					<Hbar />
					<div class="grow px-4 flex justify-between items-center border rounded-b-3xl">
						{item[3].map((char) => char[0]).toString()}
					</div>
				{/if}
			</div>
		{/each}
	</div>
</section>
