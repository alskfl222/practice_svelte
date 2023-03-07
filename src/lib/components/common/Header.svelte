<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { darkMode } from '$stores/mode';
	import Toggle from './Toggle.svelte';

	let innerWidth: number = 0;
	let show = false;

	const selectedStyle = 'text-3xl font-bold dark:text-neutral-200';
	const normalStyle = 'text-lg dark:text-neutral-200';

	function routeToPage(route: string, replaceState: boolean = false) {
		goto(`/${route}`, { replaceState });
		show = false;
	}

	$: if ($darkMode) {
		localStorage.setItem('darkMode', 'true');
	} else {
		localStorage.setItem('darkMode', 'false');
	}
</script>

<svelte:window bind:innerWidth />

<header class="w-full h-[120px] mb-8 px-12 rounded-b-3xl bg-white dark:bg-neutral-600">
	<nav class="w-full h-full flex justify-between items-center">
		<ul class="w-full h-full flex items-center gap-6 sm:gap-9">
			<li class={$page.url.pathname === '/' ? selectedStyle : normalStyle}>
				<a href="/"><i class="fa-solid fa-house" /></a>
			</li>
			{#if innerWidth >= 360}
				<li class={$page.url.pathname === '/calendar' ? selectedStyle : normalStyle}>
					<a href="/calendar"><i class="fa-solid fa-calendar" /></a>
				</li>
				<li class={$page.url.pathname === '/about' ? selectedStyle : normalStyle}>
					<a href="/about"><i class="fa-solid fa-circle-question" /></a>
				</li>
			{:else}
				<div class="relative self-center">
					{#if show}
						<ul
							class="absolute top-5 z-10 w-[120px] max-h-[150px] mt-2 py-2 border rounded-xl
				 					border-neutral-700 dark:border-white bg-white dark:bg-neutral-500 overflow-y-auto"
						>
							{#each ['calendar', 'about'] as opt}
								<li
									class="relative h-[40px] px-3 flex items-center justify-between hover:bg-neutral-500 hover:dark:bg-neutral-200
							 				hover:text-white dark:text-white hover:dark:text-neutral-700"
									on:click={() => routeToPage(opt)}
								>
									{#if opt === 'calendar'}
										<i class="fa-solid fa-calendar" /><span>일정</span>
									{:else if opt === 'about'}
										<i class="fa-solid fa-circle-question" /><span>이 앱은?</span>
									{/if}
								</li>
							{/each}
						</ul>
					{/if}
					<div class="p-2 flex justify-center rounded-xl" on:click={() => (show = !show)}>
						<i class="fa-solid fa-bars" />
					</div>
				</div>
			{/if}
		</ul>

		<div class="flex items-center gap-2 xs:gap-4 sm:gap-8">
			<span class:text-white={$darkMode}><i class="fa-solid fa-lightbulb" /></span>
			<Toggle bind:value={$darkMode} />
		</div>
	</nav>
</header>
