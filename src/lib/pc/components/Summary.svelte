<script lang="ts">
	import { store, Count, Price, maxBossCount } from '$stores';
	import Hbar from './common/Hbar.svelte';
	import Title from './common/Title.svelte';
	$: charCount = $store.length;
	$: countStatus =
		$Count < maxBossCount ? '더 가능!' : $Count === maxBossCount ? '꽉 채움!' : '줄이람!';
</script>

<div class="pb-8 flex flex-col rounded-2xl bg-white">
	<div class="w-full flex justity-end">
		<Title>보스 요약</Title>
	</div>
	<Hbar />
	<div class="w-full px-8 pt-8 pb-4 flex justify-end text-xl text-slate-700">
		{charCount} 캐릭터
	</div>
	<div class="w-full px-8 pb-8 flex justify-end text-xl text-slate-700">
		{$Count} 보스
	</div>
	<Hbar />
	<div class="w-full px-8 pt-8 pb-4 flex justify-end text-xl text-slate-700">
		{$Price} 원
	</div>
	<div class="w-full px-8 pb-8 flex justify-end text-xl text-slate-700 font-bold">
		{countStatus}
	</div>
</div>
