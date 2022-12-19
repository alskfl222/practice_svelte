<script lang="ts">
	import type { BossDC } from 'src/types';
	import { store, charIndex } from '../../stores';

	function deleteBoss(idx: number, dc: keyof BossDC) {
		if ($charIndex !== undefined) {
			let charBossDC = $store[$charIndex].boss[idx].dc;
			charBossDC = charBossDC.filter((x) => x !== dc);
			$store[$charIndex].boss[idx].dc = charBossDC;
			if (charBossDC.length === 0) {
				$store[$charIndex].boss = [
					...$store[$charIndex].boss.slice(0, idx),
					...$store[$charIndex].boss.slice(idx + 1)
				];
			}
		}
	}

	function getCharBossCount(bossArr: any[]) {
		let count = 0;
		if ($charIndex !== undefined) {
			bossArr.forEach((boss) => {
				count += boss.dc.length;
			});
		}
		return count;
	}
	let count = 0;

	$: if ($charIndex !== undefined) {
		count = getCharBossCount($store[$charIndex].boss);
	}
</script>

{#if $charIndex !== undefined}
	<div class="col-span-3 flex flex-col">
		<div class="p-4">총 {$store[$charIndex].boss.length}종 {count}개</div>
		{#if $store[$charIndex] && $store[$charIndex].boss.length > 0}
			<div class="p-4 flex flex-col gap-4">
				{#each $store[$charIndex].boss as boss, idx}
					<div
						class="w-full h-[80px] rounded-3xl bg-cover bg-center bg-no-repeat"
						style={`background-image: url(${boss.image})`}
					>
						<div class="h-[100%] p-4 flex justify-between items-center">
							<div class="text-4xl text-white font-bold">{boss.name}</div>
							<div class="flex">
								{#each boss.dc as dc}
									<span
										on:click={() => deleteBoss(idx, dc)}
										class="p-1 rounded text-white drop-shadow-lg cursor-pointer
													 hover:bg-gray-500/30 transition duration-150 ease-in-out"
									>
										{dc}
									</span>
								{/each}
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
{/if}
