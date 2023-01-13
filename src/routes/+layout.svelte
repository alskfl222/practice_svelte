<script lang="ts">
	import '@fortawesome/fontawesome-free/js/all.min.js';
	import { onMount } from 'svelte';
	import Header from '$lib/components/common/Header.svelte';
	import Footer from '$lib/components/common/Footer.svelte';
	import Modal from '$lib/components/modals/Modal.svelte';
	import { data, order, charArr } from '$stores';
	import { showModal } from '$stores/modal';
	import '../app.css';

	let isLoading: boolean = true;

	onMount(() => {
		if (localStorage.getItem('prev')) $data = JSON.parse(localStorage.getItem('prev')!);
		$order = $charArr.map(char => char.name)
		// if (localStorage.getItem('dayObj')) $mapleDayObj = JSON.parse(localStorage.getItem('dayObj')!);
		isLoading = false;
	});
</script>

{#if isLoading}
	<div>로딩중</div>
{:else}
	{#if $showModal}
		<Modal on:click={() => ($showModal = !$showModal)} />
	{/if}
	<div class="w-full min-w-[280px] min-h-[100vh] flex flex-col items-center bg-slate-200 xl:px-0">
		<div class="w-full max-w-[1200px] px-4 md:px-8 flex flex-col">
			<Header />
			<main class="w-full min-h-[70vh] pb-8 justify-center gap-8">
				<slot />
			</main>
		</div>
		<Footer />
	</div>
{/if}
