<script lang="ts">
	import CharBossViewer from '$lib/components/CharBossViewer.svelte';
	import BossCounter from '$lib/components/BossCounter.svelte';
	import Sidebar from '$lib/sidebar/Sidebar.svelte';
</script>

<svelte:head>
	<title>START</title>
	<meta name="description" content="Practice Sveltekit" />
</svelte:head>

<div class='flex'>
	<div>
		<CharBossViewer />
		<BossCounter />
	</div>
	<Sidebar />
</div>
