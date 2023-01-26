<script lang="ts">
	import CharInput from './CharInput.svelte';
	import CharViewer from './CharViewer.svelte';
	import BossViewer from './BossViewer.svelte';
	import Title from './common/Title.svelte';
	import Hbar from './common/Hbar.svelte';

	import { charArr } from '$stores';
	import { showModal, modalType } from '$stores/modal';

	function openExportModal() {
		$modalType = 'ExportImage';
		$showModal = true;
	}
</script>

<section class="p-8 flex flex-col gap-4 rounded-3xl bg-white dark:bg-neutral-600 md:pb-16">
	<Title>
		<span>캐릭터 관리</span>
		<button on:click={openExportModal}>
			<i class="fa-solid fa-cloud-arrow-down" />
		</button>
	</Title>
	<Hbar />
	<CharInput />
	<Hbar />
	{#if $charArr.length > 0}
		<CharViewer />
		<Hbar />
		<BossViewer />
	{:else}
		<Title type="s">캐릭터를 추가해주세요</Title>
	{/if}
</section>
