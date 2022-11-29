<script lang="ts">
	import CharViewer from './CharViewer.svelte';
	import BossViewer from './BossViewer.svelte';
	import BossSelector from './BossSelector.svelte';

	import { store } from '../../stores';
</script>

{#if $store.length > 0}
	<section class="flex flex-col gap-4">
		<CharViewer />
		<BossViewer />
		<BossSelector />
	</section>
{/if}

