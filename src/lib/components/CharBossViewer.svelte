<script lang="ts">
	import CharInput from './CharInput.svelte';
	import CharViewer from './CharViewer.svelte';
	import BossViewer from './BossViewer.svelte';
	import Title from './common/Title.svelte';
	import Hbar from './common/Hbar.svelte';
	import { store, charIdx, classInfo } from '$stores';
	import { char, charArr } from '$stores/item';
	import { mapleDayObj } from '$stores/calendar';
	import { showModal, modalType } from '$stores/modal';
	import type { MapleDayType } from '$types';

	function deselectChar() {
		$charIdx = undefined;
	}

	function deleteChar() {
		if ($charIdx !== undefined) {
			const charName = $store[$charIdx].name;
			Object.keys($mapleDayObj).forEach((day) => {
				$mapleDayObj[day as MapleDayType] = $mapleDayObj[day as MapleDayType].filter(
					(char) => char !== charName
				);
			});
			$store = [...$store.slice(0, $charIdx), ...$store.slice($charIdx + 1)];
			$charIdx = undefined;
		}
	}

	function onSelect(e: Event) {
		const target = e.target as HTMLSelectElement;
		const value = target.value.split('-')
		$char.name = value[0]
		$char.class = value[1]
		$char.group = classInfo[$char.class].group
	}

	function openExportModal() {
		$modalType = 'ExportImage';
		$showModal = true;
	}
</script>

<section
	class="px-4 pb-8 rounded-3xl bg-white
				 md:px-8 md:pb-16"
>
	<Title
		><span>캐릭터 관리</span><button on:click={openExportModal}
			><i class="fa-solid fa-cloud-arrow-down" /></button
		></Title
	>
	<Hbar />
	<CharInput />
	<Hbar />
	{#if $charArr.length > 0}
		<div class="px-4" on:click={deselectChar}>
			<!-- <Title type="s">
				{#if $charIdx === undefined}
					캐릭터를 선택해주세요
				{:else}
					<div class="flex gap-2">
						<span class='w-[100px] whitespace-nowrap text-ellipsis overflow-hidden xs:w-[200px]'>{$store[$charIdx].name}</span>
						<span>{$store[$charIdx].class}</span>
					</div>
					<button on:click={deleteChar}><i class="fa-solid fa-trash" /></button>
				{/if}
			</Title> -->
			{#if !$char.name}
				캐릭터를 선택해주세요
			{/if}
			<select
				on:change={onSelect}
				class="w-[100%] max-w-[240px] px-4 py-2 border rounded-lg border-slate-700"
				required
			>
				<option value="" disabled selected hidden>캐릭터 - 직업</option>
				{#each $charArr as char}
					<option value={`${char.name}-${char.class}`}>{char.name} - {char.class}</option>
				{/each}
			</select>
			<CharViewer />
		</div>
		<Hbar />
		<BossViewer />
	{:else}
		<div class="md:px-4">
			<Title type="s">캐릭터를 추가해주세요</Title>
		</div>
	{/if}
</section>
