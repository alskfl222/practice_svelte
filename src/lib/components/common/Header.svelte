<script lang="ts">
	import { page } from '$app/stores';
	import { darkMode } from '$stores/mode';
	import Toggle from './Toggle.svelte';

	const selectedStyle = 'text-3xl font-bold dark:text-neutral-200';
	const normalStyle = 'text-lg dark:text-neutral-200';

	$: if ($darkMode) {
		localStorage.setItem('darkMode', 'true');
	} else {
		localStorage.setItem('darkMode', 'false');
	}
</script>

<header class="w-full h-[120px] mb-8 px-12 rounded-b-3xl bg-white dark:bg-neutral-600">
	<nav class="w-full h-full flex justify-between items-center">
		<ul class="w-full h-full flex items-center gap-6 sm:gap-9">
			<li class={$page.url.pathname === '/' ? selectedStyle : normalStyle}>
				<a href="/"><i class="fa-solid fa-house" /></a>
			</li>
			<li class={$page.url.pathname === '/calendar' ? selectedStyle : normalStyle}>
				<a href="/calendar"><i class="fa-solid fa-calendar" /></a>
			</li>
		</ul>
		<div class="flex flex-col xs:flex-row items-center gap-4 sm:gap-8">
			<div class={$page.url.pathname === '/about' ? selectedStyle : normalStyle}>
				<a href="/about"><i class="fa-solid fa-circle-question" /></a>
			</div>
			<div class="flex items-center gap-2">
				<Toggle bind:value={$darkMode} />
				<span class:text-white={$darkMode}><i class="fa-solid fa-lightbulb" /></span>
			</div>
		</div>
	</nav>
</header>
