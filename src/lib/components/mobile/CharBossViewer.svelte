<script lang="ts">
	import CharInput from './CharInput.svelte';
	import CharViewer from './CharViewer.svelte';
	import BossViewer from './BossViewer.svelte';
	import Title from './common/Title.svelte';
	import Hbar from './common/Hbar.svelte';
	import { store, charIndex } from '$stores';

	function deselectChar() {
		$charIndex = undefined;
	}
</script>

<section class="px-4 pb-8 rounded-3xl bg-white">
	<Title>캐릭터 관리</Title>
	<Hbar />
	<CharInput />
	<Hbar />
	{#if $store.length > 0}
		<div on:click={deselectChar}>
			<Title type="s"
				>{$charIndex === undefined ? '캐릭터를 선택해주세요' : $store[$charIndex].name}</Title
			>
			<CharViewer />
		</div>
		<Hbar />
		<BossViewer />
	{:else}
		<div>
			<Title type="s">캐릭터를 추가해주세요</Title>
		</div>
	{/if}
</section>
