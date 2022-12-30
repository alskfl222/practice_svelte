<script lang="ts">
	import CharBossViewer from '$lib/pc/components/CharBossViewer.svelte';
	import BossCounter from '$lib/pc/components/BossCounter.svelte';
	import Sidebar from '$lib/pc/components/Sidebar.svelte';
</script>

<svelte:head>
	<title>START</title>
	<meta name="description" content="Practice Sveltekit" />
</svelte:head>

<div class='w-full flex gap-8'>
	<div class='w-full flex flex-col gap-8'>
		<CharBossViewer />
		<BossCounter />
	</div>
	<Sidebar />
</div>
