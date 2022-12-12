<script lang="ts">
	import CharInput from './CharInput.svelte';
	import CharViewer from './CharViewer.svelte';
	import BossViewer from './BossViewer.svelte';
	import { store } from '../../stores';
</script>

<section>
	<CharInput />
	{#if $store.length > 0}
		<section class="flex flex-col gap-4">
			<CharViewer />
			<BossViewer />
		</section>
	{:else}
		<section>캐릭터를 추가해주세요</section>
	{/if}
</section>
