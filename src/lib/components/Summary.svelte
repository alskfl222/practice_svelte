<script lang="ts">
	import Title from './common/Title.svelte';
	import { charArr, fulfilled } from '$stores';
	import { maxBossCount } from '$stores/boss';
	import { getTotalBossPrice } from '$utils';
	$: charCount = $charArr.length;
	$: countStatus =
		$fulfilled.length < maxBossCount
			? '더 가능!'
			: $fulfilled.length === maxBossCount
			? '꽉 채움!'
			: '줄이람!';
	$: price = getTotalBossPrice($fulfilled);
</script>

<div
	class="min-h-[90px] px-4 flex flex-col sm:flex-row justify-center items-center rounded-t-2xl bg-neutral-100
				 whitespace-nowrap xl:px-6 xl:flex-col xl:rounded-2xl"
>
	<div class="hidden w-[50%] md:flex md:justify-center xl:border-b">
		<span class="text-xl md:text-2xl font-bold">보스 요약</span>
	</div>
	<div class="self-center w-[50%] flex justify-center gap-4 xl:px-0 xl:flex-col">
		<div
			class="px-0 flex justify-center text-lg sm:text-xl text-neutral-700 xs:px-2 xl:justify-end xl:pt-8 xl:pb-2"
		>
			{charCount} 캐릭터
		</div>
		<div
			class="px-0 flex justify-center text-lg sm:text-xl text-neutral-700 xs:px-2 xl:py-2 xl:justify-end"
		>
			{$fulfilled.length} 보스
		</div>
	</div>
	<div class='w-[50%]'>
		<div
			class="w-full px-2 flex justify-center text-lg sm:text-xl text-neutral-700 xl:py-10 xl:justify-end xl:border-b"
		>
			{price.toLocaleString()} 원
		</div>
		<div
			class="hidden w-full px-2 sm:flex justify-center text-lg sm:text-xl text-neutral-700 font-bold xl:py-8 xl:justify-end"
		>
			{countStatus}
		</div>
	</div>
</div>
