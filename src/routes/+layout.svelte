<script lang="ts">
	import '@fortawesome/fontawesome-free/js/all.min.js';
	import { onMount } from 'svelte';
	import Header from '$lib/components/common/Header.svelte';
	import Footer from '$lib/components/common/Footer.svelte';
	import Modal from '$lib/components/modals/Modal.svelte';
	import { data, order, charArr } from '$stores';
	import { darkMode } from '$stores/mode';
	import { showModal } from '$stores/modal';
	import '../app.css';

	let isLoading: boolean = true;

	onMount(() => {
		if (localStorage.getItem('prev')) $data = JSON.parse(localStorage.getItem('prev')!);
		$darkMode = localStorage.getItem('darkMode')
			? JSON.parse(localStorage.getItem('darkMode')!)
			: false;
		$order = $charArr.map((char) => char.name);
		isLoading = false;
	});
</script>

{#if isLoading}
	<div class:dark={$darkMode}>로딩중</div>
{:else}
	{#if $showModal}
		<Modal on:click={() => ($showModal = !$showModal)} />
	{/if}
	<div
		class="w-full min-w-[280px] min-h-[100vh] flex flex-col items-center bg-neutral-200 dark:bg-neutral-800 xl:px-0"
		class:dark={$darkMode}
	>
		<div
			class="w-full max-w-[1200px] px-4 md:px-8 flex flex-col bg-neutral-300 dark:bg-neutral-700"
		>
			<Header />
			<main class="w-full min-h-[70vh] pb-8 justify-center gap-8">
				<slot />
			</main>
		</div>
		<Footer />
	</div>
{/if}
