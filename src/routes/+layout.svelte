<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import '../app.css';
	import Hbar from '$lib/components/common/Hbar.svelte';
</script>

<div class='w-full min-h-[100vh] pb-32 flex justify-center bg-slate-200'>
	<div class="w-full max-w-[1200px] flex flex-col">
		<Header />
		<main class="min-h-[70vh] flex justify-center gap-8">
			<slot />
		</main>
	</div>
</div>
<Footer />
