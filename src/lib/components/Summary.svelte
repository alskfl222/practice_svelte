<script lang="ts">
  import { store, bossReport } from '../../stores';
	import { getTotalBossCount } from '../../utils';
	$: charCount = $store.length;
  $: bossCount = getTotalBossCount($bossReport)
</script>

<div>
	{charCount} 캐릭터 {bossCount} 보스
</div>
