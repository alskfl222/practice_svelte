<script lang="ts">
	import { page } from '$app/stores';
</script>

<header class="w-full mb-8 flex justify-center">
	<nav class="w-full flex justify-center">
		<ul class="w-full flex justify-between">
			<li class:text-3xl={$page.url.pathname === '/'}><a sveltekit:prefetch href="/">Home</a></li>
			<li class:text-3xl={$page.url.pathname === '/about'}>
				<a sveltekit:prefetch href="/about">About</a>
			</li>
		</ul>
	</nav>
</header>
