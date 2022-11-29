<script lang="ts">
	import CharInput from '$lib/components/CharInput.svelte';
	import CharBossViewer from '$lib/components/CharBossViewer.svelte';
	import BossCounter from '$lib/components/BossCounter.svelte';
</script>

<svelte:head>
	<title>START</title>
	<meta name="description" content="Practice Sveltekit" />
</svelte:head>

<CharInput />

<CharBossViewer />

<BossCounter />