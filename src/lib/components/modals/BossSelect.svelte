<script lang="ts">
	import { onMount } from 'svelte';
	import { data, char, charArr, order } from '$stores';
	import { bossInfo, bosses, boss } from '$stores/boss';
	import { showModal } from '$stores/modal';
	import type { MapleDayType, BossItemType, BossDC, CharItemType, ItemType } from '$types';
	import { dayObj } from '$stores/calendar';

	const bossNameArr = Object.keys(bossInfo);

	let selectedIdx: number | undefined = undefined;

	let day: MapleDayType = 'x';

	onMount(() => {
		$bosses = $data
			.filter((item) => item.char.name === $char.name && item.boss)
			.map((item) => item.boss!);
	});

	function selectBoss(idx: number) {
		$boss = { name: bossNameArr[idx], dc: '', headcount: 1, required: false };
		if ($bosses.filter((item) => item.name === $boss.name).length > 0) {
			$boss = $bosses.filter((item) => item.name === $boss.name)[0];
		}
		if (selectedIdx === undefined || selectedIdx !== idx) selectedIdx = idx;
		else selectedIdx = undefined;
	}

	function isExistBoss(selected: BossItemType[], bossName: keyof typeof bossInfo) {
		return selected.filter((item) => bossName === item.name).length > 0;
	}

	function isExistItem(selected: BossItemType[], bossName: keyof typeof bossInfo, dc: string) {
		return selected.filter((item) => bossName === item.name && dc === item.dc).length > 0;
	}

	function clearBoss() {
		$boss = {
			name: '',
			dc: '',
			headcount: 1,
			required: false
		};
	}

	function addBosses(selected: BossItemType[], bossName: keyof typeof bossInfo, dc: string) {
		const itemDC = dc as BossDC;
		$boss = { ...$boss, name: bossName, dc: itemDC };

		if (isExistItem(selected, bossName, dc)) {
			selected = selected.filter((item) => item.name !== bossName);
			$bosses = selected;
			clearBoss();
			return;
		}
		selected = selected.filter((item) => item.name !== bossName);
		selected.push($boss);
		selected.sort((a, b) => bossNameArr.indexOf(a.name) - bossNameArr.indexOf(b.name));
		$bosses = selected;
	}

	function handleOptions(selected: BossItemType[]) {
		if ($boss.name && $boss.dc) {
			selected = selected.filter((item) => item.name !== $boss.name);
			selected = [...selected, $boss];
			selected.sort((a, b) => bossNameArr.indexOf(a.name) - bossNameArr.indexOf(b.name));
			$bosses = selected;
		}
	}

	function addData(charItem: CharItemType, selected: BossItemType[]) {
		$data = $data.filter((item) => item.char.name !== $char.name);
		const newItems: ItemType[] = selected.map((bossItem) => {
			return { char: charItem, boss: bossItem, day };
		});
		$data = [...$data, ...newItems];
		$data.sort((a, b) => $order.indexOf(a.char.name) - $order.indexOf(b.char.name));
		localStorage.setItem('prev', JSON.stringify($data));
		$showModal = false;
	}

	function handleLoadChar(event: Event) {
		const el = event.target as HTMLSelectElement;
		const charName = el.value;
		$bosses = $data
			.filter((item) => item.char.name === charName && item.boss)
			.map((item) => item.boss!);
	}

	$: console.log($bosses);
</script>

<div
	class="w-[80vw] max-w-[768px] min-h-[40vh] p-8 flex flex-col gap-4 rounded-2xl bg-white dark:bg-neutral-500"
>
	<div
		class="max-h-[300px] grid grid-cols-1 ss:grid-cols-2 md:grid-cols-3 place-items-center gap-2 overflow-y-auto"
	>
		{#each Object.entries(bossInfo) as boss, idx}
			<div
				class="relative max-w-[240px] flex flex-col rounded-t-2xl overflow-hidden"
				on:click={() => selectBoss(idx)}
			>
				<div
					class="relative border-2 overflow-hidden"
					class:rounded-2xl={idx !== selectedIdx}
					class:border-red-500={isExistBoss($bosses, boss[0])}
				>
					<img src={bossInfo[boss[0]].image} class="aspect-video object-cover" alt={boss[0]} />
					<div class="absolute inset-0 px-6 py-4 flex items-end text-white overflow-hidden">
						<span class="text-lg font-semibold whitespace-nowrap drop-shadow-xs">{boss[0]}</span>
					</div>
				</div>
				{#if selectedIdx === idx}
					<div class="p-2 flex flex-col gap-2 border-x border-b rounded-b-2xl">
						{#each Object.entries(boss[1].dc) as values}
							<div
								class="p-2 border flex justify-between rounded-xl shadow"
								class:shadow-lg={isExistItem($bosses, boss[0], values[0])}
								on:click|stopPropagation={() => addBosses($bosses, boss[0], values[0])}
							>
								<span class:font-semibold={isExistItem($bosses, boss[0], values[0])}
									>{values[0]}</span
								>
								{#if isExistItem($bosses, boss[0], values[0])}
									<span><i class="fa-solid fa-check" /></span>
								{/if}
							</div>
						{/each}
					</div>
				{/if}
			</div>
		{/each}
	</div>

	<div
		class="self-center w-full max-w-[240px] ss:mt-2 sm:mt-4 p-2 flex flex-col 
					 items-center gap-2 border rounded-xl border-neutral-700"
	>
		<div class="flex items-center gap-2">
			<select
				class="px-2 py-1 border rounded-xl border-neutral-700"
				bind:value={$boss.headcount}
				on:change={() => handleOptions($bosses)}
				required
			>
				<option value="" disabled selected hidden>인원수</option>
				{#each [1, 2, 3, 4, 5, 6] as count}
					<option value={count}>{count}인</option>
				{/each}
			</select>
			파티
		</div>
		<div class="flex items-center gap-2">
			<select class="px-2 py-1 border rounded-xl border-neutral-700" bind:value={day} required>
				<option value="x" disabled selected hidden>요일</option>
				{#each dayObj.common as dayType}
					<option value={dayType}>{dayType}</option>
				{/each}
			</select>
			<span class="flex items-center gap-2">
				<input
					type="checkbox"
					bind:checked={$boss.required}
					on:change={() => handleOptions($bosses)}
				/>
				{#if $boss.required}
					필수
				{:else}
					선택
				{/if}
			</span>
		</div>
	</div>

	<div class="self-center w-full max-w-[240px]">
		<button
			class="w-full p-2 border rounded-xl border-neutral-700 hover:bg-neutral-500/30"
			on:click={() => addData($char, $bosses)}>추가</button
		>
	</div>

	<select
		class="self-center w-full max-w-[240px] p-2 border rounded-xl border-neutral-700"
		on:change={(e) => handleLoadChar(e)}
	>
		<option value="" disabled selected hidden>불러올 캐릭터</option>
		{#each $charArr.map((item) => item.name) as charName}
			<option value={charName}>{charName}</option>
		{/each}
	</select>
</div>
