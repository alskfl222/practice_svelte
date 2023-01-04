<script lang="ts">
	import { store, Count, Price, maxBossCount } from '$stores';
	$: charCount = $store.length;
	$: countStatus =
		$Count <= maxBossCount ? 'text-blue-700' : 'text-red-700';
</script>

<div class="py-4 flex rounded-t-2xl bg-white items-center font-bold whitespace-nowrap">
	<div class="w-full px-4 flex justify-center text-slate-700">
		{charCount} 캐릭터
	</div>
	<div class={`w-full px-4 flex justify-center ${countStatus}`}>
		{$Count} 보스
	</div>
	<div class={`w-full px-4 flex justify-center ${countStatus}`}>
		{$Price} 원
	</div>
</div>
