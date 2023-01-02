<script lang="ts">
	import Button from './common/Button.svelte';
	import Dropdown from './common/Dropdown.svelte';
	import Title from './common/Title.svelte';
	import Hbar from './common/Hbar.svelte';
	import { store, charIndex, counterIndex, bossInfo } from '$stores';
	import type { BossType, BossDCType, HeadcountType, RequiredType } from '$types';
	import { searchBossIndex, sortByBoss, sortByDC } from '$utils';

	let bossName: keyof typeof bossInfo | '' = '';
	let bossDC: keyof BossDCType | '' = '';
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
		localStorage.setItem('prev', JSON.stringify($store));
		resetStatus();
	}

	function newBossArr(arr: BossType[], index: number) {
		let res = arr.slice();
		const item: [keyof BossDCType, HeadcountType, RequiredType] = [bossDC as keyof BossDCType, headcount, required];
		const imgHref = bossInfo[bossName].image;
		if (index === -1) {
			res.push({ name: bossName as keyof typeof bossInfo, image: imgHref, dc: [item] });
		} else {
			const dcArr = res[index].dc.map((x) => x[0]);
			if (dcArr.includes(bossDC as keyof BossDCType)) {
				res[index].dc = res[index].dc.filter((x) => x[0] !== (bossDC as keyof BossDCType));
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
	<Title>보스 추가</Title>
	<Hbar />
	<div class="pb-12 flex flex-col items-center gap-4">
		<div class="flex flex-col gap-2">
			{#if bossName}
				<img
					class="w-[160px] h-[160px] rounded-xl object-cover"
					src={`${bossInfo[bossName].image}`}
					alt="boss img"
				/>
				<div
					class="w-[160px] h-[48px] border rounded-xl border-black flex justify-center items-center"
				>
					{bossDC}
				</div>
				<div
					class="w-[160px] h-[48px] border rounded-xl border-black flex justify-center items-center"
				>
					{headcount}인 파티, {required ? '필수!' : '선택?'}
				</div>
			{:else}
				<div
					class="w-[160px] h-[160px] border rounded-xl border-black flex justify-center items-center"
				>
					<i class="fa-solid fa-question" />
				</div>
				<div
					class="w-[160px] h-[48px] border rounded-xl border-black flex justify-center items-center"
				>
					<i class="fa-solid fa-question" />
				</div>
				<div
					class="w-[160px] h-[48px] border rounded-xl border-black flex justify-center items-center"
				>
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
				options={bossName !== '' ? Object.keys(bossInfo[bossName].dc) : ['보스가 없습니다']}
				on:bossDC={handleSelect}
			/>
		</div>

		<div class="w-[160px]">
			<span class="font-bold">옵션</span>
			<div
				class="relative h-[72px] px-2 flex flex-col justify-center items-center gap-1 border rounded-xl border-black"
			>
				<div class="flex items-center gap-2">
					<select bind:value={headcount} required>
						<option value="" disabled selected hidden>직업</option>
						{#each [1, 2, 3, 4, 5, 6] as count}
							<option value={count}>{count}인</option>
						{/each}
					</select>
					파티
				</div>
				<span class="flex items-center gap-2"
					><input type="checkbox" bind:checked={required} />
					{#if required}
						필수
					{:else}
						선택
					{/if}</span
				>
			</div>
		</div>

		{#if addable}
			<Button on:click={handleClick}><span slot="text">추가</span></Button>
		{:else}
			<Button disabled popup on:click={handleClick}
				><span slot="text">추가</span>
				<div slot="popup">
					<p class="whitespace-nowrap">보스와 난이도를</p>
					<p class="whitespace-nowrap">모두 선택해 주세요</p>
				</div></Button
			>
		{/if}
	</div>
</div>
