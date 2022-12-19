<script lang="ts">
	import { bossInfo, bossReportSortByPrice } from '../../stores';
	$: console.log($bossReportSortByPrice);
</script>

<section class="flex gap-4">
	{#each $bossReportSortByPrice as item}
		<div
			class="w-full h-[80px] p-4 flex justify-end items-center rounded-3xl object-cover"
			style={`background-image: url(${bossInfo[item[0]].image}`}
		>
			<span class="right-0 top-0 text-white">{`${item[1]} ${item[2]} ${item[3]}`}</span>
		</div>
	{/each}
</section>
