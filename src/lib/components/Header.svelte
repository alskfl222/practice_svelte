<script lang="ts">
	import { page } from '$app/stores';

	const selectedStyle = 'text-3xl font-bold';
	const normalStyle = 'text-lg'
</script>

<header class="w-full h-[90px] mb-8 px-12 rounded-b-3xl bg-white">
	<nav class="w-full h-full">
		<ul class="w-full h-full flex justify-between items-center">
			<li class={$page.url.pathname === '/' ? selectedStyle : normalStyle}>
				<a sveltekit:prefetch href="/">Home</a>
			</li>
			<li class:text-3xl={$page.url.pathname === '/about' ? selectedStyle : normalStyle}>
				<a sveltekit:prefetch href="/about">About</a>
			</li>
		</ul>
	</nav>
</header>
