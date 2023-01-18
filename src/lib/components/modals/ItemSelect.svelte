<script lang="ts">
	import { bossInfo } from '$stores/boss';
	import { calendarData, selectedItem } from '$stores/calendar';
	import type { ItemType } from '$types';

	function selectItem(item: ItemType) {
		$selectedItem = item;
	}
</script>

<div class="w-[80vw] h-[80vh] flex items-center rounded-2xl bg-white">
	<div class="w-full max-h-[80%] px-4 xs:px-12 flex flex-col gap-8 overflow-scroll">
		{#each $calendarData.x as item}
			<div
				class="flex-none relative w-full h-[120px] flex justify-center sm:justify-between items-center
               gap-2 rounded-3xl overflow-hidden"
				on:click={() => selectItem(item)}
			>
				<img
					src={item.boss ? bossInfo[item.boss.name].image : ''}
					alt={item.boss?.name}
					class="absolute w-full h-full rounded-3xl object-cover"
				/>
				<div
					class="absolute w-full h-full bg-gradient-to-l from-white via-transparent to-transparent"
				/>
				<div class="relative w-full px-2 flex justify-between items-center gap-2 text-white">
					<span class="text-xl font-bold drop-shadow-xs">{item.char.name}</span>
					<div class="flex flex-col items-center text-lg drop-shadow-xs">
						<span>{item.boss?.name}</span><span>{item.boss?.dc}</span>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
