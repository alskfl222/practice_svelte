<script lang="ts">
	import { store, Count, Price, maxBossCount } from '$stores';
	import Hbar from './common/Hbar.svelte';
	import Title from './common/Title.svelte';
	$: charCount = $store.length;
	$: countStatus =
		$Count < maxBossCount ? '더 가능!' : $Count === maxBossCount ? '꽉 채움!' : '줄이람!';
</script>

<div class="px-4 flex rounded-2xl bg-white items-center whitespace-nowrap xl:flex-col">
	<div class="w-full flex justity-end">
		<Title>보스 요약</Title>
	</div>
	<Hbar />
	<div class="w-full px-4 flex justify-end text-xl text-slate-700 xl:pt-8 xl:pb-4">
		{charCount} 캐릭터
	</div>
	<div class="w-full px-4 flex justify-end text-xl text-slate-700 xl:pb-8">
		{$Count} 보스
	</div>
	<Hbar />
	<div class="w-full px-4 flex justify-end text-xl text-slate-700 xl:pt-8 xl:pb-4">
		{$Price} 원
	</div>
	<div class="w-full px-4 flex justify-end text-xl text-slate-700 font-bold xl:pb-8">
		{countStatus}
	</div>
</div>
