<script lang="ts">
	import { store, Count, Price, maxBossCount } from '$stores';
	import Title from './common/Title.svelte';
	$: charCount = $store.length;
	$: countStatus =
		$Count < maxBossCount ? '더 가능!' : $Count === maxBossCount ? '꽉 채움!' : '줄이람!';
</script>

<div
	class="min-h-[90px] px-4 flex flex-col xs:flex-row justify-center items-center rounded-t-2xl bg-white
						whitespace-nowrap xl:flex-col xl:rounded-2xl"
>
	<div class="hidden w-full md:flex justity-end xl:border-b">
		<Title>보스 요약</Title>
	</div>
	<div class="w-full px-2 flex xl:px-0 xl:flex-col">
		<div
			class="w-full px-2 flex justify-center text-xl text-slate-700 xl:justify-end xl:pt-8 xl:pb-2"
		>
			{charCount} 캐릭터
		</div>
		<div class="w-full px-2 flex justify-center text-xl text-slate-700 xl:py-2 xl:justify-end">
			{$Count} 보스
		</div>
	</div>
	<div
		class="w-full px-2 flex justify-center text-xl text-slate-700 xl:py-10 xl:justify-end xl:border-b"
	>
		{$Price} 원
	</div>
	<div
		class="hidden w-full px-2 sm:flex justify-center text-xl text-slate-700 font-bold xl:py-8 xl:justify-end"
	>
		{countStatus}
	</div>
</div>
