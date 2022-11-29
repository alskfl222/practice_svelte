<script lang="ts">
	import type { BossDC } from 'src/types';
	import { store, charIndex } from '../../stores';

	function deleteBoss(idx: number, dc: keyof BossDC) {
		if ($charIndex === undefined) {
			console.log('캐릭터를 선택해주세요?');
			return;
		}

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
</script>

{#if $charIndex !== undefined}
	{#if $store[$charIndex] && $store[$charIndex].boss.length > 0}
		<div class="col-span-2 flex flex-col">
			<div>{$store[$charIndex].boss.length} 보스</div>
			<div class="p-2 flex gap-4 border">
				{#each $store[$charIndex].boss as boss, idx}
					<div
						class="w-[240px] aspect-square rounded-3xl bg-cover bg-center bg-no-repeat"
						style={`background-image: url(${boss.image})`}
					>
						<div class="h-[100%] p-4 flex flex-col justify-between">
							<div class="text-4xl text-white font-bold">{boss.name}</div>
							<div class="flex flex-col items-end">
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
		</div>
	{:else}
		<div class="col-span-2">등록된 보스가 아직 없습니다</div>
	{/if}
{/if}
