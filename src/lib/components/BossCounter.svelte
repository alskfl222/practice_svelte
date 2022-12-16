<script lang="ts">
	import { bossReport, bossInfo } from '../../stores';
</script>

<section class="grid grid-cols-3 gap-4">
	{#each Object.keys($bossReport) as boss}
		<div>
			<div
				class="aspect-[4/1] rounded bg-auto bg-center bg-no-repeat"
				style={`background-image: url(${bossInfo[boss].image})`}
			/>
			{#each Object.keys($bossReport[boss].count) as dc}
				<span>{dc}</span><span>{$bossReport[boss].count[dc]}</span>
			{/each}
		</div>
	{/each}
</section>
