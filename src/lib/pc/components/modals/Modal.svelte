<script lang="ts">
	// ! typing
	// import ComponentConstructorOptions from 'svelte'
	// import type { SvelteComponentTyped } from 'svelte/internal';
	// type C = $$Generic<typeof SvelteComponentTyped<any, any, any>>;
	// export let component: C;
	import BossSelect from './BossSelect.svelte';

	export let type = 'BossSelect';

	const component: any = {
		BossSelect
	};
</script>

<div on:click|self class="fixed z-50 w-screen h-screen flex justify-center bg-black opacity-30">
	<svelte:component this={component[type]} on:click />
</div>
