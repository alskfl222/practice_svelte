<script lang="ts">
	import { store, bossTotalCount, bossTotalPrice } from '../../stores';
	import Hbar from './common/Hbar.svelte';
	import Title from './common/Title.svelte';
	$: charCount = $store.length;
	$: countStatus = $bossTotalCount < 180 ? '더 가능!' : $bossTotalCount === 180 ? '꽉 채움!' : '과다';
</script>

<div class="flex flex-col rounded-2xl bg-white">
	<Title text="요약" />
	<Hbar />
	<div class='w-full px-8 pt-8 pb-4 flex justify-end text-xl text-slate-700'>
		{charCount} 캐릭터
	</div>
	<div class='w-full px-8 pb-8 flex justify-end text-xl text-slate-700'>
		{$bossTotalCount} 보스
	</div>
	<Hbar />
	<div class='w-full px-8 pt-8 pb-4 flex justify-end text-xl text-slate-700'>
		{$bossTotalPrice} 원
	</div>
	<div class='w-full px-8 pb-8 flex justify-end text-xl text-slate-700 font-bold'>
		{countStatus}
	</div>
</div>
