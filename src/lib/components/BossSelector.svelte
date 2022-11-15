<script lang="ts">
	import { store, charIndex, bossInfo } from '../../stores';
	import type { BossDifficulty } from '../../types';
	import { newBossArr, searchBossIndex } from '../../utils';

	let bossName: keyof typeof bossInfo | '' = '';
	let bossDifficulty: keyof BossDifficulty | '' = '';

	function selectBoss(select: string) {
		bossName = select;
	}
	function selectDifficulty(select: string) {
		bossDifficulty = select as keyof BossDifficulty;
	}

	function addBoss() {
		if ($store.length === 0) {
			console.log('캐릭터를 추가해주세요');
			return;
		}
		if (!bossName) {
			console.log('보스를 선택해주세요');
			return;
		}
		if (!bossDifficulty) {
			console.log('난이도를 선택해주세요');
			return;
		}

		const charBossIndex = searchBossIndex($store[$charIndex].boss, bossName);
		const bossImage = bossInfo[bossName].image;
		$store[$charIndex].boss = newBossArr(
			$store[$charIndex].boss,
			charBossIndex,
			bossName,
			bossImage,
			bossDifficulty
		);
	}
</script>

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
		{#each Object.keys(bossInfo[bossName].difficulty) as difficulty}
			<span
				on:click={() => selectDifficulty(difficulty)}
				class:selected={difficulty === bossDifficulty}
			>
				{difficulty}</span
			>
		{/each}
	{/if}
	<button on:click={addBoss} disabled={bossName === '' || bossDifficulty === ''}> 추가 </button>
</section>

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
