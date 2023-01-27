<script lang="ts">
	import type { ComponentType } from 'svelte';
	import BossSelect from './BossSelect.svelte';
	import ExportImage from './ExportImage.svelte';
	import ItemSelect from './ItemSelectModal.svelte';
	import Message from './Message.svelte';
	import { modalType } from '$stores/modal';
	import { darkMode } from '$stores/mode';

	const component: { [key in string]: ComponentType } = {
		BossSelect,
		ExportImage,
		ItemSelect,
		Message
	};
</script>

{#if $modalType}
	<div
		on:click|self
		class="fixed z-50 w-screen h-screen pt-8 sm:pt-10 flex justify-center items-start bg-black/30"
		class:dark={$darkMode}
	>
		<svelte:component this={component[$modalType]} on:click />
	</div>
{/if}
