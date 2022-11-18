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

{#if $charIndex !== undefined && $store[$charIndex].boss.length > 0}
	<div class="p-2 grid grid-cols-4 gap-4 border">
		{#each $store[$charIndex].boss as boss, idx}
			<div
				class="aspect-square rounded bg-cover bg-center bg-no-repeat"
				style={`background-image: url(${boss.image})`}
			>
				<div class="h-[100%] p-4 flex flex-col justify-between">
					<div class="text-lg text-white font-bold drop-shadow-lg">{boss.name}</div>
					<div class="flex flex-col items-end">
						{#each boss.dc as dc}
							<span
								on:click={() => deleteBoss(idx, dc)}
								class="text-white drop-shadow-lg cursor-pointer
                  hover:text-xl transition-all duration-500 ease-in-out"
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
