<script lang="ts">
	import { store, bossReport } from '../../stores';
	import { getTotalBossCount, getTotalBossPrice } from '../../utils';
	import Hbar from './common/Hbar.svelte';
	import Title from './common/Title.svelte';
	$: charCount = $store.length;
	$: bossCount = getTotalBossCount($bossReport);
	$: bossPrice = getTotalBossPrice($store);
	$: countStatus = bossCount < 180 ? '더 가능!' : bossCount === 180 ? '꽉 채움!' : '과다';
</script>

<div class="flex flex-col justify-end rounded-2xl bg-white gap-8">
	<Title text="요약" />
	<div>
		{charCount} 캐릭터
	</div>
	<div>
		{bossCount} 보스
	</div>
	<Hbar />
	<div>
		{bossPrice} 원
	</div>
	<div>
		{countStatus}
	</div>
</div>
