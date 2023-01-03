<script lang="ts">
	// ! typing
	// import ComponentConstructorOptions from 'svelte'
	// import type { SvelteComponentTyped } from 'svelte/internal';
	// type C = $$Generic<typeof SvelteComponentTyped<any, any, any>>;
	// export let component: C;
	import BossSelect from './BossSelect.svelte';
	import { modalType } from '$stores/modal';

	const component: any = {
		BossSelect
	};
</script>

{#if $modalType}
	<div on:click|self class="fixed z-50 w-screen h-screen flex justify-center bg-black/30">
		<svelte:component this={component[$modalType]} on:click />
	</div>
{/if}
