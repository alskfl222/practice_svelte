<script lang="ts">
	import type { BossDC } from 'src/types';
	import { store, charIndex } from '../../stores';

	let count: number = 0;

	function deleteBoss(idx: number, dc: keyof BossDC) {
		if ($charIndex !== undefined) {
			let charBossDC = $store[$charIndex].boss[idx].dc;
			charBossDC = charBossDC.filter((x) => x[0] !== dc);
			$store[$charIndex].boss[idx].dc = charBossDC;
			if (charBossDC.length === 0) {
				$store[$charIndex].boss = [
					...$store[$charIndex].boss.slice(0, idx),
					...$store[$charIndex].boss.slice(idx + 1)
				];
			}
			localStorage.setItem('prev', JSON.stringify($store));
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

	$: if ($charIndex !== undefined) {
		count = getCharBossCount($store[$charIndex].boss);
	}
</script>

{#if $charIndex !== undefined}
	<div class="px-4 mt-4 flex flex-col">
		<div class="p-4 text-xl font-bold text-slate-700">
			{#if count === 0}
				보스를 추가해주세요
			{:else}
				총 {$store[$charIndex].boss.length}종 {count}개
			{/if}
		</div>
		{#if $store[$charIndex] && $store[$charIndex].boss.length > 0}
			<div class="max-h-[360px] p-4 flex flex-col gap-9 overflow-auto">
				{#each $store[$charIndex].boss as boss, idx}
					<div class="flex-none w-full h-[120px]">
						<div class="w-full h-full flex justify-between items-center">
							<div class="relative w-full h-full">
								<img
									src={`${boss.image}`}
									alt="boss img"
									class="absolute w-[480px] h-full rounded-l-2xl object-cover"
								/>
								<div
									class="absolute w-[480px] h-full px-12 flex items-center
												 bg-gradient-to-l from-white via-transparent to-transparent
												 text-4xl text-white font-bold"
								>
									{boss.name}
								</div>
							</div>
							<div class="h-[100%] flex gap-4">
								{#each boss.dc as dc}
									<div
										on:click={() => deleteBoss(idx, dc[0])}
										class="h-[100%] px-4 flex flex-col justify-center gap-2
													 border border-2 rounded-2xl drop-shadow-lg cursor-pointer
													 hover:bg-gray-500/30 transition duration-100 ease-in-out"
										class:border-red-400={dc[2]}
									>
										<span class="font-bold">{dc[0]}</span>
										<div class="w-full flex justify-center gap-3">
											<span>{dc[1]}인</span>
										</div>
									</div>
								{/each}
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
{:else}
	<div class="mt-4 px-8 py-4 text-xl font-bold text-slate-700">선택된 캐릭터가 없습니다</div>
{/if}
