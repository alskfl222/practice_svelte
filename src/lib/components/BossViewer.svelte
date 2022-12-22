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
			<div class="p-4 flex flex-col gap-4">
				{#each $store[$charIndex].boss as boss, idx}
					<div class="w-full h-[90px]">
						<div class="h-[100%] flex justify-between items-center">
							<div
								class="w-[480px] h-[100%] px-12 py-4 flex items-center rounded-3xl
												bg-cover bg-center bg-no-repeat text-4xl text-white font-bold"
								style={`background-image: url(${boss.image})`}
							>
								{boss.name}
							</div>
							<div class="h-[100%]">
								{#each boss.dc as dc}
									<div
										on:click={() => deleteBoss(idx, dc[0])}
										class="h-[100%] px-4 flex flex-col justify-center gap-2
													 border rounded-2xl drop-shadow-lg cursor-pointer
													 hover:bg-gray-500/30 transition duration-100 ease-in-out"
									>
										<span>{dc[0]}</span>
										<div class="w-full flex justify-center gap-2">
											<span>{dc[1]}인</span><span
												>{#if dc[2]}
													<i class="fa-solid fa-exclamation" />
												{:else}
													<i class="fa-solid fa-question" />
												{/if}</span
											>
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
