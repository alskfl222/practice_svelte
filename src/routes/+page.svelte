<script lang="ts">
	import { Store, BossInfo } from '../stores';
	import type { BossDifficulty, CharBoss } from '../types';
	import { getTotalBossInfo, getTotalBossCount, newBossArr, searchBossIndex } from '../utils';

	let data = $Store;
	let charIndex = 0;
	let charName: string = '';
	let charClass: string = '';
	let bossName: keyof typeof BossInfo | '' = '';
	let bossDifficulty: BossDifficulty | '' = '';

	$: totalBossinfo = getTotalBossInfo(data);
	$: totalBossCount = getTotalBossCount(totalBossinfo);

	function addChar() {
		const newInfo: CharBoss = { boss: [] };
		newInfo.name = charName;
		newInfo.class = charClass;
		data = [...data, newInfo];
		charName = '';
		charClass = '';
	}
	function changeChar(index: number) {
		charIndex = index;
	}
	function addBoss() {
		if (data.length === 0) {
			console.log('캐릭터를 추가해주세요');
			return;
		}
		if (bossName && bossDifficulty) {
			const charBossIndex = searchBossIndex(data[charIndex].boss, bossName);
			data[charIndex].boss = newBossArr(
				data[charIndex].boss,
				charBossIndex,
				bossName,
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

<section>
	<input bind:value={charName} />
	<input bind:value={charClass} />
	<button on:click={addChar}>추가</button>
</section>

<section>
	<p>charIndex: {charIndex}</p>
	<p>charName: {charName}</p>
	<p>charClass: {charClass}</p>
	<div>Store length: {data.length}</div>
</section>

<section>
	<p>totalBossCount: {totalBossCount}</p>
</section>

<section>
	{#each data as char, index}
		<div class:selected={index === charIndex} on:click={() => changeChar(index)}>
			<p>{index}</p>
			<p>{char.name}</p>
			<p>{char.class}</p>
			{#each char.boss as boss}
				<div>{boss.name}</div>
				<div>{JSON.stringify(boss.difficulty)}</div>
			{/each}
		</div>
	{/each}
</section>

<section>
	<p>{bossName}</p>
	<p>{bossDifficulty}</p>
	<p>{bossName !== ''}</p>
	<select bind:value={bossName}>
		{#each Object.keys(BossInfo) as boss}
			<option value={boss}>{boss}</option>
		{/each}
	</select>
	{#if bossName !== ''}
		<select bind:value={bossDifficulty}>
			{#each Object.keys(BossInfo[bossName]) as difficulty}
				<option value={difficulty}>{difficulty}</option>
			{/each}
		</select>
	{/if}
	<button on:click={addBoss}>추가</button>
</section>

<style>
	section {
		margin: 2rem;
		padding: 1rem;
		border: 1px solid black;
	}

	input {
		border: 1px solid black;
	}
	.selected {
		border: 1px solid black;
	}
</style>
