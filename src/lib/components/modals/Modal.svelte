<script lang="ts">
	import type { ComponentType } from 'svelte';
	import BossSelect from './BossSelect.svelte';
	import ExportImage from './ExportImage.svelte';
	import Message from './Message.svelte';
	import { modalType } from '$stores/modal';

	const component: { [key in string]: ComponentType } = {
		BossSelect,
		ExportImage,
		Message
	};
</script>

{#if $modalType}
	<div
		on:click|self
		class="fixed z-50 w-screen h-screen pt-4 sm:pt-10 flex justify-center items-start bg-black/30"
	>
		<svelte:component this={component[$modalType]} on:click />
	</div>
{/if}
