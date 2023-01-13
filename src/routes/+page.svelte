<script lang="ts">
	import type { ComponentType } from 'svelte';
	import { fly } from 'svelte/transition';

	let CharBossViewer: ComponentType;
	let BossCounter: ComponentType;
	let Sidebar: ComponentType;

	import('$lib/components/CharBossViewer.svelte').then((res) => (CharBossViewer = res.default));
	import('$lib/components/BossCounter.svelte').then((res) => (BossCounter = res.default));
	import('$lib/components/common/Sidebar.svelte').then((res) => (Sidebar = res.default));
</script>

<svelte:head>
	<title>보스 관리</title>
	<meta name="description" content="보스 관리" />
</svelte:head>

<div class="w-full flex gap-8" in:fly>
	{#if CharBossViewer && BossCounter && Sidebar}
		<div class="w-full flex flex-col gap-8 xl:w-[calc(100%-272px)]">
			<svelte:component this={CharBossViewer}/>
			<svelte:component this={BossCounter}/>
		</div>
		<svelte:component this={Sidebar}/>
	{/if}
</div>
