<script lang="ts">
	import CharInput from './CharInput.svelte';
	import CharViewer from './CharViewer.svelte';
	import BossViewer from './BossViewer.svelte';
	import Title from './common/Title.svelte';
	import Hbar from './common/Hbar.svelte';
	import { store, charIndex } from '$stores';
	import { showModal, modalType } from '$stores/modal';

	function deselectChar() {
		$charIndex = undefined;
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
			<Title type="s"
				>{$charIndex === undefined ? '캐릭터를 선택해주세요' : $store[$charIndex].name}</Title
			>
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
