<script lang="ts">
	import Hbar from './common/Hbar.svelte';
	import { charArr, fulfilled } from '$stores';
	import { maxBossCount } from '$stores/boss';
	import { getTotalBossPrice } from '$utils';

	let innerWidth: number = 0;

	$: charCount = $charArr.length;
	$: countStatus =
		$fulfilled.length < maxBossCount
			? '더 가능!'
			: $fulfilled.length === maxBossCount
			? '꽉 채움!'
			: '줄이람!';
	$: price = getTotalBossPrice($fulfilled);
</script>

<svelte:window bind:innerWidth />

<div
	class="min-h-[90px] px-4 flex flex-col sm:flex-row justify-center items-center xs:gap-2 rounded-t-2xl
			 bg-white text-neutral-700 xl:dark:text-neutral-200
				 whitespace-nowrap xl:p-8 xl:flex-col xl:items-end xl:rounded-2xl xl:dark:bg-neutral-600"
>
	<div class="hidden w-[50%] md:flex md:justify-center">
		<span class="text-xl md:text-2xl font-bold xl:py-6">보스 요약</span>
	</div>
	{#if innerWidth >= 1280}
		<Hbar />
	{/if}
	<div class="w-[50%] flex justify-center gap-4 xl:px-0 xl:flex-col ">
		<div
			class="px-0 flex justify-center text-lg sm:text-xl xs:px-2 xl:justify-end xl:px-0 xl:pt-8 xl:pb-1"
		>
			{charCount} 캐릭터
		</div>
		<div class="px-0 flex justify-center text-lg sm:text-xl xs:px-2 xl:px-0 xl:py-1 xl:justify-end">
			{$fulfilled.length} 보스
		</div>
	</div>

	<div class="w-full px-2 flex justify-center text-lg sm:text-xl xl:px-0 xl:py-10 xl:justify-end">
		{price.toLocaleString()} 원
	</div>
	{#if innerWidth >= 1280}
		<Hbar />
	{/if}
	<div
		class="hidden w-full px-2 sm:flex justify-center text-lg sm:text-xl font-bold 
					 xl:px-0 xl:py-8 xl:justify-end xl:text-2xl"
	>
		{countStatus}
	</div>
</div>
