<script lang="ts">
	import CharInput from './CharInput.svelte';
	import CharViewer from './CharViewer.svelte';
	import BossViewer from './BossViewer.svelte';
	import Title from './common/Title.svelte';
	import Hbar from './common/Hbar.svelte';
	import { store, charIndex } from '$stores';
	import { mapleDayObj } from '$stores/calendar';
	import { showModal, modalType } from '$stores/modal';
	import type { MapleDayType } from '$types';

	function deselectChar() {
		$charIndex = undefined;
	}

	function deleteChar() {
		if ($charIndex !== undefined) {
			const charName = $store[$charIndex].name;
			Object.keys($mapleDayObj).forEach(day => {
				$mapleDayObj[day as MapleDayType] = $mapleDayObj[day as MapleDayType].filter(char => char !== charName)
			})
			$store = [...$store.slice(0, $charIndex), ...$store.slice($charIndex + 1)];
			$charIndex = undefined;
		}
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
	{#if $store.length > 0}
		<div class="px-4" on:click={deselectChar}>
			<Title type="s">
				{#if $charIndex === undefined}
					캐릭터를 선택해주세요
				{:else}
					<div class="flex gap-2">
						<span class='w-[100px] whitespace-nowrap text-ellipsis overflow-hidden xs:w-[200px]'>{$store[$charIndex].name}</span>
						<span>{$store[$charIndex].class}</span>
					</div>
					<button on:click={deleteChar}><i class="fa-solid fa-trash" /></button>
				{/if}
			</Title>
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
