<script lang="ts">
	import '@fortawesome/fontawesome-free/js/all.min.js';
	import { browser } from '$app/env';
	import { onMount } from 'svelte';
	import Header from '$lib/components/pc/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Modal from '$lib/components/pc/modals/Modal.svelte';
	import HeaderM from '$lib/components/mobile/Header.svelte';
	import ModalM from '$lib/components/mobile/modals/Modal.svelte';
	import { minPCInnerWidth, platform, store } from '$stores';
	import { showModal } from '$stores/modal';
	import '../app.css';

	let isLoading: boolean = true;

	onMount(() => {
		if (localStorage.getItem('prev')) {
			$store = JSON.parse(localStorage.getItem('prev')!);
		}
		if (browser) {
			$platform = window.innerWidth >= minPCInnerWidth ? 'pc' : 'mobile';
		}
		isLoading = false;
	});
</script>

{#if isLoading}
	<div>로딩중</div>
{:else if $platform === 'pc'}
	{#if $showModal}
		<Modal on:click={() => ($showModal = !$showModal)} />
	{/if}
	<div class="w-full min-h-[100vh] px-4 pb-32 flex justify-center bg-slate-200 xl:px-0">
		<div class="w-full min-w-[768px] max-w-[1200px] flex flex-col">
			<Header />
			<main class="w-full min-h-[70vh] justify-center gap-8">
				<slot />
			</main>
		</div>
	</div>
	<Footer />
{:else}
	{#if $showModal}
		<ModalM on:click={() => ($showModal = !$showModal)} />
	{/if}
	<div class="w-full flex flex-col justify-center bg-slate-200">
		<HeaderM />
		<main class="min-h-[80vh] pb-8">
			<slot />
		</main>
	</div>
	<Footer />
{/if}
