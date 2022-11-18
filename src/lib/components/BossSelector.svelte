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

{#if $charIndex !== undefined}
	<section>
		<div class="flex gap-4">
			{#each Object.keys(bossInfo) as boss}
				<img
					on:click={() => selectBoss(boss)}
					class:selected={boss === bossName}
					src={bossInfo[boss].image}
					alt="boss"
				/>
			{/each}
		</div>
		<p>{bossName}</p>
		{#if bossName !== ''}
			{#each Object.keys(bossInfo[bossName].dc) as dc}
				<span on:click={() => selectDC(dc)} class:selected={dc === bossDC}> {dc}</span>
			{/each}
		{/if}
		<button on:click={addBoss} disabled={bossName === '' || bossDC === ''}> 추가 </button>
	</section>
{/if}

<style lang="scss">
	img {
		width: 80px;
		height: 80px;
		object-fit: cover;
	}
	.selected {
		border: 1px dashed black;
	}
	button {
		&:disabled {
			background-color: darkgray;
		}
	}
</style>
