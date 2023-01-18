<script lang="ts">
	import Button from '../common/Button.svelte';
	import Dropdown from '../common/Dropdown.svelte';
	import { data, char } from '$stores';
	import { bossInfo, boss } from '$stores/boss';
	import type { MapleDayType } from '$types';

	function handleSelect(event: CustomEvent) {
		switch (event.type) {
			case 'bossName':
				$boss.name = event.detail;
				$boss.dc = '';
				break;
			case 'bossDC':
				$boss.dc = event.detail;
				break;
			default:
				return;
		}
	}

	function registItem(_: CustomEvent) {
		const rest = $data.filter((item) => item.char.name !== $char.name);
		const charItemArr = $data.filter((item) => item.char.name === $char.name && item.boss);
		const isExist =
			$data.filter(
				(item) =>
					item.char.name === $char.name &&
					item.boss &&
					item.boss.name === $boss.name &&
					item.boss.dc === $boss.dc
			).length > 0;
		if (!isExist) {
			const item = {
				char: { ...$char },
				boss: { ...$boss },
				day: 'x' as MapleDayType
			};

			$data = [...rest, ...charItemArr, item];
			localStorage.setItem('prev', JSON.stringify($data));
			clearBoss();
		}
	}

	function clearBoss() {
		$boss = {
			name: '',
			dc: '',
			headcount: 1,
			required: false,
		};
	}

	$: itemAble = $char.name && $boss.name && $boss.dc;
</script>

<div class="min-h-[40vh] p-8 flex flex-col rounded-2xl bg-white">
	<div class="flex flex-col py-4 gap-4 sm:flex-row">
		<div class="w-[150px]">
			<span class="font-bold">보스</span>
			<Dropdown type="bossName" options={Object.keys(bossInfo)} on:bossName={handleSelect}
				>{#if $boss.name}
					<img
						class="w-[150px] h-[150px] rounded-xl object-cover"
						src={`${bossInfo[$boss.name].image}`}
						alt={$boss.name}
					/>
				{:else}
					<div
						class="w-[150px] h-[150px] border rounded-xl border-black flex justify-center items-center"
					>
						<i class="fa-solid fa-question" />
					</div>
				{/if}</Dropdown
			>
		</div>
		<div class="flex flex-col justify-between gap-2">
			<div class="w-[150px]">
				<span class="font-bold">난이도</span>
				<Dropdown
					type="bossDC"
					options={$boss.name ? Object.keys(bossInfo[$boss.name].dc) : ['보스가 없습니다']}
					on:bossDC={handleSelect}
				>
					{#if $boss.dc}
						<div
							class="w-[150px] h-[60px] border rounded-xl border-black flex justify-center items-center"
						>
							{$boss.dc}
						</div>
					{:else}
						<div
							class="w-[150px] h-[60px] border rounded-xl border-black flex justify-center items-center"
						>
							<i class="fa-solid fa-question" />
						</div>
					{/if}</Dropdown
				>
			</div>
			<div class="w-[150px]">
				<span class="font-bold">옵션</span>
				<div
					class="relative h-[60px] p-4 flex flex-col justify-center items-center gap-1 border rounded-xl border-black"
				>
					<div class="flex items-center gap-2">
						<select bind:value={$boss.headcount} required>
							<option value="" disabled selected hidden>직업</option>
							{#each [1, 2, 3, 4, 5, 6] as count}
								<option value={count}>{count}인</option>
							{/each}
						</select>
						파티
					</div>
					<span class="flex items-center gap-2"
						><input type="checkbox" bind:checked={$boss.required} />
						{#if $boss.required}
							필수
						{:else}
							선택
						{/if}</span
					>
				</div>
			</div>
		</div>
	</div>
	<div class="w-full py-4 flex flex-col gap-4 sm:flex-row sm:py-8">
		{#if itemAble}
			<Button on:click={registItem}><span slot="text"><i class="fa-solid fa-plus" /></span></Button>
		{:else}
			<Button disabled popup
				><span slot="text"><i class="fa-solid fa-plus" /></span>
				<div slot="popup">
					<p class="whitespace-nowrap">보스와 난이도를</p>
					<p class="whitespace-nowrap">모두 선택해 주세요</p>
				</div></Button
			>
		{/if}
		<Button on:click={() => clearBoss()}
			><span slot="text"><i class="fa-solid fa-rotate-right" /></span></Button
		>
	</div>
</div>
