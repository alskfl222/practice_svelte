<script lang="ts">
	import { Report, bossInfo, counterIndex } from '../../stores';
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
	$: data = reportSortByPrice($Report);
</script>

<section
	class="min-h-[240px] max-h-[540px] pb-16 flex flex-col rounded-3xl bg-white"
	bind:this={container}
	on:click={(e) => selectBoss(e)}
>
	<Title text="보스별 정리" />
	<Hbar />
	<div class="flex flex-col gap-4 p-8 overflow-auto">
		{#each data as item, idx}
			<div
				class={idx === $counterIndex
					? 'flex-none w-full min-h-[160px] px-4 flex flex-col'
					: 'flex-none w-full h-[80px] px-4 flex flex-col'}
			>
				<div
					class={`h-[80px] px-4 flex justify-between items-center text-white ${
						idx === $counterIndex ? 'rounded-t-3xl' : 'rounded-3xl'
					}`}
					style={`background-image: url(${bossInfo[item[0]].image}`}
					data-index={idx}
				>
					<div>
						<span>{`${item[0]} ${item[1]}`}</span>
						<span>{item[2]} 원</span>
					</div>
					<span>{`X ${item[3].length}`}</span>
				</div>
				{#if idx === $counterIndex}
					<Hbar />
					<div class="grow px-4 flex justify-between items-center border rounded-b-3xl">
						<div class="flex gap-2">
							{#each item[3] as char}
								<span>{char[0]}</span>
							{/each}
						</div>
						<span>
							총 {item[2] * item[3].length} 원
						</span>
					</div>
				{/if}
			</div>
		{/each}
	</div>
</section>
