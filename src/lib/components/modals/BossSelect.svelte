<script lang="ts">
	import Button from '../common/Button.svelte';
	import Dropdown from '../common/Dropdown.svelte';
	import Title from '../common/Title.svelte';
	import Hbar from '../common/Hbar.svelte';
	import { store, charIndex } from '$stores';
	import { bossInfo, selectBoss } from '$stores/boss';
	import type { BossType, BossDCType, HeadcountType, RequiredType } from '$types';
	import { searchBossIndex, sortByBoss, sortByDC } from '$utils';

	function handleSelect(event: CustomEvent) {
		switch (event.type) {
			case 'bossName':
				$selectBoss.bossName = event.detail;
				$selectBoss.bossDC = '';
				break;
			case 'bossDC':
				$selectBoss.bossDC = event.detail;
				break;
			default:
				return;
		}
	}

	function handleClick(event: CustomEvent) {
		if (event.type === 'click') addBoss();
	}

	function addBoss() {
		const charBossIndex = searchBossIndex($store[$charIndex!].boss, $selectBoss.bossName);
		$store[$charIndex!].boss = newBossArr($store[$charIndex!].boss, charBossIndex);
		localStorage.setItem('prev', JSON.stringify($store));
		$selectBoss = {
			bossName: '',
			bossDC: '',
			headcount: 1,
			required: false
		};
	}

	function newBossArr(arr: BossType[], index: number) {
		let res = arr.slice();
		const item: [keyof BossDCType, HeadcountType, RequiredType] = [
			$selectBoss.bossDC as keyof BossDCType,
			$selectBoss.headcount,
			$selectBoss.required
		];
		const imgHref = bossInfo[$selectBoss.bossName].image;
		if (index === -1) {
			res.push({ name: $selectBoss.bossName as keyof typeof bossInfo, image: imgHref, dc: [item] });
		} else {
			const dcArr = res[index].dc.map((x) => x[0]);
			if (dcArr.includes($selectBoss.bossDC as keyof BossDCType)) {
				res[index].dc = res[index].dc.filter(
					(x) => x[0] !== ($selectBoss.bossDC as keyof BossDCType)
				);
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
	$: addable = $charIndex !== undefined && $selectBoss.bossName !== '' && $selectBoss.bossDC !== '';
</script>

<div class="min-h-[40vh] p-8 flex flex-col rounded-2xl bg-white">
	<div class="flex flex-col py-8 gap-4 sm:flex-row">
		<div class="w-[180px]">
			<span class="font-bold">보스</span>
			<Dropdown type="bossName" options={Object.keys(bossInfo)} on:bossName={handleSelect}
				>{#if $selectBoss.bossName}
					<img
						class="w-[180px] h-[180px] rounded-xl object-cover"
						src={`${bossInfo[$selectBoss.bossName].image}`}
						alt={$selectBoss.bossName}
					/>
				{:else}
					<div
						class="w-[180px] h-[180px] border rounded-xl border-black flex justify-center items-center"
					>
						<i class="fa-solid fa-question" />
					</div>
				{/if}</Dropdown
			>
		</div>
		<div class="flex flex-col justify-between">
			<div class="w-[180px]">
				<span class="font-bold">난이도</span>
				<Dropdown
					type="bossDC"
					options={$selectBoss.bossName !== ''
						? Object.keys(bossInfo[$selectBoss.bossName].dc)
						: ['보스가 없습니다']}
					on:bossDC={handleSelect}
				>
					{#if $selectBoss.bossDC}
						<div
							class="w-[180px] h-[72px] border rounded-xl border-black flex justify-center items-center"
						>
							{$selectBoss.bossDC}
						</div>
					{:else}
						<div
							class="w-[180px] h-[72px] border rounded-xl border-black flex justify-center items-center"
						>
							<i class="fa-solid fa-question" />
						</div>
					{/if}</Dropdown
				>
			</div>

			<div class="w-[180px]">
				<span class="font-bold">옵션</span>
				<div
					class="relative h-[72px] px-2 flex flex-col justify-center items-center gap-1 border rounded-xl border-black"
				>
					<div class="flex items-center gap-2">
						<select bind:value={$selectBoss.headcount} required>
							<option value="" disabled selected hidden>직업</option>
							{#each [1, 2, 3, 4, 5, 6] as count}
								<option value={count}>{count}인</option>
							{/each}
						</select>
						파티
					</div>
					<span class="flex items-center gap-2"
						><input type="checkbox" bind:checked={$selectBoss.required} />
						{#if $selectBoss.required}
							필수
						{:else}
							선택
						{/if}</span
					>
				</div>
			</div>
		</div>
	</div>
	<Hbar />
	<div class="py-4 flex justify-center sm:py-8">
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
