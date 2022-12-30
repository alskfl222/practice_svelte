<script lang="ts">
	import '@fortawesome/fontawesome-free/js/all.min.js';
	import { browser } from '$app/env';
	import { beforeUpdate } from 'svelte';
	import Header from '$lib/pc/components/Header.svelte';
	import Footer from '$lib/pc/components/Footer.svelte';
	import { minPCInnerWidth, innerWidth, store } from '$stores';
	import '../app.css';

	beforeUpdate(() => {
		if (localStorage.getItem('prev')) {
			$store = JSON.parse(localStorage.getItem('prev')!);
		}
		$innerWidth = browser ? window.innerWidth : 800;
	});

</script>

{#if $innerWidth >= minPCInnerWidth}
	<div class="w-full min-h-[100vh] px-4 pb-32 flex justify-center bg-slate-200 xl:px-0">
		<div class="w-full min-w-[800px] max-w-[1200px] flex flex-col">
			<Header />
			<main class="min-h-[70vh] flex justify-center gap-8">
				<slot />
			</main>
		</div>
	</div>
	<Footer />
{:else}
	<div class="w-full min-h-[100vh] pb-32 flex justify-center bg-slate-200">
		<div class="w-full max-w-[1200px] flex flex-col">
			<Header />
			<main class="min-h-[70vh] flex justify-center gap-8">
				<slot />
			</main>
		</div>
	</div>
	<Footer />
{/if}
