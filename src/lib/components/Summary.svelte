<script lang="ts">
  import { store, bossReport } from '../../stores';
	import { getTotalBossCount, getTotalBossPrice } from '../../utils';
	$: charCount = $store.length;
  $: bossCount = getTotalBossCount($bossReport)
	$: bossPrice = getTotalBossPrice($store)
</script>

<div class='bg-white'>
	{charCount} 캐릭터 {bossCount} 보스 {bossPrice} 원
</div>
