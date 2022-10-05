<script lang="ts">
	import Header from '$lib/header/Header.svelte';
	import '../app.css';
</script>

<div class="w-full flex flex-col">
	<Header />

	<main class="min-h-[50vh]">
		<slot />
	</main>

	<footer>
		<p>by <strong>alskfl222</strong></p>
	</footer>
</div>
