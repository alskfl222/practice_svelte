<script lang="ts">
	import { page } from '$app/stores';

	const selectedStyle = 'text-3xl font-bold';
	const normalStyle = 'text-lg'
</script>

<header class="w-full h-[90px] mb-8 px-12 rounded-b-3xl bg-white">
	<nav class="w-full h-full">
		<ul class="w-full h-full flex justify-between items-center">
			<li class={$page.url.pathname === '/' ? selectedStyle : normalStyle}>
				<a href="/"><i class="fa-solid fa-house" /></a>
			</li>
			<li class={$page.url.pathname === '/calendar' ? selectedStyle : normalStyle}>
				<a href="/calendar"><i class="fa-solid fa-calendar"></i></a>
			</li>
			<li class={$page.url.pathname === '/about' ? selectedStyle : normalStyle}>
				<a href="/about"><i class="fa-solid fa-circle-question" /></a>
			</li>
		</ul>
	</nav>
</header>
