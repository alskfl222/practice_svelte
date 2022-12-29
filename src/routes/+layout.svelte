<script lang="ts">
	import '@fortawesome/fontawesome-free/js/all.min.js';
	import '../app.css';
	import { beforeUpdate } from 'svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { store } from '../stores';

	beforeUpdate(() => {
		if (localStorage.getItem('prev')) {
			$store = JSON.parse(localStorage.getItem('prev')!)
		}
	})
</script>

<div class="w-full min-h-[100vh] pb-32 flex justify-center bg-slate-200">
	<div class="w-full max-w-[1200px] flex flex-col">
		<Header />
		<main class="min-h-[70vh] flex justify-center gap-8">
			<slot />
		</main>
	</div>
</div>
<Footer />
