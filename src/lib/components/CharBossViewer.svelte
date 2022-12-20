<script lang="ts">
	import CharInput from './CharInput.svelte';
	import CharViewer from './CharViewer.svelte';
	import BossViewer from './BossViewer.svelte';
	import Title from './common/Title.svelte';
	import Hbar from './common/Hbar.svelte';
	import { store } from '../../stores';
</script>

<section>
	<Title text="캐릭터 관리" />
	<Hbar />
	<CharInput />
	<Hbar />

	<div class="px-8">
		<Title text="캐릭터 상세" type="s" />
		{#if $store.length > 0}
			<CharViewer />
			<BossViewer />
		{:else}
			<div class="px-4 pb-16 text-lg font-bold text-slate-700">캐릭터를 추가해주세요</div>
		{/if}
	</div>
</section>
