<script lang="ts">
	import '@fortawesome/fontawesome-free/js/all.min.js';
	import { onMount } from 'svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Modal from '$lib/components/modals/Modal.svelte';
	import { store } from '$stores';
	import { mapleDayObj } from '$stores/calendar';
	import { showModal } from '$stores/modal';
	import '../app.css';

	let isLoading: boolean = true;

	onMount(() => {
		if (localStorage.getItem('prev')) $store = JSON.parse(localStorage.getItem('prev')!);
		if (localStorage.getItem('dayObj')) $mapleDayObj = JSON.parse(localStorage.getItem('dayObj')!);
		isLoading = false;
	});
</script>

{#if isLoading}
	<div>로딩중</div>
{:else}
	{#if $showModal}
		<Modal on:click={() => ($showModal = !$showModal)} />
	{/if}
	<div class="w-full min-h-[100vh] flex justify-center bg-slate-200 md:px-4 md:pb-32 xl:px-0">
		<div class="w-full max-w-[1200px] md:px-4 flex flex-col">
			<Header />
			<main class="w-full min-h-[70vh] pb-8 justify-center gap-8">
				<slot />
			</main>
		</div>
	</div>
	<Footer />
{/if}
