<script lang="ts">
	import Button from './common/Button.svelte';
	import Dropdown from './common/Dropdown.svelte';
	import { store, charIndex, bossInfo } from '../../stores';
	import type { BossType, BossDC } from '../../types';
	import { searchBossIndex, sortByBoss, sortByDC } from '../../utils';

	let bossName: keyof typeof bossInfo | '' = '';
	let bossDC: keyof BossDC | '' = '';

	function handleSelect(event: CustomEvent) {
		switch (event.type) {
			case 'bossName':
				bossName = event.detail;
				bossDC = '';
				break;
			case 'bossDC':
				bossDC = event.detail;
				break;
			default:
				return;
		}
	}

	function handleClick(event: CustomEvent) {
		if (event.type === 'click') addBoss();
	}

	function addBoss() {
		const charBossIndex = searchBossIndex($store[$charIndex!].boss, bossName);
		const bossImage = bossInfo[bossName].image;

		if (bossDC) {
			$store[$charIndex!].boss = newBossArr(
				$store[$charIndex!].boss,
				charBossIndex,
				bossName,
				bossImage,
				bossDC
			);
		}
		bossName = '';
		bossDC = '';
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
	$: addable = $charIndex !== undefined && bossName !== '' && bossDC !== '';
</script>

<div class="flex justify-center bg-sky-100 p-4 gap-8">
	<div class="flex flex-col gap-6">
		<div class="flex flex-col">
			{#if bossName}
				<img
					class="w-[180px] h-[180px] object-cover"
					src={`${bossInfo[bossName].image}`}
					alt="boss img"
				/>
				<div class="w-[180px] h-[60px] border border-black flex justify-center items-center">
					{bossDC}
				</div>
			{:else}
				<div class="w-[180px] h-[180px] border border-black flex justify-center items-center">
					보스 이미지
				</div>
				<div class="w-[180px] h-[60px] border border-black flex justify-center items-center">
					보스 난이도
				</div>
			{/if}
		</div>
		<Dropdown
			type="bossName"
			value={bossName}
			options={Object.keys(bossInfo)}
			on:bossName={handleSelect}
		/>
		{#if bossName !== ''}
			<Dropdown
				type="bossDC"
				value={bossDC}
				options={Object.keys(bossInfo[bossName].dc)}
				on:bossDC={handleSelect}
			/>
		{/if}

		<Button
			disabled={!addable}
			text={addable ? '추가' : '조건을 선택해주세요'}
			on:click={handleClick}
		/>
	</div>
</div>
