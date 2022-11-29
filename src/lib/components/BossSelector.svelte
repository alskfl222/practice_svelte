<script lang="ts">
	import { store, charIndex, bossInfo } from '../../stores';
	import type { BossType, BossDC } from '../../types';
	import { searchBossIndex, sortByBoss, sortByDC } from '../../utils';

	let bossName: keyof typeof bossInfo | '' = '';
	let bossDC: keyof BossDC | '' = '';

	function selectBoss(select: string) {
		bossName = select;
	}
	function selectDC(select: string) {
		bossDC = select as keyof BossDC;
	}

	function addBoss() {
		if ($store.length === 0) {
			console.log('캐릭터를 추가해주세요');
			return;
		}
		if ($charIndex === undefined) {
			console.log('캐릭터를 선택해주세요');
			return;
		}
		if (!bossName) {
			console.log('보스를 선택해주세요');
			return;
		}
		if (!bossDC) {
			console.log('난이도를 선택해주세요');
			return;
		}

		const charBossIndex = searchBossIndex($store[$charIndex!].boss, bossName);
		const bossImage = bossInfo[bossName].image;
		$store[$charIndex].boss = newBossArr(
			$store[$charIndex].boss,
			charBossIndex,
			bossName,
			bossImage,
			bossDC
		);
	}

	function newBossArr(
		arr: BossType[],
		index: number,
		name: keyof typeof bossInfo,
		image: string,
		dc: keyof BossDC
	) {
		let res = arr.slice();
		if (index === -1) {
			res.push({ name, image, dc: [dc] });
		} else {
			if (res[index].dc.includes(dc)) {
				res[index].dc = res[index].dc.filter((str) => str !== dc);
				if (res[index].dc.length === 0) {
					res = [...res.slice(0, index), ...res.slice(index + 1)];
				}
			} else {
				res[index].dc.push(dc);
				res[index].dc = sortByDC(res[index].dc);
			}
		}
		res = sortByBoss(res);
		return res;
	}
</script>

<div class="bg-sky-100">
	<div class="p-4 grid grid-cols-4 gap-8">
		<div class="col-span-3 flex gap-6">
			{#each Object.keys(bossInfo) as boss}
				<div class="flex">
					<img
						on:click={() => selectBoss(boss)}
						class={`w-[200px] rounded-3xl object-cover border-4 ${
							boss === bossName ? 'border-amber-400' : ''
						}`}
						src={bossInfo[boss].image}
						alt="boss"
					/>
				</div>
			{/each}
		</div>
		<div class="grow-1 flex flex-col gap-2">
			{#if bossName !== ''}
				<div class="flex justify-between">
					<span class="text-4xl font-bold">{bossName}</span>
					<div class="flex gap-2">
						<button on:click={() => selectBoss('')}> 취소 </button>
						<button on:click={addBoss} disabled={bossName === '' || bossDC === ''}> 추가 </button>
					</div>
				</div>
				{#each Object.keys(bossInfo[bossName].dc) as dc}
					<div
						on:click={() => selectDC(dc)}
						class={`p-2 border rounded ${dc === bossDC ? 'border-zinc-800' : ''}`}
					>
						{dc}
					</div>
				{/each}
			{/if}
		</div>
	</div>
</div>
