<script lang="ts">
	import CharInput from './CharInput.svelte';
	import CharViewer from './CharViewer.svelte';
	import BossViewer from './BossViewer.svelte';
	import { store } from '../../stores';
	import Title from './common/Title.svelte';
	import Hbar from './common/Hbar.svelte';
</script>

<section>
	<Title title="캐릭터 관리" />
	<Hbar />
	<CharInput />
	<Hbar />

	{#if $store.length > 0}
		<CharViewer />
		<BossViewer />
	{:else}
		<div class="p-4">캐릭터를 추가해주세요</div>
	{/if}
	
</section>
