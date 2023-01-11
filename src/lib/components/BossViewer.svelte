<script lang="ts">
	import type { BossDCType } from '$types';
	import { store, charIndex } from '$stores';
	import { showModal, modalType } from '$stores/modal';

	function openModal() {
		$showModal = true;
		$modalType = 'BossSelect';
	}

	function deleteBoss(idx: number, dc: keyof BossDCType) {
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

	$: count = $charIndex !== undefined ? getCharBossCount($store[$charIndex].boss) : 0;
</script>

{#if $charIndex !== undefined}
	<div class="md:px-4 my-4 flex flex-col">
		<div class="p-4 text-xl font-bold text-slate-700">
			{#if count === 0}
				보스를 추가해주세요
			{:else}
				총 {$store[$charIndex].boss.length}종 {count}개
			{/if}
		</div>
		<button
			class="m-4 sm:mb-8 px-4 py-6 border rounded-2xl cursor-pointer text-2xl font-bold
					 hover:bg-gray-500/30 transition duration-100 ease-in-out"
			on:click={openModal}>보스 추가</button
		>
		{#if $store[$charIndex] && $store[$charIndex].boss.length > 0}
			<div class="max-h-[400px] p-4 flex flex-col gap-2 sm:gap-6 overflow-x-hidden overflow-y-auto">
				{#each $store[$charIndex].boss as boss, idx}
					<div class="relative flex-none w-full h-[120px]">
						<div class="w-full h-full flex flex-col sm:flex-row justify-between items-center">
							<div
								class="relative w-full h-full flex flex-col sm:flex-row
											 justify-center sm:justify-between items-center gap-2 rounded-3xl"
							>
								<img
									src={boss.image}
									alt={boss.name}
									class="absolute w-full h-full rounded-3xl object-cover"
								/>
								<div
									class="absolute w-full h-full bg-gradient-to-l from-white via-transparent to-transparent"
								/>
								<div
									class="sm:px-12 flex justify-center sm:justify-start sm:items-center
												 text-2xl sm:text-4xl text-white font-bold whitespace-pre break-word drop-shadow-xs"
								>
									{boss.name}
								</div>
								<div class="flex flex-row sm:flex-col items-center gap-2 md:gap-4">
									{#each boss.dc as dc}
										<div
											on:click={() => deleteBoss(idx, dc[0])}
											class="z-10 px-2 py-2 xs:px-4 flex justify-center items-center gap-1
														 border-2 rounded-2xl bg-white cursor-pointer
													 hover:bg-gray-500/30 transition duration-100 ease-in-out"
											class:border-red-400={dc[2]}
										>
											<span class="text-xs xs:text-base font-bold">{dc[0]}</span>
											<span class="text-xs xs:text-base whitespace-nowrap">{dc[1]}인</span>
										</div>
									{/each}
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
{:else}
	<div class="mt-4 px-8 py-4 text-xl font-bold text-slate-700 overflow-hidden whitespace-nowrap">
		선택된 캐릭터가 없습니다
	</div>
{/if}
