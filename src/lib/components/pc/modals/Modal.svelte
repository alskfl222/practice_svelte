<script lang="ts">
	// ! typing
	// import ComponentConstructorOptions from 'svelte'
	// import type { SvelteComponentTyped } from 'svelte/internal';
	// type C = $$Generic<typeof SvelteComponentTyped<any, any, any>>;
	// export let component: C;
	import BossSelect from './BossSelect.svelte';
	import ExportImage from './ExportImage.svelte';
	import { modalType } from '$stores/modal';

	const component: any = {
		BossSelect,
		ExportImage
	};
</script>

{#if $modalType}
	<div on:click|self class="fixed z-50 w-screen h-screen pt-10 flex justify-center items-start bg-black/30">
		<svelte:component this={component[$modalType]} on:click />
	</div>
{/if}
