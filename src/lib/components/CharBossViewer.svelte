<script lang="ts">
	import CharInput from './CharInput.svelte';
	import CharViewer from './CharViewer.svelte';
	import BossViewer from './BossViewer.svelte';
	import Title from './common/Title.svelte';
	import Hbar from './common/Hbar.svelte';
	import { store, charIndex } from '../../stores';

	function deselectChar() {
		$charIndex = undefined;
	}
</script>

<section class="rounded-3xl bg-white">
	<Title>캐릭터 관리</Title>
	<Hbar />
	<CharInput />
	<Hbar />

	<div class="px-8 pb-16">
		{#if $store.length > 0}
			<div on:click={deselectChar}>
				<Title type="s">캐릭터 상세</Title>
				<CharViewer />
			</div>
			<BossViewer />
		{:else}
			<Title type="s">캐릭터 상세</Title>
			<div class="px-4 text-lg font-bold text-slate-700">캐릭터를 추가해주세요</div>
		{/if}
	</div>
</section>
