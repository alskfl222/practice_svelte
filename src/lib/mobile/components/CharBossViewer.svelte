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

<section class="rounded-3xl bg-white">
	<div class="px-8 pb-16">
		<Title>캐릭터 관리</Title>
		<Hbar />
		<CharInput />
		<Hbar />
		{#if $store.length > 0}
			<div class="px-4" on:click={deselectChar}>
				<Title type="s">캐릭터 상세</Title>
				<CharViewer />
			</div>
			<Hbar />
			<BossViewer />
		{:else}
			<div class="px-4">
				<Title type="s">캐릭터 상세</Title>
			</div>
			<Hbar />
			<div class="px-8 pt-4 text-lg font-bold text-slate-700">캐릭터를 추가해주세요</div>
		{/if}
	</div>
</section>
