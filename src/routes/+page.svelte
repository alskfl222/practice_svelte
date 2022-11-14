<script lang="ts">
	import CharInput from '../lib/components/CharInput.svelte';

	import { store, bossInfo } from '../stores';
	import type { BossDifficulty } from '../types';
	import { getTotalBossInfo, getTotalBossCount, newBossArr, searchBossIndex } from '../utils';

	let charIndex = 0;

	let bossName: keyof typeof bossInfo | '' = '';
	let bossDifficulty: BossDifficulty | '' = '';

	$: totalBossinfo = getTotalBossInfo($store);
	$: totalBossCount = getTotalBossCount(totalBossinfo);

	function changeChar(index: number) {
		charIndex = index;
	}
	function addBoss() {
		if ($store.length === 0) {
			console.log('캐릭터를 추가해주세요');
			return;
		}
		if (bossName && bossDifficulty) {
			const charBossIndex = searchBossIndex($store[charIndex].boss, bossName);
			const bossImage = bossInfo[bossName].image;
			$store[charIndex].boss = newBossArr(
				$store[charIndex].boss,
				charBossIndex,
				bossName,
				bossImage,
				bossDifficulty
			);
		} else {
			console.log('입력 정보를 확인해주세요');
		}
	}
</script>

<svelte:head>
	<title>START</title>
	<meta name="description" content="Practice Sveltekit" />
</svelte:head>

<CharInput />

<section>
	{#each $store as char, index}
		<div class:selected={index === charIndex} on:click={() => changeChar(index)}>
			<p>{index}</p>
			<p>{char.name}</p>
			<p>{char.class}</p>
			<div class="flex">
				{#each char.boss as boss}
					<div>{boss.name}</div>
					<img src={boss.image} alt={boss.name} />
					<div>{JSON.stringify(boss.difficulty)}</div>
				{/each}
			</div>
		</div>
	{/each}
</section>

<section>
	<div class="flex gap-4">
		{#each Object.values(bossInfo) as boss}
			<img src={boss.image} alt='boss' />
		{/each}
	</div>
	<select bind:value={bossName}>
		{#each Object.keys(bossInfo) as boss}
			<option value={boss}>{boss}</option>
		{/each}
	</select>
	{#if bossName !== ''}
		<select bind:value={bossDifficulty}>
			{#each Object.keys(bossInfo[bossName].difficulty) as difficulty}
				<option value={difficulty}>{difficulty}</option>
			{/each}
		</select>
	{/if}
	<button on:click={addBoss}>추가</button>
</section>

<style lang="scss">
	img {
		width: 80px;
		height: 80px;
		object-fit: cover;
	}

	.selected {
		border: 1px solid black;
	}
</style>
