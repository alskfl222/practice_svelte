<script lang="ts">
	import Header from '$lib/header/Header.svelte';
	import '../app.css';
</script>

<div class='w-full min-h-[100vh] flex justify-center bg-slate-200'>
	<div class="w-full max-w-[1200px] flex flex-col">
		<Header />
		<main class="min-h-[70vh] flex justify-center">
			<slot />
		</main>
		<footer>
			<p>by <strong>alskfl222</strong></p>
		</footer>
	</div>
</div>
