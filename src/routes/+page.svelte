<script lang="ts">
	import { fly } from 'svelte/transition';
	import CharBossViewer from '$lib/components/CharBossViewer.svelte';
	import BossCounter from '$lib/components/BossCounter.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
</script>

<svelte:head>
	<title>START</title>
	<meta name="description" content="Practice Sveltekit" />
</svelte:head>


	<div class="w-full flex gap-8" in:fly>
		<div class="w-full flex flex-col gap-8 xl:w-[calc(100%-272px)]">
			<CharBossViewer />
			<BossCounter />
		</div>
		<Sidebar />
	</div>
