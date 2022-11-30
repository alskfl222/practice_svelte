<script lang="ts">
	import CharViewer from './CharViewer.svelte';
	import BossViewer from './BossViewer.svelte';
	import BossSelector from './BossSelector.svelte';

	import { store, charIndex } from '../../stores';
</script>

{#if $store.length > 0}
	<section class="flex flex-col gap-4">
		<CharViewer />
		<div class="grid grid-cols-4">
			<BossViewer />
			{#if $charIndex !== undefined}
				<BossSelector />
			{/if}
		</div>
	</section>
{:else}
	<section>캐릭터를 추가해주세요</section>
{/if}
