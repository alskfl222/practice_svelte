<script lang="ts">
	import Button from './common/Button.svelte';
	import Dropdown from './common/Dropdown.svelte';
	import Title from './common/Title.svelte';
	import Hbar from './common/Hbar.svelte';
	import { store, charIndex, counterIndex, bossInfo } from '../../stores';
	import type { BossType, BossDC, Headcount, Required } from '../../types';
	import { searchBossIndex, sortByBoss, sortByDC } from '../../utils';

	let bossName: keyof typeof bossInfo | '' = '';
	let bossDC: keyof BossDC | '' = '';
	let headcount: number = 1;
	let required: boolean = false;

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

	function resetStatus() {
		bossName = '';
		bossDC = '';
		headcount = 1;
		required = false;
		$counterIndex = undefined;
	}

	function addBoss() {
		const charBossIndex = searchBossIndex($store[$charIndex!].boss, bossName);
		$store[$charIndex!].boss = newBossArr($store[$charIndex!].boss, charBossIndex);
		resetStatus();
	}

	function newBossArr(arr: BossType[], index: number) {
		let res = arr.slice();
		const item: [keyof BossDC, Headcount, Required] = [bossDC as keyof BossDC, headcount, required];
		const imgHref = bossInfo[bossName].image;
		if (index === -1) {
			res.push({ name: bossName as keyof typeof bossInfo, image: imgHref, dc: [item] });
		} else {
			const dcArr = res[index].dc.map((x) => x[0]);
			if (dcArr.includes(bossDC as keyof BossDC)) {
				res[index].dc = res[index].dc.filter((x) => x[0] !== (bossDC as keyof BossDC));
				if (res[index].dc.length === 0) {
					res = [...res.slice(0, index), ...res.slice(index + 1)];
				}
			} else {
				res[index].dc.push(item);
				res[index].dc = sortByDC(res[index].dc);
			}
		}
		res = sortByBoss(res);
		return res;
	}
	$: addable = $charIndex !== undefined && bossName !== '' && bossDC !== '';
</script>

<div class="flex flex-col rounded-2xl bg-white">
	<Title>보스</Title>
	<Hbar />
	<div class="pb-12 flex flex-col items-center gap-4">
		<div class="flex flex-col gap-2">
			{#if bossName}
				<img
					class="w-[160px] h-[160px] object-cover"
					src={`${bossInfo[bossName].image}`}
					alt="boss img"
				/>
				<div class="w-[160px] h-[48px] border border-black flex justify-center items-center">
					{bossDC}
				</div>
				<div class="w-[160px] h-[48px] border border-black flex justify-center items-center">
					{headcount}인 파티, {required ? '필수!' : '선택?'}
				</div>
			{:else}
				<div class="w-[160px] h-[160px] border border-black flex justify-center items-center">
					<i class="fa-solid fa-question" />
				</div>
				<div class="w-[160px] h-[48px] border border-black flex justify-center items-center">
					<i class="fa-solid fa-question" />
				</div>
				<div class="w-[160px] h-[48px] border border-black flex justify-center items-center">
					<i class="fa-solid fa-list" />
				</div>
			{/if}
		</div>
		<div class="w-[160px]">
			<span class="font-bold">보스</span>
			<Dropdown
				type="bossName"
				value={bossName}
				options={Object.keys(bossInfo)}
				on:bossName={handleSelect}
			/>
		</div>
		<div class="w-[160px]">
			<span class="font-bold">난이도</span>
			<Dropdown
				type="bossDC"
				value={bossDC}
				options={bossName !== ''
					? Object.keys(bossInfo[bossName].dc)
					: ['보스를 먼저 선택해주세요']}
				on:bossDC={handleSelect}
			/>
		</div>

		<Button disabled={!addable} on:click={handleClick}
			>{addable ? '추가' : '선택을 완료해주세요'}</Button
		>
	</div>
</div>
