<script lang="ts">
	import { store, charIndex, bossInfo } from '../../stores';
	import type { BossType, BossDC } from '../../types';
	import { searchBossIndex, sortByBoss, sortByDC } from '../../utils';
	import Dropdown from './common/Dropdown.svelte';

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
		bossName = ''
		bossDC = ''
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

<div class="bg-sky-100 p-4 gap-8">
	<div class="flex flex-col gap-6">
		<div class="flex justify-between">
			{#if bossName}
				<img
					class="w-[120px] h-[120px] object-cover"
					src={`${bossInfo[bossName].image}`}
					alt="boss img"
				/>
			{:else}
				<div class="w-[120px] h-[120px] border border-black flex justify-center items-center">보스 이미지</div>
			{/if}
			<span>{bossDC}</span>
			<div class="flex gap-2">
				<button
					on:click={addBoss}
					disabled={$charIndex === undefined || bossName === '' || bossDC === ''}
				>
				<i class="fa-regular fa-square-plus fa-xl"></i>
				</button>
			</div>
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
	</div>
</div>
