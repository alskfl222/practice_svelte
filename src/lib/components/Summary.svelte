<script lang="ts">
	import Title from './common/Title.svelte';
	import { charArr, fulfilled } from '$stores/item';
	import { maxBossCount } from '$stores/boss';
	import { getTotalBossPrice } from '$utils';
	$: charCount = $charArr.length;
	$: countStatus =
		$fulfilled.length < maxBossCount ? '더 가능!' : $fulfilled.length === maxBossCount ? '꽉 채움!' : '줄이람!';
	$: price = getTotalBossPrice($fulfilled);
	
</script>

<div
	class="min-h-[90px] px-4 flex flex-col xs:flex-row justify-center items-center rounded-t-2xl bg-white
				 whitespace-nowrap xl:px-6 xl:flex-col xl:rounded-2xl"
>
	<div class="hidden w-full md:flex md:justify-center xl:border-b">
		<Title>보스 요약</Title>
	</div>
	<div class="self-center w-full flex xl:px-0 xl:flex-col">
		<div
			class="w-full px-0 flex justify-center text-xl text-slate-700 xs:px-2 xl:justify-end xl:pt-8 xl:pb-2"
		>
			{charCount} 캐릭터
		</div>
		<div class="w-full px-0 flex justify-center text-xl text-slate-700 xs:px-2 xl:py-2 xl:justify-end">
			{$fulfilled.length} 보스
		</div>
	</div>
	<div
		class="w-full px-2 flex justify-center text-xl text-slate-700 xl:py-10 xl:justify-end xl:border-b"
	>
		{price} 원
	</div>
	<div
		class="hidden w-full px-2 sm:flex justify-center text-xl text-slate-700 font-bold xl:py-8 xl:justify-end"
	>
		{countStatus}
	</div>
</div>
