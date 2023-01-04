<script lang="ts">
	import { fly } from 'svelte/transition';
	import CharBossViewer from '$lib/components/pc/CharBossViewer.svelte';
	import BossCounter from '$lib/components/pc/BossCounter.svelte';
	import Sidebar from '$lib/components/pc/Sidebar.svelte';
	import CharBossViewerM from '$lib/components/mobile/CharBossViewer.svelte';
	import BossCounterM from '$lib/components/mobile/BossCounter.svelte';
	import StatusBar from '$lib/components/mobile/StatusBar.svelte';
	import { platform } from '$stores';
</script>

<svelte:head>
	<title>START</title>
	<meta name="description" content="Practice Sveltekit" />
</svelte:head>

{#if $platform === 'pc'}
	<div class="w-full flex gap-8" in:fly>
		<div class="w-full flex flex-col gap-8">
			<CharBossViewer />
			<BossCounter />
		</div>
		<Sidebar />
	</div>
{:else}
	<div class="w-full flex gap-8" in:fly>
		<div class="w-full flex flex-col gap-8">
			<CharBossViewerM />
			<BossCounterM />
		</div>
		<StatusBar />
	</div>
{/if}
