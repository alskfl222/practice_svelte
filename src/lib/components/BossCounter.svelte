<script lang="ts">
	import { bossReport, bossInfo } from '../../stores';
	import { reportSortByPrice } from '../../utils'
	$: data = reportSortByPrice($bossReport)
</script>

<section class="min-h-[240px] flex flex-col gap-4">
	{#each data as item}
		<div
			class="w-full h-[80px] p-4 flex justify-between items-center bg-center rounded-3xl object-cover"
			style={`background-image: url(${bossInfo[item[0]].image}`}
		>
			<span class="text-white">{item[0]}</span>
			<span class="text-white">{`${item[1]} ${item[2]} ${item[3]}`}</span>
		</div>
	{/each}
</section>
