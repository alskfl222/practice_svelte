<script lang="ts">
	import type { BossDifficulty } from 'src/types';
	import { store, charIndex, bossInfo } from '../../stores';

	function deleteBoss(
		idx: number,
		bossName: keyof typeof bossInfo,
		difficulty: keyof BossDifficulty
	) {
		let charBossObjIdx = 0;
		for (let i = 0; i < $store[idx].boss.length; i++) {
			if ($store[idx].boss[i].name === bossName) {
				break;
			}
			charBossObjIdx++;
		}
		let charBossDifficulty = $store[idx].boss[charBossObjIdx].difficulty;
		charBossDifficulty = charBossDifficulty.filter((x) => x !== difficulty);
		$store[idx].boss[charBossObjIdx].difficulty = charBossDifficulty;
		if (charBossDifficulty.length === 0) {
			$store[idx].boss = [
				...$store[idx].boss.slice(0, charBossObjIdx),
				...$store[idx].boss.slice(charBossObjIdx + 1)
			];
		}
	}
</script>

{#if $charIndex !== undefined}
	<div class="p-2 grid grid-cols-4 gap-4 border">
		{#each $store[$charIndex].boss as boss, idx}
			<div
				class="aspect-square rounded bg-cover bg-center bg-no-repeat"
				style={`background-image: url(${boss.image})`}
			>
				<div class="h-[100%] p-4 flex flex-col justify-between">
					<div class="text-lg text-white font-bold">{boss.name}</div>
					<div class="flex flex-col">
						{#each boss.difficulty as difficulty}
							<p on:click={() => deleteBoss(idx, boss.name, difficulty)} class="text-white">
								{difficulty}
							</p>
						{/each}
					</div>
				</div>
			</div>
		{/each}
	</div>
{/if}
